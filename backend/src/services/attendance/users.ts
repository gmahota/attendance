
import User  from '../../models/attendance/user'
import UserRepository  from '../../repository/attendance/userRepository'

interface Filter {
  department?:string,
  group?: string;
  scheduleId?: number
}

const getById = (id:string) =>
    UserRepository.findById(id)

const getAll = (filter:Filter) =>
    UserRepository.findAll(filter)

const create = (item:User) =>
  UserRepository.create(item)

const getByScheduleId = (id: string) =>
UserRepository.findByScheduleId(id)

export default {
  getAll,
  getById,
  create,
  getByScheduleId
}
