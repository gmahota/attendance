import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { TimeCardDetails } from "./timeCardDetails";

@Entity("timeCard")    
export class TimeCard{
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column({length: 50, nullable:false})
    userId: string

    @Column({length: 50, nullable:false})
    shiftId?: string
    
    @Column({length: 50, nullable:false})
    workScheduleId?:string

    @Column()
    date: Date
    
    @Column({length: 50, nullable:false})
    exception_codes: string
    
    @Column()
    in_time: number

    @Column()
    out_time: number

    @Column()
    extraTime: number
    
    @Column()
    overTime: number
    
    @Column()
    regularTime: number
    
    @Column()
    worked_leave_time: number
    
    @Column()
    non_worked_leave_time:number
    
    @OneToMany(()=> TimeCardDetails, item => item.timeCard,{
        cascade:['insert','update']
    })
    timeCardDetails?: TimeCardDetails[]
    
}