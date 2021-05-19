
import WorkSchedule  from '../../models/attendance/workSchedule'
import WorkScheduleRepository  from '../../repository/attendance/workScheduleRepository'

const getById = (id:string) =>
    WorkScheduleRepository.findById(id)

const getAll = () =>
    WorkScheduleRepository.findAll()

const create = (item:WorkSchedule) =>
  WorkScheduleRepository.create(item)
  
export default {
  getAll,
  getById,
  create
}