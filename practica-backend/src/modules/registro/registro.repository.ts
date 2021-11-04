import { EntityRepository, Repository } from 'typeorm';
import { Registro } from './registro.entity';

@EntityRepository(Registro)
export class RegisterRepository extends Repository<Registro> {}
