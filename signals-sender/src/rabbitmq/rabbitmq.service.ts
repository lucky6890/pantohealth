import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import * as amqpConnectionManager from 'amqp-connection-manager';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection: AmqpConnectionManager;
  private channel: ChannelWrapper;

  async onModuleInit() {
    this.connection = amqpConnectionManager.connect([
      'amqp://admin:admin123@rabbitmq',
    ]);
    this.connection.on('connect', () => console.log('Connected to RabbitMQ!'));
    this.connection.on('disconnect', (err) =>
      console.error('Disconnected from RabbitMQ.', err),
    );

    this.channel = this.connection.createChannel({
      json: true,
      setup: async (channel: amqp.Channel) => {
        await channel.assertQueue('x-ray-data', { durable: true });
        await channel.prefetch(1); // Optional: limits unacknowledged messages
      },
    });
  }

  async onModuleDestroy() {
    await this.connection.close();
  }

  async sendMessage(queueName: string, msg: string) {
    await this.channel.sendToQueue(queueName, msg);
    console.log(`Send message to: ${queueName}`);
  }
}
