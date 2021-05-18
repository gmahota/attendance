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
  
  @Column()
  date: Date
  
  @Column({ length: 20, nullable: false })
  device?: string

  @Column({ length: 20, nullable: false })
  deviceId?: string
  
  @Column({ length: 20, nullable: false })
  userDefinedSchedulerId: string

  @Column({ length: 20, nullable: false })
  schedulerId: string

  @Column({ length: 50, nullable: false })
  userDefinedSchedulerName: string

  @Column({ length: 50, nullable: false })
  exception: string

  @Column({ length: 20 })
  punchType: string

  @Column()
  shiftSupposedTimeIn: number

  @Column()
  shiftSupposedTimeOut: number

  @Column()
  shiftSupposedGracePerior: number

  @Column({ length: 50, nullable: false })
  shiftDescription: string
       
  @Column()
  json: string
}
