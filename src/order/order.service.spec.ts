import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { PedidoApi } from '../bling/pedido.api';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PedidoApi,
          useValue: {
            create: (args) => args
          }
        },
        {
          provide: getModelToken('Order'),
          useValue: {
            exists: () => false,
            create: (args) => args
          }
        }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createOrder', async () => {
    const promise = service.createOrder({
      'id': 1,
      'creator_user_id': {
        'name': 'mateus mendes santana',
        'email': 'sdgdfgdfgd@gmail.com',
      },
      'person_id': {
        'name': 'pessoa1',
        'email': [
          {
            'value': ''
          }
        ],
        'phone': [
          {
            'value': '',
          }
        ],
        'value': 1
      },
      'stage_id': 1,
      'title': 'Negócio org1',
      'value': 10,
      'currency': 'USD',
      'add_time': '2020-10-30 11:02:20',
      'update_time': '2020-10-30 11:04:32',
      'stage_change_time': null,
      'status': 'won',
      'visible_to': '3',
      'close_time': '2020-10-30 11:02:37',
      'pipeline_id': 1,
      'won_time': '2020-10-30 11:02:37',
      'first_won_time': '2020-10-30 11:02:37',
      'person_name': 'pessoa1',
      expected_close_date: '',
      formatted_value: '',
      owner_name: '',
      products_count: 0,
      weighted_value: 0,
      weighted_value_currency: ''
    });
    expect(promise).resolves.toHaveProperty('dealId');
    expect(promise).resolves.toHaveProperty('dealName');
    expect(promise).resolves.toHaveProperty('clientName');
    expect(promise).resolves.toHaveProperty('status');
    expect(promise).resolves.toHaveProperty('date');
    expect(promise).resolves.toHaveProperty('value');
    expect(promise).resolves.toHaveProperty('currency');
  });
});
