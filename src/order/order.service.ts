import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, OrderDocument } from './order.schema';
import { OrderStatus } from './enums/order.enum';
import { InjectModel } from '@nestjs/mongoose';
import { PedidoApi } from '../bling/pedido.api';
import { IDeal } from '../pipedrive/interfaces/deal.interface';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly model: Model<OrderDocument>,
    private readonly pedidoApi: PedidoApi
  ) { }

  async createOrder(deal: IDeal): Promise<OrderDocument> {
    const exists = await this.model.exists({ dealId: deal.id });

    if (exists) {
      throw new BadRequestException('Order has already been created!');
    }
    await this.pedidoApi.create({
      cliente: {
        nome: deal.person_name
      },
      itens: {
        item: {
          codigo: deal.id,
          descricao: deal.title,
          qtde: '1',
          vlr_unit: deal.value
        }
      }
    });

    return this.model.create({
      dealId: deal.id,
      dealName: deal.title,
      clientName: deal.person_name,
      status: OrderStatus[deal.status.toUpperCase()],
      date: Date.parse(deal.update_time.replace(' ', 'T')),
      value: deal.value,
      currency: deal.currency,
    });
  }
}
