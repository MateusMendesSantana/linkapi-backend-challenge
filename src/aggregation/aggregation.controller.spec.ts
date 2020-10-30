import { Test, TestingModule } from '@nestjs/testing';
import { AggregationController } from './aggregation.controller';
import { AggregationRepository } from './aggregation.repository';
import { AggregationService } from './aggregation.service';

describe('AggregationController', () => {
  let controller: AggregationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AggregationRepository,
          useValue: {} as AggregationRepository
        },
        {
          provide: AggregationService,
          useValue: {}
        }
      ],
      controllers: [AggregationController],
    }).compile();

    controller = module.get<AggregationController>(AggregationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
