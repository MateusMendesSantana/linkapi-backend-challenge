import { Aggregation, AggregationDocument } from './aggregation.schema';
import { GenericRepository } from '../generic/generic.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class AggregationRepository extends GenericRepository<AggregationDocument> {
  constructor(
    @InjectModel(Aggregation.name)
    protected readonly model: Model<AggregationDocument>
  ) {
    super(model);
  }
}
