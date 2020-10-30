import { Document, Model, ClientSession, CreateQuery, FilterQuery } from 'mongoose';

export type MutationCallback<T> = (session: ClientSession) => Promise<T>;

export abstract class GenericRepository<TSchema extends Document> {
  constructor(
    protected readonly model: Model<TSchema>
  ) { }

  create(body: CreateQuery<TSchema>): Promise<TSchema> {
    return this.model.create(body);
  }

  findAll(query: FilterQuery<TSchema> = {}): Promise<TSchema[]> {
    return this.model.find(query).exec();
  }

  async runInTransaction<T>(mutations: MutationCallback<T>): Promise<T> {
    const session = await this.model.db.startSession();
    session.startTransaction();
    try {
      const result = await mutations(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
