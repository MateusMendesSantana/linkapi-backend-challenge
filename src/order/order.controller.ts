import { Controller, Get } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('orders')
export class OrderController {
  public constructor(
    protected readonly repository: OrderRepository,
    protected readonly service: OrderService
  ) { }

  @Get()
  find(): Promise<Order[]> {
    return this.repository.findAll();
  }
}
