import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from './signal.schema';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
  ],
  providers: [SignalService, RabbitmqService],
  controllers: [SignalController],
})
export class SignalModule {}
