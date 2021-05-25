import PunchDailyCard from '../../models/attendance/punchDailyCard'
import PunchDailyCard_View from '../../view/attendance/punchDailyCard_View'
import PunchDailyCardRepository from '../../repository/attendance/punchDailyCardRepository'
import ExcelPunchLog from '../../services/attendance/punchLogExcel'

interface ReportFilter {
  department?:string,
  name?: string;
  type?: string;
  group?: string;
  user?: string;
  dateBegin?: Date;
  dateEnd?: Date;
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

  
  switch (filter.type) {
    case "Punchdaily":
        const items: PunchDailyCard[] = await PunchDailyCardRepository.findAll({
        department:filter.department,
        group: filter.group,
        user: filter.user,
        dateBegin: filter.dateBegin,
        dateEnd: filter.dateEnd,
        //date:filter.date
      });

      let items_render = PunchDailyCard_View.renderMany(items);

      ExcelPunchLog.fillPunchDaily(items_render)
      return "uploads/attendance/punchlog.xlsx" ;
      
    case "Punchlog":
      
      const punchs: any = await PunchDailyCardRepository.findAll_Punchlog({
        department:filter.department,
        group: filter.group,
        user: filter.user,
        dateBegin: filter.dateBegin,
        dateEnd: filter.dateEnd,
        //date:filter.date
      });

      ExcelPunchLog.fillPunchCard(punchs)
      return "uploads/attendance/punchdaily.xlsx"; 
  }

}

export default {
  getAll,
  getReport, getByDate
}