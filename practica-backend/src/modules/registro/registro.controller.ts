import { Body, Controller, Get, Post } from '@nestjs/common';
import { Options } from './interface';
import { RegistroService } from './registro.service';

@Controller('registro') //con este prefijo se puede acceder a los endpoints que se mencionan (agrupacion de endpoints).
export class RegistroController {
  constructor(private readonly _registroService: RegistroService) {}

  @Post() //con este metodo despues del prefijo registro/all entregara todos los datos filtrados por el metodo getAll de RegistroService
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getRegistros(@Body() options: Options): Promise<any[]> {
    const registros = await this._registroService.getSessions(options);
    return registros;
  }

  @Get('all')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getData(): Promise<Object> {
    const data = await this._registroService.getData();
    return data;
  }
}
