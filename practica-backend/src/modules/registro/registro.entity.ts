import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('registros')
export class Registro extends BaseEntity {
  @PrimaryColumn()
  companyid: number;
  @Column()
  userid: number;
  @Column()
  metodo: string;
  @Column()
  apiid: string;
  @Column()
  tiempo: number;
  @Column()
  fecha: Date;
  @Column()
  source: string;
}
