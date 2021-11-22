import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { RegistroDto } from '../registro/dto/registro.dto';
import { Registro } from './registro.entity';
import { RegisterRepository } from './registro.repository';

@Injectable()
export class RegistroService {
  constructor(
    @InjectRepository(RegisterRepository) //se inyecta el repositorio Registro para poder usar los metodos que contiene
    private readonly _registroRepository: RegisterRepository,
  ) {}
  async getAll(): Promise<RegistroDto[]> {
    /*
    se manejan los datos de la DB de manera asincronica 
    esto lo que hara es crear una constante registro del tipo arreglo del tipo Registro
    si no encuentra ningun registro tira un error de NotFound
    luego se retorna un arreglo del tipo RegistroDto el cual filtra los datos que pasaran en base a un archivo registro.dto.ts
    */
    const registros: Registro[] = await this._registroRepository.find();
    if (!registros) {
      throw new NotFoundException();
    }
    return plainToClass(RegistroDto, registros); //esta funcion mappeara los datos de registros y en base a RegistroDto
  }
  async get(id: number): Promise<RegistroDto> {
    /*
    se manejan los datos de la DB de manera asincronica 
    esto lo que hara es crear una constante registro del tipo Registro
    en la cual se buscara un registro que tenga un id igual a registroid
    si no encuentra ningun registro tira un error de NotFound
    luego se retorna un arreglo del tipo RegistroDto el cual filtra los datos que pasaran en base a un archivo registro.dto.ts
    */
    const registro: Registro = await this._registroRepository.findOne({
      where: { registroid: id },
    });
    if (!registro) {
      throw new NotFoundException();
    }
    return plainToClass(RegistroDto, registro);
  }
}
