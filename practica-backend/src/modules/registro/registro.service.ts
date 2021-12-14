import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RegistroDto } from '../registro/dto/registro.dto';
import { Options } from './interface';
import { Registro } from './registro.entity';
import { RegisterRepository } from './registro.repository';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(RegisterRepository) //se inyecta el repositorio Registro para poder usar los metodos que contiene
    private readonly _registroRepository: RegisterRepository,
  ) {}
  async getAll(options: Options): Promise<RegistroDto> {
    /*
    se manejan los datos de la DB de manera asincronica 
    esto lo que hara es crear una constante registro del tipo arreglo del tipo Registro
    si no encuentra ningun registro tira un error de NotFound
    luego se retorna un arreglo del tipo RegistroDto el cual filtra los datos que pasaran en base a un archivo registro.dto.ts
    */
    let condition = {};
    let findOptions = {};
    if (options.company != undefined) {
      condition = Object.assign(condition, { companyid: options.company });
    }
    if (options.user != undefined) {
      condition = Object.assign(condition, { userid: options.user });
    }
    /* if (options.inter != 0) {
      Object.defineProperty(findOptions, 'companyid', options.inter);
    } */
    if (options.company != undefined || options.user != undefined) {
      findOptions = Object.assign(findOptions, { where: condition });
    }
    const registros: Registro = await this._registroRepository.findOne(
      findOptions,
    );
    if (!registros) {
      throw new NotFoundException();
    }
    return plainToClass(RegistroDto, registros); //esta funcion mappeara los datos de registros y en base a RegistroDto
  }
}
