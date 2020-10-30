
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { queueFactory } from './factories/queue.factory';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'aggregation-queue',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: queueFactory('aggregation-queue')
    })
  ],
  exports: [
    BullModule
  ]
})
export class QueueModule { }
