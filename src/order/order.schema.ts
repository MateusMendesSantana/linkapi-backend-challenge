import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatus } from './enums/order.enum';
import { Document } from 'mongoose';
import { IOrder } from './order.interface';

export type OrderDocument = Order & Document;

@Schema()
export class Order implements IOrder {
  @Prop()
  dealId: number;
  @Prop()
  dealName: string;
  @Prop()
  clientName: string;
  @Prop({ type: String })
  status: OrderStatus;
  @Prop()
  date: Date;
  @Prop()
  value: number;
  @Prop()
  currency: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);