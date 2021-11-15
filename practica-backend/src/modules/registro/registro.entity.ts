import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('registros')
export class Registro extends BaseEntity {
  @PrimaryGeneratedColumn()
  registroid: number;
  @Column('integer')
  companyid: number;
  @Column('integer')
  userid: number;
  @Column('varchar')
  metodo_apiid: string;
  @Column('integer')
  tiempo: number;
  @Column('varchar')
  fecha: Date;
  @Column('varchar')
  source: string;
}
