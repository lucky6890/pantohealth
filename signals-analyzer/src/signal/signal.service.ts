import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Signal } from './signal.schema';
import { Model } from 'mongoose';
import { CreateSignalDto } from './dto/create-signal.dto';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class SignalService {
  constructor(
    @InjectModel(Signal.name) private model: Model<Signal>,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  private async extractData(data) {
    await this.rabbitmqService.consumeMessages('x-ray-data', (message) => {
      console.log('Received message:', message);
    });
  }

  async create(data: CreateSignalDto): Promise<Signal> {
    const createdSignal = new this.model(data);
    return createdSignal.save();
  }
}
