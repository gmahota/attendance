import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: "SELECT * from view_PunchDaily"
})
export default class PunchDailyCard {
  @ViewColumn()
  data?: string;
  
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
