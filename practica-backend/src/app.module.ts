import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { RegistroModule } from './modules/registro/registro.module';

@Module({
  imports: [ConfigModule, DatabaseModule, RegistroModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.SERVER_PORT);
  }
}
