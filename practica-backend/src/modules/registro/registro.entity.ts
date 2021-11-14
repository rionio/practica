import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('registros')
export class Registro extends BaseEntity {
  @PrimaryColumn('integer')
  companyid: number;
  @Column('integer')
  userid: number;
  @Column('varchar')
  metodo: string;
  @Column('varchar')
  apiid: string;
  @Column('integer')
  tiempo: number;
  @Column('date')
  fecha: Date;
  @Column('varchar')
  source: string;
}
