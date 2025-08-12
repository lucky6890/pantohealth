import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalModule } from './signal/signal.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@mongodb:27017'),
    RabbitmqModule,
    SignalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
