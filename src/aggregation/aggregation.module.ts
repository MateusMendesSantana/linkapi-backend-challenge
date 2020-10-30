import { Aggregation, AggregationSchema } from './aggregation.schema';
import { AggregationController } from './aggregation.controller';
import { AggregationRepository } from './aggregation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AggregationService } from './aggregation.service';
import { SharedModule } from '../shared/shared.module';
import { BlingModule } from '../bling/bling.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{
      name: Aggregation.name,
      schema: AggregationSchema
    }]),
    BlingModule
  ],
  controllers: [
    AggregationController
  ],
  providers: [
    AggregationService,
    AggregationRepository
  ],
  exports: [
    AggregationService
  ]
})
export class AggregationModule { }
