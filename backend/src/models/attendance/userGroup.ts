import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import WorkSchedule from "./workSchedule";

@Entity("userGroup")
export default class user {
    @PrimaryColumn()
    id: number
    
    @Column({length: 50, nullable:false})
    name: string    

    @ManyToOne(() => WorkSchedule, (item) => item.id)
    scheduleId?: WorkSchedule;
}