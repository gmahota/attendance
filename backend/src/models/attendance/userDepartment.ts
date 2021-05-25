import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import user from "./user";


@Entity("userDepartment")
export default class userDepartment {
    @PrimaryColumn()
    id: number
    
    @Column({length: 50, nullable:false})
    name: string   

}