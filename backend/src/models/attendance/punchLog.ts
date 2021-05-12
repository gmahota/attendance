import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("punchLog")
export default class PunchLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 50, nullable:false })  
  code?:string;

  @Column({length: 50, nullable:false })  
  userId?: string

  @Column({length: 50, nullable:false })  
  userName?:string
  
  @Column()
  date:Date
      
  @Column()
  json: string
}
