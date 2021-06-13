import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import User from "./user";
import Shift from "./shift";
import Group from "./userGroup";

@Entity("workSchedule")
export default class WorkSchedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50, nullable: false })
  name: string

  @Column({ length: 50, nullable: true })
  type?: string

  @OneToMany(() => Shift, item => item.schedule, {
    cascade: ['insert', 'update']
  })
  Shifts?: Shift[]

  @OneToMany(() => User, item => item.schedule, {
    cascade: ['insert', 'update']
  })
  users?: User[]

  @OneToMany(() => Group, item => item.schedule, {
    cascade: ['insert', 'update']
  })
  groups?: Group[]
}
