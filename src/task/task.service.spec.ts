import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { TaskService } from './task.service';
import { DealApi } from '../pipedrive/apis/deal.api';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: DealApi,
          useValue: {
            getDeals: () => Promise.resolve([])
          }
        },
        {
          provide: getQueueToken('aggregation-queue'),
          useValue: {
            add: (args) => Promise.resolve()
          }
        }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('importDeals', async () => {
    const promise = service.importDeals();
    expect(promise).resolves.toBeUndefined();
  });
});
