import { AggregationConsumer } from './consumers/aggregation.consumer';
import { AggregationModule } from '../aggregation/aggregation.module';
import { PipeDriveModule } from '../pipedrive/pipedrive.module';
import { TaskService } from './task.service';
import { QueueModule } from '../queues/queue.module';
import { OrderModule } from '../order/order.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    OrderModule,
    AggregationModule,
    PipeDriveModule,
    QueueModule
  ],
  providers: [
    TaskService,
    AggregationConsumer
  ],
  exports: [
    TaskService
  ]
})
export class TaskModule { }
