import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { RegistroDto } from './dto/registro.dto';
import { Registro } from './registro.entity';
import { RegisterRepository } from './registro.repository';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(RegisterRepository)
    private readonly _registroRepository: RegisterRepository,
    private readonly _mapperService: MapperService,
  ) {}
  async getAll(): Promise<RegistroDto[]> {
    const registros: Registro[] = await this._registroRepository.find();
    if (!registros) {
      throw new NotFoundException();
    }
    return this._mapperService.mapCollection<Registro, RegistroDto>(
      registros,
      new RegistroDto(),
    );
  }
}
