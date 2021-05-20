import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Shift from "./shift";

@Entity("workSchedule")
export default class WorkSchedule {
    @PrimaryColumn()
    id: string;

    @Column({length: 50, nullable:false })
    name: string

    @OneToMany(()=> Shift, item => item.scheduleId,{
        cascade:['insert','update']
    })
    Shifts?: Shift[]
}