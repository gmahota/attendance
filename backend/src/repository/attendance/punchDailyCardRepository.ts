
import PunchDailyCard from "../../models/attendance/punchDailyCard";
import { getRepository,getManager,Between } from "typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";
import moment from "moment";
interface Filter {
  group?: string;
  user?: string;
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

  let condations:FindConditions<PunchDailyCard>[] = []

  let str_where = ""
  if (filter?.user) {
    str_where += str_where.length === 0 ?
      `userId = '${filter.user}'` :
      ` and userId = '${filter.user}'`
  }

  if (filter?.date) {
    str_where += str_where.length === 0 ?
      `date = '${filter.date}'` :
      ` and date = '${filter.date}'`
  }

  if (filter?.dateBegin && filter?.dateEnd) {
    str_where += str_where.length === 0 ? "" : " and "
      
    str_where += `Date(v.date)  BETWEEN  '${moment(filter.dateBegin).format("YYYY-MM-DD")}'
      and '${moment(filter.dateEnd).format("YYYY-MM-DD")}'`
  }
  
  str_where = str_where.length === 0 ? "" : " where " + str_where

const items: PunchDailyCard[] = await entityManager.query(
  `SELECT
     ROW_NUMBER() OVER(PARTITION BY userId) as id,
     v.*
     FROM view_PunchDaily v ${str_where}`
  );
  
  return items;
};

export default {
  findByDate,
  findAll
};