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
  userid: string;

  @ViewColumn()
  userName: string;
  
  @ViewColumn()
  userGroup: string;
  
  @ViewColumn()
  shiftid: string;

  @ViewColumn()
  description?: string;

  @ViewColumn()
  entrada?: number;

  @ViewColumn()
  entradashift?: number;

  @ViewColumn()
  saida?: number;

  @ViewColumn()
  saidashift?: number;

  @ViewColumn()
  shiftSupposedGracePerior?: number;
}
