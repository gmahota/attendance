import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("punchLog")
export default class PunchLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 50, nullable:false })
  code?:string;

  @Column({length: 50, nullable:false })
  userId?: string

  @Column({length: 50, nullable:false })
  userName?: string

  @Column({length: 50, nullable:false })
  userGroup?:string

  @Column({length: 100})
  userDepartment?:string

  @Column()
  date: Date

  @Column({ length: 100, nullable: true })
  device?: string

  @Column({ length: 100, nullable: true })
  deviceId?: string

  @Column({ length: 20, nullable: true })
  userDefinedSchedulerId?: string

  @Column({ length: 20, nullable: true })
  schedulerId?: string

  @Column({ length: 50, nullable: true })
  userDefinedSchedulerName?: string

  @Column({ length: 50, nullable: true })
  exception?: string

  @Column({ length: 20 ,nullable: true })
  punchType?: string

  @Column({nullable: true })
  shiftSupposedTimeIn?: Date

  @Column({nullable: true })
  shiftSupposedTimeOut?: Date

  @Column({nullable: true })
  shiftSupposedGracePerior?: Date

  @Column({ length: 50, nullable: true })
  shiftDescription?: string

  @Column({ length: 50, nullable: true })
  json?: string
}
