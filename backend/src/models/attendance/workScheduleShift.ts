import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("workSchedule")
export default class workScheduleShift {
    @PrimaryColumn()
    id: string;

    @Column({length: 10, nullable:false })
    clockIn: string
    
    @Column({length: 10, nullable:false })
    clockOut: string

    @Column()
    extraTime: number

    @Column()
    gracePeriod: number
}