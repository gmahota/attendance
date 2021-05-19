import UserGroup from "../../models/attendance/userGroup";
import { getRepository,getConnection } from "typeorm";

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<UserGroup> {
  const UserRepository = getRepository(UserGroup);

  const data: UserGroup = await UserRepository.findOneOrFail({
      where: {id: id }
    });

  return data;
};

const findAll = async function findAll(): Promise<UserGroup[]> {
  const UserRepository = getRepository(UserGroup);

  const data: UserGroup[] = await UserRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return data;
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
  findById
};
