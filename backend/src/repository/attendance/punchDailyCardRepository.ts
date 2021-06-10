
import PunchDailyCard from "../../models/attendance/punchDailyCard";
import { getRepository,getManager,Between } from "typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";
import moment from "moment";
interface Filter {
  group?: string;
  user?: string;
  department?:string;
  dateBegin?: Date;
  dateEnd?: Date;
  date?:Date;
}

const findByDate = async function findByDate(date: Date): Promise<PunchDailyCard> {
  const PunchDailyCardRepository = getRepository(PunchDailyCard);

  const item: PunchDailyCard = await PunchDailyCardRepository.findOneOrFail(
    {
      where: { date: Date }
    }
  );

  return item;
};

const findAll = async function findAll(filter:Filter): Promise<PunchDailyCard[]> {
  const entityManager = getManager();

  let str_where = ""

  if (filter?.user) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `userId = '${filter.user}'`
  }

  if (filter?.department) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `userDepartment = '${filter.department}'`
  }

  if (filter?.group) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `userGroup = '${filter.group}'`
  }

  if (filter?.dateBegin && filter?.dateEnd) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `Date(v.date)  BETWEEN  '${moment(filter.dateBegin).format("YYYY-MM-DD")}'
      and '${moment(filter.dateEnd).format("YYYY-MM-DD")}'`
  }

  if (filter?.date) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `date = '${moment(filter.date).format("YYYY-MM-DD")}'`
  }

  str_where = str_where.length === 0 ? "" : " where " + str_where

  const str_query = `SELECT
    ROW_NUMBER() OVER(PARTITION BY userId) as id,
    v.*,g.name as userGroupName
    FROM view_PunchDaily v
    left join userGroup g on g.id = v.userGroup
    ${str_where}

  order by v.date asc, v.username asc
  `
  console.log(str_query)

  const items: PunchDailyCard[] = await entityManager.query(str_query);

  return items;
};

const findAll_Punchlog = async function findAll_Punchlog(filter:Filter): Promise<any> {
  const entityManager = getManager();

  let str_where = ""
  if (filter?.user) {
    str_where += str_where.length === 0 ?
      `userId = '${filter.user}'` :
      ` and userId = '${filter.user}'`
  }

  if (filter?.date) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `date = '${moment(filter.date).format("YYYY-MM-DD")}'`

  }

  if (filter?.dateBegin && filter?.dateEnd) {
    str_where += str_where.length === 0 ? "" : " and "

    str_where += `Date(v.date)  BETWEEN  '${moment(filter.dateBegin).format("YYYY-MM-DD")}'
      and '${moment(filter.dateEnd).format("YYYY-MM-DD")}'`
  }

  str_where = str_where.length === 0 ? "" : " where " + str_where

  const str_query =`SELECT
    ROW_NUMBER() OVER(PARTITION BY userId) as id,
    v.*,g.name as userGroupName
    FROM View_PunchCard v
    left join userGroup g on g.id = v.userGroup
    ${str_where}
  `

  const items: any = await entityManager.query(
    str_query
  );

  return items;
};

export default {
  findByDate,
  findAll,
  findAll_Punchlog
};
