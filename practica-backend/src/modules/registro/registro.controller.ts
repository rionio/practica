import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { RegistroService } from './registro.service';

@Controller('registro')
export class RegistroController {
  constructor(private readonly _registroService: RegistroService) {}

  @Get('all')
  async getRegistros(): Promise<RegistroDto[]> {
    const registros = await this._registroService.getAll();
    return registros;
  }
  @Get(':id')
  async getRegistro(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RegistroDto> {
    const registro = await this._registroService.get(id);
    return registro;
  }
}
