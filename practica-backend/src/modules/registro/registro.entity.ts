import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('registros')
export class Registro extends BaseEntity {
  @PrimaryColumn('number')
  companyid: number;
  @Column('number')
  userid: number;
  @Column('varchar')
  metodo: string;
  @Column('varchar')
  apiid: string;
  @Column('number')
  tiempo: number;
  @Column('date')
  fecha: Date;
  @Column('varchar')
  source: string;
}
