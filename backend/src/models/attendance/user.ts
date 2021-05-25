import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import WorkSchedule from "./workSchedule";
import userDepartment from "./userDepartment";
import userGroup from "./userGroup";


@Entity("user")
export default class user {
    @PrimaryColumn()
    id: number
    
    @Column({length: 50, nullable:false})
    name: string

    @Column()
    : number

    @Column({length: 1, nullable:false})
    scheduleByUserOrGroup: string

    @ManyToOne(() => userGroup, (item) => item.id)
    userGroupId?: userGroup;

    @ManyToOne(() => WorkSchedule, (item) => item.id)
    scheduleId?: WorkSchedule;

    @ManyToOne(() => userDepartment, (item) => item.id)
    departmentId?: userDepartment;
}