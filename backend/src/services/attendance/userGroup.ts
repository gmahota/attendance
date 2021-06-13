
import UserGroup  from '../../models/attendance/userGroup'
import UserGroupRepository  from '../../repository/attendance/userGroupRepository'

const getById = (id:string) =>
    UserGroupRepository.findById(id)

const getAll = () =>
    UserGroupRepository.findAll()

const create = (item:UserGroup) =>
  UserGroupRepository.create(item)

  const getByScheduleId = (id: string) =>
  UserGroupRepository.findByScheduleId(id)

export default {
  getAll,
  getById,
  create,
  getByScheduleId
}