import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterRepository } from './registro.repository';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterRepository])],
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
