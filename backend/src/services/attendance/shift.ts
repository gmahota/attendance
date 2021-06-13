
import Shift  from '../../models/attendance/shift'
import ShiftRepository  from '../../repository/attendance/shiftRepository'

const getById = (id:string) =>
    ShiftRepository.findById(id)

const getAll = () =>
    ShiftRepository.findAll()

const getByScheduleId = (id:string) =>
  ShiftRepository.findByScheduleId(id)

const create = (item:Shift) =>
  ShiftRepository.create(item)
  
export default {
  getAll,
  getById,
  create,
  getByScheduleId
}