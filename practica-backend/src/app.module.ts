import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { RegistroModule } from './modules/registro/registro.module';

@Module({
  imports: [ConfigModule, DatabaseModule, RegistroModule], //se importan todos los modulos que se usaran
  controllers: [AppController], //los controladores son los que responden a los endpoints?
  providers: [AppService, ConfigService], //desconozco lo que se ponga acá
})
export class AppModule {
  static port: number | string; //definimos un atributo estatico el cual sera el puerto

  constructor(private readonly _configService: ConfigService) {
    //de esta manera se puede usar los metodos de ConfigService para determinar el puerto
    AppModule.port = this._configService.get(Configuration.SERVER_PORT);
  }
}
