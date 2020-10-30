import { AggregationConsumer } from './consumers/aggregation.consumer';
import { AggregationModule } from 'src/aggregation/aggregation.module';
import { PipeDriveModule } from 'src/pipedrive/pipedrive.module';
import { TasksService } from './task.service';
import { QueueModule } from 'src/queues/queue.module';
import { OrderModule } from 'src/order/order.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    OrderModule,
    AggregationModule,
    PipeDriveModule,
    QueueModule
  ],
  providers: [
    TasksService,
    AggregationConsumer
  ],
  exports: [
    TasksService
  ]
})
export class TaskModule { }
