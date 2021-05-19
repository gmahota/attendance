import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("workSchedule")
export default class WorkSchedule {
    @PrimaryColumn()
    id: string;

    @Column({length: 50, nullable:false })
    name: string
}