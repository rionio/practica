import { Injectable } from '@nestjs/common';
import { RegistroDto } from 'src/modules/registro/dto/registro.dto';
import { Registro } from 'src/modules/registro/registro.entity';
import { TypeMapper } from 'ts-mapper';

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<Registro, RegistroDto>()
      .map(
        (entity) => entity.companyid,
        (dto) => dto.companyid,
      )
      .map(
        (entity) => entity.fecha,
        (dto) => dto.fecha,
      )
      .map(
        (entity) => entity.tiempo,
        (dto) => dto.tiempo,
      )
      .map(
        (entity) => entity.fecha,
        (dto) => dto.fecha,
      );
  }
}
