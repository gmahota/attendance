import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import WorkSchedule from "./workSchedule";


@Entity("user")
export default class user {
    @PrimaryColumn()
    id: number
    
    @Column({length: 50, nullable:false})
    name: string

    @Column()
    scheduleId?: number

    @Column({length: 1, nullable:false})
    scheduleByUserOrGroup: string

    @ManyToOne(() => WorkSchedule, (item) => item.id)
    groupId?: WorkSchedule;
}