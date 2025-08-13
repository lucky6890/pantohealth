import { Module, OnModuleInit } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalModule } from './signal/signal.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { SignalService } from './signal/signal.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@mongodb:27017'),
    RabbitmqModule,
    SignalModule,
  ],
  controllers: [],
  providers: [RabbitmqService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    private readonly signalService: SignalService,
  ) {}

  async onModuleInit() {
    await this.rabbitmqService.consumeMessages(
      'x-ray-data',
      async (message) => {
        await this.signalService.analyzeData(message);
      },
    );
  }
}
