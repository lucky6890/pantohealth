import { Module, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [RabbitmqModule],
  controllers: [],
  providers: [AppService, RabbitmqService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly service: AppService) {}

  async onModuleInit() {
    setInterval(async () => {
      await this.service.sendMessages();
    }, 20000);
  }
}
