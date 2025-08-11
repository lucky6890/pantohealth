import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Module({
  imports: [RabbitmqModule],
  controllers: [],
  providers: [RabbitmqService],
})
export class AppModule {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async onModuleInit() {
    await this.rabbitmqService.consumeMessages('x-ray-data', (message) => {
      console.log('Received message:', message);
      // Process your message here
    });
  }
}
