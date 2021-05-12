import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import PunchDailyCardDetails from './punchDailyCardDetails';

@Entity("punchDailyCard")
export default class PunchDailyCard {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 50, nullable:false })  
  userId?: string

  @Column({length: 50, nullable:false })  
  userName?: string
  
  @Column({length: 50, nullable:false })  
  userGroup?:string
  
  @Column()
  date: Date
  
  @Column({ length: 20, nullable: false })
  schedulerId: string

  @Column({ length: 50, nullable: false })
  exception: string
      
  @Column()
  json: string

  @OneToMany(()=> PunchDailyCardDetails, item => item.dailyCard,{
        cascade:['insert','update']
    })
    details?: PunchDailyCardDetails[]
}
