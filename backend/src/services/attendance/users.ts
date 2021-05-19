
import User  from '../../models/attendance/user'
import UserRepository  from '../../repository/attendance/userRepository'

const getById = (id:string) =>
    UserRepository.findById(id)

const getAll = () =>
    UserRepository.findAll()

const create = (item:User) =>
  UserRepository.create(item)
  
export default {
  getAll,
  getById,
  create
}