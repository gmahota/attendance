
import PunchDailyCard  from '../../models/attendance/punchDailyCard'
import PunchDailyCardRepository  from '../../repository/attendance/punchDailyCardRepository'

const getById = (id:string) =>
    PunchDailyCardRepository.findById(id)

const getAll = () =>
    PunchDailyCardRepository.findAll()

const create = (PunchDailyCard:PunchDailyCard) =>
  PunchDailyCardRepository.create(PunchDailyCard)
  
export default {
  getAll,
  getById,
  create
}