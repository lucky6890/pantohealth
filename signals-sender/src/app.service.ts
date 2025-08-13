import { Injectable } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import data from './x-ray.json';

@Injectable()
export class AppService {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  public async sendMessages() {
    await this.rabbitmqService.sendMessage('x-ray-data', JSON.stringify(data));
  }
}
