import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SignalDocument = HydratedDocument<Signal>;

@Schema()
export class Signal {
  @Prop()
  deviceId: String;

  @Prop()
  time: Number;

  @Prop()
  dataLength: Number;

  @Prop()
  dataVolume: [Number | Types.Array<Number>];
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
