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

    @Column({length: 1, nullable:false})
    scheduleByUserOrGroup: string

    @ManyToOne(() => userGroup, (item) => item.id)
    @JoinColumn({name:'userGroupId'})
    userGroup?: userGroup;

    @ManyToOne(() => WorkSchedule, (item) => item.id)
    @JoinColumn({name:'scheduleId'})
    schedule?: WorkSchedule;

    @ManyToOne(() => userDepartment, (item) => item.id)
    @JoinColumn({name:'departmentId'})
    department?: userDepartment;
}