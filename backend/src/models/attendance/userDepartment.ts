import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import user from "./user";

@Entity("userDepartment")
export default class userDepartment {
    @PrimaryColumn({length: 50 })
    id: string;
    
    @Column({length: 50, nullable:false})
    name: string   

}