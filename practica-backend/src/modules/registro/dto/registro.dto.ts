import { IsNotEmpty } from 'class-validator';

export class RegistroDto {
  @IsNotEmpty()
  companyid: number;
  @IsNotEmpty()
  userid: number;
  @IsNotEmpty()
  tiempo: number;
  @IsNotEmpty()
  fecha: Date;
}
