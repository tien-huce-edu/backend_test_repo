import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RocketPersonnelRole } from "./RocketPersonnelRole";
import { RocketPersonnelAccount } from "./RocketPersonnelAccount";

@Index("userId", ["userId"], {})
@Entity("rocket_account_roles", { schema: "rocket_personnel" })
export class RocketAccountRoles {
  @Column("datetime", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("int", { primary: true, name: "roleId" })
  roleId: number;

  @Column("int", { primary: true, name: "userId" })
  userId: number;

  @ManyToOne(
    () => RocketPersonnelRole,
    (rocketPersonnelRole) => rocketPersonnelRole.rocketAccountRoles,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
  role: RocketPersonnelRole;

  @ManyToOne(
    () => RocketPersonnelAccount,
    (rocketPersonnelAccount) => rocketPersonnelAccount.rocketAccountRoles,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
  user: RocketPersonnelAccount;
}
