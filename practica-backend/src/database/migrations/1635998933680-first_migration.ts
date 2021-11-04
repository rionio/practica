import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstMigration1635998933680 implements MigrationInterface {
  name = 'firstMigration1635998933680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "registros" ("companyid" integer NOT NULL, "userid" integer NOT NULL, "metodo" character varying NOT NULL, "apiid" character varying NOT NULL, "tiempo" integer NOT NULL, "fecha" TIMESTAMP NOT NULL, "source" character varying NOT NULL, CONSTRAINT "PK_1557ecd2bf3f482d99e47282e2c" PRIMARY KEY ("companyid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "registros"`);
  }
}
