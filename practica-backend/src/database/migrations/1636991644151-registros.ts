import {MigrationInterface, QueryRunner} from "typeorm";

export class registros1636991644151 implements MigrationInterface {
    name = 'registros1636991644151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registros" ("registroid" SERIAL NOT NULL, "companyid" integer NOT NULL, "userid" integer NOT NULL, "metodo_apiid" character varying NOT NULL, "tiempo" integer NOT NULL, "fecha" character varying NOT NULL, "source" character varying NOT NULL, CONSTRAINT "PK_660988b49a8d031135c5938e194" PRIMARY KEY ("registroid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "registros"`);
    }

}
