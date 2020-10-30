import { Order, OrderDocument } from './order.schema';
import { GenericRepository } from '../generic/generic.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class OrderRepository extends GenericRepository<OrderDocument> {
  constructor(
    @InjectModel(Order.name)
    protected readonly model: Model<OrderDocument>
  ) {
    super(model);
  }
}
