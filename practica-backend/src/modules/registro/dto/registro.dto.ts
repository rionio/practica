import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegistroDto {
  // esta clase se usa para filtrar las columnas de la tabla de la base de datos
  @Expose()
  companyid: number;
  @Expose()
  userid: number;
  @Expose()
  tiempo: number;
  @Expose()
  fecha: Date;
}
