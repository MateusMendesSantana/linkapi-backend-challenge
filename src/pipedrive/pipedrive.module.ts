
import { HttpModule, Module } from '@nestjs/common';
import { DealApi } from './apis/deal.api';

@Module({
  imports: [
    HttpModule
  ],
  providers: [
    DealApi
  ],
  exports: [
    DealApi
  ]
})
export class PipeDriveModule { }
