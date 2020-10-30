import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAggregation } from './aggregation.interface';
import { Document } from 'mongoose';

export type AggregationDocument = Aggregation & Document;

@Schema()
export class Aggregation implements IAggregation {
  @Prop()
  date: Date;
  @Prop()
  valueTotal: number;
}

export const AggregationSchema = SchemaFactory.createForClass(Aggregation);