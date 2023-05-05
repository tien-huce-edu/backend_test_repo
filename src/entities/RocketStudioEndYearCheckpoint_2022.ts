import { Column, Entity } from "typeorm";

@Entity("rocket_studio_end_year_checkpoint_2022", {
  schema: "rocket_personnel",
})
export class RocketStudioEndYearCheckpoint_2022 {
  @Column("varchar", { name: "id", nullable: true, length: 255 })
  id: string | null;

  @Column("varchar", { name: "personnel_code", nullable: true, length: 255 })
  personnelCode: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "personnel_name", nullable: true, length: 255 })
  personnelName: string | null;

  @Column("varchar", { name: "team", nullable: true, length: 255 })
  team: string | null;

  @Column("varchar", { name: "position", nullable: true, length: 255 })
  position: string | null;

  @Column("varchar", { name: "starting_date", nullable: true, length: 255 })
  startingDate: string | null;

  @Column("varchar", { name: "labour_contract", nullable: true, length: 255 })
  labourContract: string | null;

  @Column("varchar", { name: "seniority", nullable: true, length: 255 })
  seniority: string | null;

  @Column("varchar", {
    name: "seniority_labour_contract",
    nullable: true,
    length: 255,
  })
  seniorityLabourContract: string | null;

  @Column("varchar", { name: "job_title", nullable: true, length: 255 })
  jobTitle: string | null;

  @Column("varchar", { name: "salary_increase", nullable: true, length: 255 })
  salaryIncrease: string | null;

  @Column("varchar", { name: "result_average", nullable: true, length: 255 })
  resultAverage: string | null;

  @Column("varchar", { name: "average_expertise", nullable: true, length: 255 })
  averageExpertise: string | null;

  @Column("varchar", { name: "responsibilities", nullable: true, length: 255 })
  responsibilities: string | null;

  @Column("varchar", { name: "active", nullable: true, length: 255 })
  active: string | null;

  @Column("varchar", { name: "skills", nullable: true, length: 255 })
  skills: string | null;

  @Column("varchar", { name: "professional", nullable: true, length: 255 })
  professional: string | null;

  @Column("varchar", {
    name: "average_performance",
    nullable: true,
    length: 255,
  })
  averagePerformance: string | null;

  @Column("varchar", { name: "deadline", nullable: true, length: 255 })
  deadline: string | null;

  @Column("varchar", { name: "quality", nullable: true, length: 255 })
  quality: string | null;

  @Column("varchar", { name: "average_teamwork", nullable: true, length: 255 })
  averageTeamwork: string | null;

  @Column("varchar", { name: "communication", nullable: true, length: 255 })
  communication: string | null;

  @Column("varchar", { name: "helpful", nullable: true, length: 255 })
  helpful: string | null;

  @Column("varchar", { name: "respect_others", nullable: true, length: 255 })
  respectOthers: string | null;

  @Column("varchar", { name: "empathy", nullable: true, length: 255 })
  empathy: string | null;

  @Column("varchar", { name: "engaging", nullable: true, length: 255 })
  engaging: string | null;

  @Column("varchar", { name: "integrity", nullable: true, length: 255 })
  integrity: string | null;

  @Column("varchar", {
    name: "average_follow_rules",
    nullable: true,
    length: 255,
  })
  averageFollowRules: string | null;

  @Column("varchar", { name: "on_time", nullable: true, length: 255 })
  onTime: string | null;

  @Column("varchar", { name: "focus_on_work", nullable: true, length: 255 })
  focusOnWork: string | null;

  @Column("text", { name: "short_term_plan", nullable: true })
  shortTermPlan: string | null;

  @Column("text", { name: "long_term_plan", nullable: true })
  longTermPlan: string | null;

  @Column("text", { name: "suggestions", nullable: true })
  suggestions: string | null;

  @Column("text", { name: "good_review", nullable: true })
  goodReview: string | null;

  @Column("text", { name: "feedback", nullable: true })
  feedback: string | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @Column("varchar", {
    name: "rating_coefficient",
    nullable: true,
    length: 255,
  })
  ratingCoefficient: string | null;

  @Column("varchar", {
    name: "contribution_coefficient",
    nullable: true,
    length: 255,
  })
  contributionCoefficient: string | null;

  @Column("varchar", {
    name: "management_coefficient",
    nullable: true,
    length: 255,
  })
  managementCoefficient: string | null;

  @Column("varchar", {
    name: "seniority_coefficient",
    nullable: true,
    length: 255,
  })
  seniorityCoefficient: string | null;

  @Column("varchar", { name: "working_time", nullable: true, length: 255 })
  workingTime: string | null;

  @Column("varchar", { name: "total_coefficient", nullable: true, length: 255 })
  totalCoefficient: string | null;

  @Column("varchar", { name: "bonus_lunar_year", nullable: true, length: 255 })
  bonusLunarYear: string | null;

  @Column("varchar", { name: "salary_increase1", nullable: true, length: 255 })
  salaryIncrease1: string | null;

  @Column("varchar", {
    name: "average_basic_salary",
    nullable: true,
    length: 255,
  })
  averageBasicSalary: string | null;

  @Column("int", { name: "satisfy_point", nullable: true })
  satisfyPoint: number | null;
}
