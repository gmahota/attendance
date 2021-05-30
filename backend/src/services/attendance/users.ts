
import User  from '../../models/attendance/user'
import UserRepository  from '../../repository/attendance/userRepository'

interface Filter {
  department?:string,
  group?: string;
}

const getById = (id:string) =>
    UserRepository.findById(id)

const getAll = (filter:Filter) =>
    UserRepository.findAll(filter)

const create = (item:User) =>
  UserRepository.create(item)
  
export default {
  getAll,
  getById,
  create
}