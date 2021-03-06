import { AggregationModule } from './aggregation/aggregation.module';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    ScheduleModule.forRoot(),
    OrderModule,
    AggregationModule,
    TaskModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
