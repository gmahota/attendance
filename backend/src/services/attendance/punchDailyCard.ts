import PunchDailyCard from '../../models/attendance/punchDailyCard'
import PunchDailyCard_View from '../../view/attendance/punchDailyCard_View'
import PunchDailyCardRepository from '../../repository/attendance/punchDailyCardRepository'
import ExcelPunchLog from '../../services/attendance/punchLogExcel'
import PunchTotalHoursRepository from '../../repository/attendance/punchTotalHoursRepository';
import PunchAbsenteeismRepository from '../../repository/attendance/punchAbsenteeismRepository';

interface ReportFilter {
  department?:string,
  name?: string;
  type?: string;
  group?: string;
  user?: string;
  dateBegin?: Date;
  dateEnd?: Date;
  date?: Date;
}

interface Filter {
  department?:string,
  group?: string;
  user?: string;
  dateBegin?: Date;
  dateEnd?: Date;
  date?: Date;
}
const getAll = (filter: Filter) =>
  PunchDailyCardRepository.findAll(filter)

const getByDate = (date: Date) =>
  PunchDailyCardRepository.findByDate(date)

const getReport = async (filter: ReportFilter) => {
  let filterRender :any ={
    department:filter.department || "",
        group: filter.group || "",
        user: filter.user || "",
        dateBegin: new Date(filter.dateBegin|| 0),
        dateEnd: new Date(filter.dateEnd|| 0),
        //date:new Date(filter.date|| 0)
  }

  switch (filter.type) {
    case "Punchdaily":
        const items: PunchDailyCard[] = await PunchDailyCardRepository.findAll({
          ...filterRender
      });

      let items_render = PunchDailyCard_View.renderMany(items);

      ExcelPunchLog.fillPunchDaily(items_render)
      return "uploads/attendance/punchdaily.xlsx" ;

    case "Punchlog":

      const punchs: any = await PunchDailyCardRepository.findAll_Punchlog({
        ...filterRender
      });

      ExcelPunchLog.fillPunchCard(punchs)
      return "uploads/attendance/punchlog.xlsx";

      case "PunchTotalHours":
        const workhrs: any = await PunchTotalHoursRepository.findAll({
          ...filterRender
        });

        ExcelPunchLog.fillTotalHours(workhrs)
        return "uploads/attendance/punchtotal.xlsx";

        case "PunchAbsenteeism":
        const absent: any = await PunchAbsenteeismRepository.findAll({
          ...filterRender
        });

        ExcelPunchLog.fillAbsenteeism(absent)
        return "uploads/attendance/punchabsent.xlsx";


  }

}

export default {
  getAll,
  getReport, getByDate
}
