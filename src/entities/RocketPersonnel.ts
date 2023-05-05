import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { RocketAbsenceShift } from "./RocketAbsenceShift";
import { RocketChildren } from "./RocketChildren";
import { RocketLate } from "./RocketLate";
import { RocketBranch } from "./RocketBranch";
import { RocketTaxDependent } from "./RocketTaxDependent";

@Index("company_branch_id", ["companyBranchId"], {})
@Entity("rocket_personnel", { schema: "rocket_personnel" })
export class RocketPersonnel {
  @Column("int", { name: "id", nullable: true })
  id: number | null;

  @Column("int", { primary: true, name: "personnel_code" })
  personnelCode: number;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "personnel_name", nullable: true, length: 255 })
  personnelName: string | null;

  @Column("varchar", { name: "department_name", nullable: true, length: 255 })
  departmentName: string | null;

  @Column("varchar", { name: "team", nullable: true, length: 255 })
  team: string | null;

  @Column("varchar", { name: "job_title", nullable: true, length: 255 })
  jobTitle: string | null;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("int", { name: "is_student", nullable: true })
  isStudent: number | null;

  @Column("date", { name: "birthday", nullable: true })
  birthday: string | null;

  @Column("varchar", { name: "sex", nullable: true, length: 255 })
  sex: string | null;

  @Column("varchar", { name: "home_town", nullable: true, length: 255 })
  homeTown: string | null;

  @Column("varchar", { name: "graduated_school", nullable: true, length: 255 })
  graduatedSchool: string | null;

  @Column("varchar", { name: "current_address", nullable: true, length: 255 })
  currentAddress: string | null;

  @Column("varchar", { name: "telephone_number", nullable: true, length: 255 })
  telephoneNumber: string | null;

  @Column("varchar", { name: "facebook_optional", nullable: true, length: 255 })
  facebookOptional: string | null;

  @Column("varchar", { name: "characteristic", nullable: true, length: 255 })
  characteristic: string | null;

  @Column("varchar", { name: "iq_test", nullable: true, length: 255 })
  iqTest: string | null;

  @Column("varchar", { name: "position", nullable: true, length: 255 })
  position: string | null;

  @Column("int", { name: "is_fulltime", nullable: true })
  isFulltime: number | null;

  @Column("int", { name: "is_keymenber", nullable: true })
  isKeymenber: number | null;

  @Column("varchar", { name: "potential_leader", nullable: true, length: 255 })
  potentialLeader: string | null;

  @Column("int", { name: "expertise", nullable: true })
  expertise: number | null;

  @Column("int", { name: "attitute", nullable: true })
  attitute: number | null;

  @Column("int", { name: "expertise_attitude", nullable: true })
  expertiseAttitude: number | null;

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;

  @Column("varchar", {
    name: "reason_for_leavingjob",
    nullable: true,
    length: 255,
  })
  reasonForLeavingjob: string | null;

  @Column("date", { name: "starting_date", nullable: true })
  startingDate: string | null;

  @Column("date", { name: "probationary_contract", nullable: true })
  probationaryContract: string | null;

  @Column("date", { name: "labour_contract", nullable: true })
  labourContract: string | null;

  @Column("varchar", { name: "type_contract", nullable: true, length: 255 })
  typeContract: string | null;

  @Column("date", { name: "date_salaryincrease", nullable: true })
  dateSalaryincrease: string | null;

  @Column("date", { name: "date_covid", nullable: true })
  dateCovid: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 255 })
  status: string | null;

  @Column("varchar", { name: "covid_gift", nullable: true, length: 255 })
  covidGift: string | null;

  @Column("int", { name: "baoviet_insurance", nullable: true })
  baovietInsurance: number | null;

  @Column("int", { name: "bhxh_insurance", nullable: true })
  bhxhInsurance: number | null;

  @Column("int", { name: "basic_salary", nullable: true })
  basicSalary: number | null;

  @Column("int", { name: "auto_time_checking", nullable: true })
  autoTimeChecking: number | null;

  @Column("varchar", { name: "bank_name", nullable: true, length: 255 })
  bankName: string | null;

  @Column("varchar", { name: "bank_account", nullable: true, length: 255 })
  bankAccount: string | null;

  @Column("varchar", { name: "bank_branch", nullable: true, length: 255 })
  bankBranch: string | null;

  @Column("int", { name: "company_branch_id", nullable: true })
  companyBranchId: number | null;

  @Column("datetime", { name: "terminate_constract_date", nullable: true })
  terminateConstractDate: Date | null;

  @Column("varchar", { name: "cccd_id", nullable: true, length: 255 })
  cccdId: string | null;

  @Column("date", { name: "cccd_issue_date", nullable: true })
  cccdIssueDate: string | null;

  @Column("varchar", { name: "cccd_issue_place", nullable: true, length: 255 })
  cccdIssuePlace: string | null;

  @Column("int", { name: "is_share_holder", nullable: true })
  isShareHolder: number | null;

  @Column("varchar", {
    name: "original_edu_background",
    nullable: true,
    length: 255,
  })
  originalEduBackground: string | null;

  @Column("varchar", { name: "pernament_address", nullable: true, length: 255 })
  pernamentAddress: string | null;

  @Column("decimal", {
    name: "salary_cost",
    nullable: true,
    comment: "chi phi luong",
    precision: 10,
    scale: 2,
    default: () => "'0.15'",
  })
  salaryCost: string | null;

  @Column("varchar", {
    name: "department_share",
    nullable: true,
    comment: "noi nhan luong KD",
    length: 45,
  })
  departmentShare: string | null;

  @OneToMany(
    () => RocketAbsenceShift,
    (rocketAbsenceShift) => rocketAbsenceShift.personnelCode2
  )
  rocketAbsenceShifts: RocketAbsenceShift[];

  @OneToMany(
    () => RocketChildren,
    (rocketChildren) => rocketChildren.personnelCode2
  )
  rocketChildren: RocketChildren[];

  @OneToMany(() => RocketLate, (rocketLate) => rocketLate.personnelCode2)
  rocketLates: RocketLate[];

  @ManyToOne(
    () => RocketBranch,
    (rocketBranch) => rocketBranch.rocketPersonnels,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "company_branch_id", referencedColumnName: "id" }])
  companyBranch: RocketBranch;

  @OneToMany(
    () => RocketTaxDependent,
    (rocketTaxDependent) => rocketTaxDependent.personnelCode2
  )
  rocketTaxDependents: RocketTaxDependent[];
}
