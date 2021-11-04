import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterRepository } from './registro.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterRepository])],
})
export class RegistroModule {}
