import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegistroDto } from './dto';
import { RegistroService } from './registro.service';

@Controller('registro') //con este prefijo se puede acceder a los endpoints que se mencionan (agrupacion de endpoints).
export class RegistroController {
  constructor(private readonly _registroService: RegistroService) {}

  @Get('all') //con este metodo despues del prefijo registro/all entregara todos los datos filtrados por el metodo getAll de RegistroService
  async getRegistros(): Promise<RegistroDto[]> {
    const registros = await this._registroService.getAll();
    return registros;
  }
  @Get(':id') //con este metodo despues del prefijo registro/:id entregara el dato en especifico filtrados por el metodo get de RegistroService
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getRegistro(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RegistroDto> {
    const registro = await this._registroService.get(id);
    return registro;
  }
}
