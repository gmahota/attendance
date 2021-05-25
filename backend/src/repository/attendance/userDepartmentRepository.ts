import UserDepartment from "../../models/attendance/userDepartment";
import { getRepository,getConnection } from "typeorm";

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<UserDepartment> {
  const UserRepository = getRepository(UserDepartment);

  const data: UserDepartment = await UserRepository.findOneOrFail({
      where: {id: id }
    });

  return data;
};

const findAll = async function findAll(): Promise<UserDepartment[]> {
  const UserRepository = getRepository(UserDepartment);

  const data: UserDepartment[] = await UserRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return data;
}

const create = async function create(
  data: UserDepartment
): Promise<UserDepartment> {
  const UserRepository = getRepository(UserDepartment);

  await UserRepository.save(data);

  return data;
};

export default {
  create,
  findAll,
  findById
};
