import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { TimeCard } from "./timeCard";

@Entity("timeCardDetails")
export class TimeCardDetails {
  @PrimaryGeneratedColumn('increment')
  id: number
  
  @Column({ length: 50, nullable: false })
  userId: string;

  @Column({ length: 50, nullable: false })
  shiftId?: string;

  @Column({ length: 50, nullable: false })
  workScheduleId?: string;

  @Column()
  date: Date;

  @Column()
  exception_codes: string;

  @Column()
  timeIn: number;

  @Column()
  timeOut: number;

  @Column()
  in_time: number

  @Column()
  out_time: number

  @Column()
  extraTime: number
    
  @Column()
  overTime: number
    
  @Column()
  regularTime: number

  @ManyToOne(() => TimeCard, (item) => item.timeCardDetails)
  @JoinColumn({ name: "timeCard_id" })
  timeCard?: TimeCard;
}
