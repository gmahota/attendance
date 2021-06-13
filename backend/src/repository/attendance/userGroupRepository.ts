import UserGroup from "../../models/attendance/userGroup";
import { getRepository,getConnection } from "typeorm";

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<UserGroup> {
  const UserRepository = getRepository(UserGroup);

  const data: UserGroup = await UserRepository.findOneOrFail({
      where: {id: id }, relations: ['schedule']
    });

  return data;
};

const findAll = async function findAll(): Promise<UserGroup[]> {
  const UserRepository = getRepository(UserGroup);

  const data: UserGroup[] = await UserRepository.find({
    order: {
      id: "ASC",
    },
  });

  return data;
}

const findByScheduleId = async function findAll(id: string): Promise<UserGroup[]> {
  const UserGroupRepository = getRepository(UserGroup);

  const groups: UserGroup[]= await getConnection()
    .createQueryBuilder()
    .select("userGroup")
    .from(UserGroup, "userGroup")
    .innerJoinAndSelect("userGroup.schedule","schedule")    
    .where("schedule.id = :id", { id: id })    
    .getMany();

  return groups;

  
}


const create = async function create(
  data: UserGroup
): Promise<UserGroup> {
  const UserRepository = getRepository(UserGroup);

  await UserRepository.save(data);

  return data;
};

export default {
  create,
  findAll,
  findById,
  findByScheduleId
};
