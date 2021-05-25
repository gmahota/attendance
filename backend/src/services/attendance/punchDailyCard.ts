import PunchDailyCard from '../../models/attendance/punchDailyCard'
import PunchDailyCardRepository from '../../repository/attendance/punchDailyCardRepository'
import ExcelPunchLog from '../../services/attendance/punchLogExcel'

interface ReportFilter {
  name?: string;
  type?: string;
  group?: string;
  user?: string;
  dateBegin?: Date;
  dateEnd?: Date;
}

interface Filter {
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

  const items: PunchDailyCard[] = await PunchDailyCardRepository.findAll({
    group: filter.group,
    user: filter.user,
    dateBegin: filter.dateBegin,
    dateEnd: filter.dateEnd,
    //date:filter.date
  });

  console.log(items)

  switch (filter.type) {
    case "General":
      ExcelPunchLog.fillPunchDaily(items)
      return "uploads/attendance/punchlog.xlsx" ;
      
    case "Individual":
      ExcelPunchLog.fillPunchCard(items)
      return "uploads/attendance/punchdaily.xlsx"; 
  }

}

export default {
  getAll,
  getReport, getByDate
}