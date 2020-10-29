import { HttpModule, Module } from '@nestjs/common';
import { PedidoApi } from './pedido.api';

@Module({
  imports: [
    HttpModule
  ],
  providers: [
    PedidoApi
  ],
  exports: [
    PedidoApi
  ]
})
export class BlingModule { }
