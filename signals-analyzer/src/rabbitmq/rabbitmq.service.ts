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

  async consumeMessages(queueName: string, callback: (msg: any) => void) {
    await this.channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        try {
          const content = JSON.parse(msg.content.toString());
          await callback(content);
          this.channel.ack(msg); // Acknowledge message
        } catch (error) {
          console.error('Error processing message:', error);
          this.channel.nack(msg); // Nack message if processing fails
        }
      }
    });
    console.log(`Consumer started for queue: ${queueName}`);
  }
}
