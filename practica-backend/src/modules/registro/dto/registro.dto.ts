import { IsNotEmpty } from 'class-validator';

export class RegistroDto {
  // esta clase se usa para filtrar las columnas de la tabla de la base de datos
  @IsNotEmpty()
  companyid: number;
  @IsNotEmpty()
  userid: number;
  @IsNotEmpty()
  tiempo: number;
  @IsNotEmpty()
  fecha: Date;
}
