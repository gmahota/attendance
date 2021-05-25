
import UserDepartment  from '../../models/attendance/userDepartment'
import UserDepartmentRepository  from '../../repository/attendance/userDepartmentRepository'

const getById = (id:string) =>
    UserDepartmentRepository.findById(id)

const getAll = () =>
    UserDepartmentRepository.findAll()

const create = (item:UserDepartment) =>
  UserDepartmentRepository.create(item)
  
export default {
  getAll,
  getById,
  create
}