import { OrderStatus } from './enums/order.enum';

export interface IOrder {
  _id?: string;
  dealId: number;
  dealName: string;
  status: OrderStatus;
  date: Date;
  value: number;
  currency: string;
}
