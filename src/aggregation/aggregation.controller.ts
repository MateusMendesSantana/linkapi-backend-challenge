import { Controller, Get } from '@nestjs/common';
import { AggregationRepository } from './aggregation.repository';
import { AggregationService } from './aggregation.service';
import { Aggregation } from './aggregation.schema';

@Controller('aggregations')
export class AggregationController {
  public constructor(
    protected readonly repository: AggregationRepository,
    protected readonly service: AggregationService
  ) { }

  @Get()
  find(): Promise<Aggregation[]> {
    return this.repository.findAll();
  }
}
