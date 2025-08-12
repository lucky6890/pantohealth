import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SignalDocument = HydratedDocument<Signal>;

@Schema()
export class Signal {
  @Prop()
  deviceId: string;

  @Prop()
  time: string;

  @Prop()
  dataLength: string;

  @Prop()
  dataVolume: string;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
