
import PunchDailyCardDetails  from '../../models/attendance/punchDailyCardDetails'
import PunchDailyCardDetailsRepository  from '../../repository/attendance/punchDailyCardDetailsRepository'

const getById = (id:string) =>
    PunchDailyCardDetailsRepository.findById(id)

const getAll = () =>
    PunchDailyCardDetailsRepository.findAll()

const create = (PunchDailyCardDetails:PunchDailyCardDetails) =>
  PunchDailyCardDetailsRepository.create(PunchDailyCardDetails)
  
export default {
  getAll,
  getById,
  create
}