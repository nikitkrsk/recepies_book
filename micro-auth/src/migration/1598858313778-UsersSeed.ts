import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserSeed } from "../seeds/users";

export class UsersSeed1598858313778
  implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    const users = await getRepository("User").save(UserSeed);
  }

  public async down(_: QueryRunner): Promise<any> {
    // do nothing
  }
}
