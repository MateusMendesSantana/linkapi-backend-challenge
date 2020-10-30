import { OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { AggregationService } from 'src/aggregation/aggregation.service';
import { OrderDocument } from 'src/order/order.schema';
import { OrderService } from 'src/order/order.service';
import { Logger } from '@nestjs/common';
import { IDeal } from 'src/pipedrive/interfaces/deal.interface';
import { Job } from 'bull';

@Processor('aggregation-queue')
export class AggregationConsumer {
  private readonly logger = new Logger(AggregationConsumer.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly aggregationService: AggregationService
  ) { }

  @Process()
  async createOrder(job: Job<IDeal[]>): Promise<OrderDocument[]> {
    return Promise.all(job.data.map(it => this.orderService.createOrder(it)));
  }

  @OnQueueActive()
  onActive(job: Job): void {
    this.logger.log(`Processing job ${job.id}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<OrderDocument[]>): Promise<void> {
    this.logger.log(`Completed job ${job.id}`);
    this.aggregationService.aggregateAndSave(job.data);
  }
}