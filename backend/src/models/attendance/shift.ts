import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

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
    timeIn: number

    @Column()
    timeOut: number

    @Column()
    gracePeriod: number
}