
import UserGroup  from '../../models/attendance/userGroup'
import UserGroupRepository  from '../../repository/attendance/userGroupRepository'

const getById = (id:string) =>
    UserGroupRepository.findById(id)

const getAll = () =>
    UserGroupRepository.findAll()

const create = (item:UserGroup) =>
  UserGroupRepository.create(item)
  
export default {
  getAll,
  getById,
  create
}