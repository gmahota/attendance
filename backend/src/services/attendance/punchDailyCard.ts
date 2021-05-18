import PunchDailyCardRepository  from '../../repository/attendance/punchDailyCardRepository'

const getById = (id:string) =>
PunchDailyCardRepository.findById(id)

const getAll = () =>
PunchDailyCardRepository.findAll()

  
export default {
  getAll,
  getById
}