import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { buffer } from 'rxjs';
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
  dateDiff(date1: Date, date2: Date) {
    if (date1 == undefined) {
      return 0;
    }
    const year = date2.getFullYear() - date1.getFullYear();
    const month = date2.getMonth() - date1.getMonth();
    const day = date2.getDate() - date1.getDate();
    const hour = date2.getHours() - date1.getHours();
    const minutes = date2.getMinutes() - date1.getMinutes();
    const seconds = date2.getSeconds() - date1.getSeconds();
    const miliseconds = date2.getMilliseconds() - date1.getMilliseconds();

    const diff =
      year * 31557600 +
      month * 2629800 +
      day * 86400 +
      hour * 3600 +
      minutes * 60 +
      seconds +
      miliseconds / 1000;
    return diff;
  }

  getDateWithoutHours1(date: Date): Date {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();

    const result = new Date(year, month, day + 1);

    return result;
  }

  getDateWithoutHours2(date: Date): Date {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();

    const result = new Date(year, month, day);

    return result;
  }

  filterByDate(
    registros: RegistroDto[],
    dateStart: Date,
    dateEnd: Date,
  ): RegistroDto[] {
    const temp = registros.sort(
      (a, b) => +new Date(a.fecha).getTime() - +new Date(b.fecha).getTime(),
    );
    const buffer = [];
    const dateStartWH = this.getDateWithoutHours1(dateStart);
    const dateEndWH = this.getDateWithoutHours1(dateEnd);
    for (let index = 0; index < registros.length; index++) {
      const element1 = temp[index];
      const date: Date = element1.fecha;
      const onlyDate1: Date = this.getDateWithoutHours2(date);
      let flag = false;
      if (dateStartWH.getTime() <= onlyDate1.getTime()) {
        flag = true;
      }
      if (dateEndWH.getTime() == onlyDate1.getTime()) {
        flag = false;
        break;
      }
      if (flag) {
        buffer.push(element1);
      }
    }
    return buffer;
  }

  analyzeData(data: RegistroDto[], intervalo = 15) {
    const buffer = [];
    const start = new Date(data[0].fecha);
    const end = new Date(data[data.length - 1].fecha);
    let monthStart = start.getMonth();
    const monthEnd = end.getMonth();
    const yearDiff = end.getFullYear() - start.getFullYear();
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    if (yearDiff > 0) {
      for (let i = 0; i <= yearDiff; i++) {
        const year = {};
        for (let j = monthStart; j < 12; j++) {
          year[months[j]] = [];
          if (j == monthEnd && i == yearDiff) {
            break;
          }
        }
        buffer.push(year);
        monthStart = 0;
      }
    } else {
      const year = {};
      for (let i = monthStart; i <= monthEnd; i++) {
        year[months[i]] = 0;
      }
      buffer.push(year);
    }
    this.valuesCounting(data, buffer, intervalo);
    return buffer;
  }

  userCounting(data: RegistroDto[]) {
    const buffer = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].userid;
      if (buffer.indexOf(element) == -1) {
        buffer.push(element);
      }
    }
    const list = {};
    buffer.forEach((element) => {
      /* Object.defineProperty(list, element, {
        value: {
          sessionCounter: 0,
          fecha: undefined,
        },
      }); */
      list[element] = {
        sessionCounter: 0,
        fecha: undefined,
      };
    });
    return list;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/ban-types
  valuesCounting(data: RegistroDto[], array: Object[], intervalo = 15) {
    let yearCounter = 0;
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const list = this.userCounting(data);
    for (let i = 1; i < data.length; i++) {
      const userid = data[i - 1].userid;
      const actualDate = new Date(data[i - 1].fecha);
      if (this.dateDiff(list[userid].fecha, actualDate) < intervalo * 60) {
      } else if (userid != data[i - 2].userid) {
        list[userid].sessionCounter += 1;
      }
      list[userid].fecha = actualDate;
      const nextDate = new Date(data[i].fecha);
      const nextUser = data[i].userid;
      if (this.dateDiff(list[userid].fecha, nextDate) < intervalo * 60) {
      } else if (userid == nextUser) {
        list[userid].sessionCounter += 1;
      }
      if (nextDate.getDate() != actualDate.getDate()) {
        let total = 0;
        for (const keys in list) {
          total += list[keys].sessionCounter;
          list[keys].sessionCounter = 0;
        }
        array[yearCounter][months[actualDate.getMonth()]] += total;
      }
      if (actualDate.getFullYear() != nextDate.getFullYear()) {
        yearCounter++;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async getSessions(options: Options): Promise<Object[]> {
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
    if (options.company != undefined || options.user != undefined) {
      findOptions = Object.assign(findOptions, { where: condition });
    }
    const registros: Registro[] = await this._registroRepository.find(
      findOptions,
    );
    if (!registros) {
      throw new NotFoundException();
    }
    const newRegistros = plainToClass(RegistroDto, registros); //esta funcion mappeara los datos de registros y en base a RegistroDto
    const filter = this.filterByDate(
      newRegistros,
      options.dateStart,
      options.dateEnd,
    );
    const data = this.analyzeData(filter, options.inter);
    return data;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getData(): Promise<Object> {
    /*en esta parte del codigo queria sacar las compañias para para despues colocarla en un select box, y luego cuando
    seleccionen la compañia mostrar todos los usuarios de esa compañia pero me quede sin tiempo
    */
    const registros: Registro[] = await this._registroRepository.find();
    if (!registros) {
      throw new NotFoundException();
    }
    const newRegistros = plainToClass(RegistroDto, registros);
    const buffer1 = {};
    const buffer2 = [];
    for (let i = 0; i < newRegistros.length; i++) {
      const element = newRegistros[i];
      if (buffer2.indexOf(element) == -1) {
        buffer2.push(element.companyid);
      }
    }
    buffer2.forEach((element) => {
      buffer1[element] = {
        usuarios: [],
      };
    });
    for (let i = 0; i < newRegistros.length; i++) {
      const element1 = newRegistros[i].userid;
      const element2 = newRegistros[i].companyid;
      if (buffer1[element2].indexOf(element1) == -1) {
        buffer2.push(element1);
      }
    }
    return buffer1;
  }
}
