import { AggregationModule } from './aggregation/aggregation.module';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    OrderModule,
    AggregationModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
