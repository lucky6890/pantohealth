import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    await this.create(transformedData);
  }

  async create(data: CreateSignalDto): Promise<Signal> {
    try {
      const createdSignal = new this.model(data);
      return createdSignal.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const data = await this.model.find().skip(skip).limit(limit).exec();
      const totalCount = await this.model.countDocuments().exec();

      return {
        data,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getOne(id: string) {
    try {
      const data = await this.model.findById(id);
      if (!data) {
        throw new NotFoundException();
      }
      return {
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // We Can (or should) use soft delete with a flag like isDeleted but in this app i choose to show the hard delete scenario...
  async removeOne(id: string) {
    try {
      const data = await this.model.deleteOne({
        _id: id,
      });

      if (data.deletedCount === 1) {
        return {
          data: null,
          message: 'Signal removed successfully!',
        };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
