// import * as bcrypt from "bcrypt";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
// import { config } from "../../config/config";
// import { User } from "../../entities/user.entity";

export class UserRolesSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    // console.log("user roles seeding");
    // const authorityRepository = dataSource.getRepository(RocketPersonnelRole);
    // const adminRoleData = {
    //   rolename: "ROLE_ADMIN",
    // };
    // const newAdminAuthority = authorityRepository.create(adminRoleData);
    // await authorityRepository.save(newAdminAuthority);
    // const userRoleData = {
    //   rolename: "ROLE_USER",
    // };
    // const newUserAuthority = authorityRepository.create(userRoleData);
    // await authorityRepository.save(newUserAuthority);
    // const admin = {
    //   login: "admin",
    //   firstName: "Administrator",
    //   lastName: "Administrator",
    //   email: "admin@localhost.it",
    //   imageUrl: "",
    //   activated: true,
    //   langKey: "vi",
    //   createdBy: "system",
    //   lastModifiedBy: "system",
    //   password: await bcrypt.hash(
    //     "admin",
    //     config.get("security.jwt.hash-salt-or-rounds")
    //   ),
    //   authorities: [newAdminAuthority, newUserAuthority],
    // };
    // const userRepository = dataSource.getRepository(User);
    // const userAdmin = userRepository.create(admin);
    // await userRepository.save(userAdmin);
  }
}
