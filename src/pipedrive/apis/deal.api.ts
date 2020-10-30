
import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { IDealProductResponse } from '../interfaces/deal-product-response.interface';
import { IDealResponse } from '../interfaces/deal-response.interface';
import { HttpException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { OrderStatus } from '../../order/enums/order.enum';
import { IDeal } from '../interfaces/deal.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class DealApi {
  private readonly token: string;
  private readonly uri: string;

  constructor(
    private httpService: HttpService,
    configService: ConfigService
  ) {
    this.token = configService.get('PIPEDRIVE_API_TOKEN');
    this.uri = configService.get('PIPEDRIVE_API_URI');
  }

  public async getDeals(): Promise<IDeal[]> {
    try {
      return this.httpService.get<IDealResponse>(
        `${this.uri}/deals`,
        {
          params: {
            status: OrderStatus.WON,
            api_token: this.token
          }
        }
      ).pipe(map(it => it.data?.data || []))
       .toPromise();
    } catch (error) {
      throw new HttpException('The pipedrive service has errors.', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  getDealProducts(id: number): Promise<IDealProductResponse[]> {
    return this.httpService
      .get<IDealProductResponse[]>(`${this.uri}/deals/${id}/products?api_token=${this.token}`)
      .pipe(map(it => it.data))
      .toPromise();
  }
}
