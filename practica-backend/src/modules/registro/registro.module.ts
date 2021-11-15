import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { RegisterRepository } from './registro.repository';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterRepository]), SharedModule],
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
