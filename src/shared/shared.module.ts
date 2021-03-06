
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule,
  ],
  exports: [
    DatabaseModule
  ]
})
export class SharedModule { }