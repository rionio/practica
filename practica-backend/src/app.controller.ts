import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hola')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mundo')
  getHello(): string {
    return this.appService.getHello();
  }
}
