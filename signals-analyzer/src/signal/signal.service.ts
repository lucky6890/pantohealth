import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Signal } from './signal.schema';
import { Model } from 'mongoose';
import { CreateSignalDto } from './dto/create-signal.dto';

@Injectable()
export class SignalService {
  constructor(@InjectModel(Signal.name) private model: Model<Signal>) {}

  async analyzeData(message: string) {
    const parsedData = JSON.parse(message);
    const transformedData = {
      deviceId: '',
      dataVolume: '',
      dataLength: 0,
      time: '',
    };
    for (const key in parsedData) {
      transformedData.deviceId = key;
      transformedData.dataVolume = parsedData[key].data;
      transformedData.time = parsedData[key].time;
    }
    transformedData.dataLength = transformedData.dataVolume.length;
    const signal = await this.create(transformedData);
    console.log(signal);
  }

  async create(data: CreateSignalDto): Promise<Signal> {
    const createdSignal = new this.model(data);
    return createdSignal.save();
  }
}
