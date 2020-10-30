import { Order, OrderSchema } from './order.schema';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from './order.service';
import { BlingModule } from '../bling/bling.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{
      name: Order.name,
      schema: OrderSchema
    }]),
    BlingModule
  ],
  controllers: [
    OrderController
  ],
  providers: [
    OrderService,
    OrderRepository
  ],
  exports: [
    OrderService,
    OrderRepository,
    MongooseModule
  ]
})
export class OrderModule { }
