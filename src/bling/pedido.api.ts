
import { HttpService, Injectable } from '@nestjs/common';
import { PedidoResponse } from './interfaces/pedido-response.interface';
import { OrderCreateDto } from 'src/order/dtos/order-create.dto';
import { ConfigService } from '@nestjs/config';
import convert from 'xml-js';

@Injectable()
export class PedidoApi {
  private readonly token: string;
  private readonly uri: string;
  private static readonly converterOptions = {
    compact: true,
    ignoreComment: true,
    spaces: 0
  };

  constructor(
    private httpService: HttpService,
    configService: ConfigService
  ) {
    this.token = configService.get('BLING_API_TOKEN');
    this.uri = configService.get('BLING_API_URI');
  }

  async save(payload: OrderCreateDto): Promise<PedidoResponse> {
    const url = `${this.uri}/pedido/json`;
    const body = {
      params: {
        apikey: this.token,
        xml: convert.js2xml(payload, PedidoApi.converterOptions)
      }
    };
    const { data } = await this.httpService.post(url, body).toPromise();
    return data;
  }
}
