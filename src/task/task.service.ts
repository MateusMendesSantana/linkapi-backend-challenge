import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { DealApi } from '../pipedrive/apis/deal.api';
import { Queue } from 'bull';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectQueue('aggregation-queue')
    private readonly aggregationQueue: Queue,
    private readonly dealApi: DealApi
  ) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async importDeals(): Promise<void> {
    this.logger.debug('Aggregation called every minute');
    const deals = await this.dealApi.getDeals();
    this.aggregationQueue.add(deals);
  }
}