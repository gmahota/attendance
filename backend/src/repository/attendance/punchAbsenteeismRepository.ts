
import PunchAbsenteeism from "../../models/attendance/punchAbsenteeism";
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

const findByDate = async function findByDate(date: Date): Promise<PunchAbsenteeism> {
  const PunchAbsenteeismRepository = getRepository(PunchAbsenteeism);

  const item: PunchAbsenteeism = await PunchAbsenteeismRepository.findOneOrFail(
    {
      where: { date: Date }
    }
  );

  return item;
};

const findAll = async function findAll(filter:Filter): Promise<PunchAbsenteeism[]> {
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

    str_where += `date = '${filter.date}'`
  }

  str_where = str_where.length === 0 ? "" : " where " + str_where

  const str_query = `CALL getAbsenteeism(0,1,0,'${moment(filter.dateBegin).format("YYYY-MM-DD")}', '${moment(filter.dateEnd).format("YYYY-MM-DD")}')`

  const items: any = await entityManager.query(str_query);

  return items[0];
};

const findAll_Absenteeism = async function findAll_Absenteeism(filter:Filter): Promise<any> {
  const entityManager = getManager();

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

  const items: any = await entityManager.query(
    `CALL getAbsenteeism(0,1,0,'${moment(filter.dateBegin).format("YYYY-MM-DD")}', '${moment(filter.dateEnd).format("YYYY-MM-DD")}')`
  );

  return items[0];
};

export default {
  findByDate,
  findAll,
  findAll_Absenteeism
};
