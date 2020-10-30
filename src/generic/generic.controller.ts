import { Get, Param, Query, Post, Body, Patch, Delete } from '@nestjs/common';
import { GenericRepository } from './generic.repository';
import { Document, Model } from 'mongoose';
import { GenericService } from './generic.service';

export abstract class GenericController<
  TSchema extends Document,
  TRepository extends GenericRepository<TSchema>,
  TService extends GenericService<TSchema>
  > {

  public constructor(
    protected readonly model: Model<TSchema>,
    protected readonly repository: TRepository,
    protected readonly service: TService
  ) { }

  @Get(':id')
  findById(
    @Param('id')
    id: string
  ): Promise<TSchema | null> {
    return this.model.findById(id).exec();
  }

  @Get()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  find(
    @Query()
    query: any
  ): Promise<TSchema[]> {
    return this.model.find(query).exec();
  }

  @Post()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  create(
    @Body()
    body: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...args: any[]
  ): Promise<TSchema> {
    return this.model.create(body);
  }

  @Delete(':id')
  delete(
    @Param('id')
    id: string
  ): Promise<TSchema | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
