import { GenericRepository } from './generic.repository';
import { Document, Model } from 'mongoose';

export abstract class GenericService<TSchema extends Document> {
  public constructor(
    protected readonly model: Model<TSchema>,
    protected readonly repository: GenericRepository<TSchema>
  ) { }
}
