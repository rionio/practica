import { Controller, Get } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { RegistroService } from './registro.service';

@Controller('registros')
export class RegistroController {
  constructor(private readonly _registroService: RegistroService) {}

  @Get()
  async getRegistros(): Promise<RegistroDto[]> {
    const registros = await this._registroService.getAll();
    return registros;
  }
}
