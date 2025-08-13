import { Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';

@Module({
  controllers: [RabbitmqController],
  providers: [],
})
export class RabbitmqModule {}
