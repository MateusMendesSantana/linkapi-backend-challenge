import { Aggregation, AggregationDocument } from './aggregation.schema';
import { OrderDocument } from '../order/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class AggregationService {
  constructor(
    @InjectModel(Aggregation.name)
    private readonly model: Model<AggregationDocument>
  ) { }

  async aggregateAndSave(orders: OrderDocument[]): Promise<AggregationDocument> {
    const total = orders
      .map(it => it.value)
      .reduce((previus, current) => previus + current);

    return this.model.create({
      date: Date.now(),
      valueTotal: total
    })
  }
}
