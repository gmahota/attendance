import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import WorkSchedule from "./workSchedule";

@Entity("userGroup")
export default class userGroup {
    @PrimaryColumn()
    id: number

    @Column({length: 50, nullable:false})
    name: string

    @Column()
    createdAt?:Date

    @Column()
    updatedAt?:Date

    @Column()
    parent_id?:number

    @ManyToOne(() => WorkSchedule, (item) => item.id)
    @JoinColumn({name:'scheduleId'})
    schedule?: WorkSchedule;

}
