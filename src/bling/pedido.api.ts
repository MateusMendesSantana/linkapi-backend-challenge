
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { HttpService, Injectable } from '@nestjs/common';
import { PedidoResponse } from './interfaces/pedido-response.interface';
import { ConfigService } from '@nestjs/config';
import { ICreatePedido } from './interfaces/pedido-create.interface';
import * as js2xmlparser from 'js2xmlparser';

@Injectable()
export class PedidoApi {
  private readonly token: string;
  private readonly uri: string;

  constructor(
    private httpService: HttpService,
    configService: ConfigService
  ) {
    this.token = configService.get('BLING_API_TOKEN');
    this.uri = configService.get('BLING_API_URI');
  }

  async create(request: ICreatePedido): Promise<PedidoResponse> {
    const url = `${this.uri}/pedido/json`;
    const xml = js2xmlparser.parse('pedido', request);
    const options = {
      params: {
        apikey: this.token,
        xml
      }
    };
    const { status, data } = await this.httpService.post(url, null, options).toPromise();

    if (status < 200 || status > 299) {
      throw new HttpException('An unexpected error ocurred!', status);
    }

    if (data.retorno.erros && data.retorno.erros.length > 0) {
      throw new BadRequestException(data.retorno.erros[0].erro.msg);
    }
    return data;
  }
}
