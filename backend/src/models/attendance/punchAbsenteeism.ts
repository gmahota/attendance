import { ViewEntity, ViewColumn ,PrimaryColumn} from "typeorm";
//acho que nao eh necessario porque no repository ja se faz esse row over
// @ViewEntity({
//   expression: `SELECT ROW_NUMBER() OVER(PARTITION BY userId) as id
//   , v.* FROM view_totalWHours v;`
// })
export default class PunchTotalHours {
  @ViewColumn()
  @PrimaryColumn()
  id: number;

  @ViewColumn()
  userId?: string;

  @ViewColumn()
  userName?: string;

  @ViewColumn()
  shiftId?: number;

  @ViewColumn()
  description?: string;

  @ViewColumn()
  entradashift?: Date

  @ViewColumn()
  saidashift?: Date

  @ViewColumn()
  selected_date?: Date

  }
