import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService], //se usa para que la base de datos obtenga las credenciales
    async useFactory(config: ConfigService) {
      //crea un objeto de conexion con las propiedades necesarias
      return {
        type: 'postgres' as 'post',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        port: config.get(Configuration.DB_PORT),
        database: config.get(Configuration.DATABASE),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migration: [__dirname + '/migrations/*{.ts,.js}'],
      } as unknown as ConnectionOptions;
    },
  }),
];
