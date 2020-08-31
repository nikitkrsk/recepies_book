import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFullName1598858313778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME "name" to "fullName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
