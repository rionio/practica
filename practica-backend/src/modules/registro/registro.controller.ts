import { Body, Controller, Post } from '@nestjs/common';
import { RegistroDto } from './dto';
import { Options } from './interface';
import { RegistroService } from './registro.service';

@Controller('registro') //con este prefijo se puede acceder a los endpoints que se mencionan (agrupacion de endpoints).
export class RegistroController {
  constructor(private readonly _registroService: RegistroService) {}

  @Post() //con este metodo despues del prefijo registro/all entregara todos los datos filtrados por el metodo getAll de RegistroService
  async getRegistros(@Body() options: Options): Promise<RegistroDto> {
    const registros = await this._registroService.getAll(options);
    return registros;
  }
}
