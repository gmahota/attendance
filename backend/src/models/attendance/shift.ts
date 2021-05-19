import { Datetime } from 'react-datetime';
import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import WorkSchedule from "./workSchedule";

@Entity("shift")
export default class shift {
    @PrimaryColumn()
    id: number
    
    @Column({length: 50, nullable:false})
    name: string

    @Column({length: 50, nullable:false})
    description: string

    @Column({ length: 50, nullable: false })
    type: string
    
    @Column()
    timeIn: Date

    @Column()
    timeOut: Date

    @Column()
    gracePeriod: Date

    @Column()
    dayOfWeek: number

    @ManyToOne(() => WorkSchedule, (item) => item.id)
    scheduleId?: WorkSchedule;
}