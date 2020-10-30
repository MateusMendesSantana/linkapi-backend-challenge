import { Test, TestingModule } from '@nestjs/testing';
import { AggregationConsumer } from './aggregation.consumer';
import { AggregationService } from '../../aggregation/aggregation.service';
import { OrderService } from '../../order/order.service';

describe('AggregationConsumer', () => {
  let service: AggregationConsumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AggregationConsumer,
        {
          provide: OrderService,
          useValue: {
            createOrder: () => Promise.resolve({})
          }
        },
        {
          provide: AggregationService,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<AggregationConsumer>(AggregationConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('importDeals', () => {
    const promise = service.createOrder({
      data: []
    } as any);
    expect(promise).resolves.toBeDefined();
  });
});
