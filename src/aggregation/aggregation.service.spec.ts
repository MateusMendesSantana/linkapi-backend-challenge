import { Test, TestingModule } from '@nestjs/testing';
import { AggregationService } from './aggregation.service';
import { getModelToken } from '@nestjs/mongoose';

describe('AggregationService', () => {
  let service: AggregationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AggregationService,
        {
          provide: getModelToken('Aggregation'),
          useValue: {
            create: (args) => args
          },
        },
      ],
    }).compile();

    service = module.get<AggregationService>(AggregationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('aggregateAndSave', () => {
    const orders = [
      { value: 1 },
      { value: 10 },
      { value: 100 },
      { value: 1000 }
    ] as any[];
    const promise = service.aggregateAndSave(orders);
    expect(promise).resolves.toHaveProperty('date');
    expect(promise).resolves.toHaveProperty('valueTotal', 1111);
  });
});
