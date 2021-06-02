import { ViewEntity, ViewColumn ,PrimaryColumn} from "typeorm";

@ViewEntity({
  expression: `SELECT ROW_NUMBER() OVER(PARTITION BY userId) as id
  , v.* FROM view_PunchDaily v;`
})
export default class PunchDailyCard {
  @ViewColumn()
  @PrimaryColumn()
  id: number;

  @ViewColumn()
  date?: Date;

  @ViewColumn()
  userId?: string;

  @ViewColumn()
  userName?: string;

  @ViewColumn()
  userGroup?: string;

  @ViewColumn()
  userGroupName?: string;

  @ViewColumn()
  userDepartment?: string;

  @ViewColumn()
  shiftId?: string;

  @ViewColumn()
  description?: string;

  @ViewColumn()
  entrada?: Date;

  @ViewColumn()
  entradashift?: Date;

  @ViewColumn()
  saida?: Date;

  @ViewColumn()
  saidashift?: Date;

  @ViewColumn()
  shiftSupposedGracePerior?: Date;

  @ViewColumn()
  delayEntrance?: Date

  @ViewColumn()
  delayOut?: Date
}
