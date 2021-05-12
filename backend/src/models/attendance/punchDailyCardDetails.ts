import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import PunchDailyCard from "./punchDailyCard";
import PunchLog from "./punchLog";

@Entity("punchDailyCardDetails")
export default class PunchDailyCardDetails {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date

  @Column({length: 50, nullable:false })  
  userId?: string

  @Column({length: 50, nullable:false })  
  userName?: string
  
  @Column({length: 50, nullable:false })  
  userGroup?:string
  
  @Column({ length: 20, nullable: false })
  schedulerId: string

  @Column({ length: 50, nullable: false })
  exception: string

  @Column()
  time_in: Date
  
  @Column()
  time_out: Date
  
  @Column()
  time_work:number
      
  @Column()
  json: string

  @ManyToOne(() => PunchDailyCard, (item) => item.details)
  @JoinColumn({ name: "timeCard_id" })
  dailyCard?: PunchDailyCard;

  @OneToMany(()=> PunchLog, item => item.dailyCard,{
        cascade:['insert','update']
    })
    punchLogs?: PunchLog[]
}
