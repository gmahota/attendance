import User from "../../models/attendance/user";
import { getRepository,getConnection } from "typeorm";

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<User> {
  const UserRepository = getRepository(User);

  const data: User = await UserRepository.findOneOrFail({
      where: {id: id }
    });

  return data;
};

const findAll = async function findAll(): Promise<User[]> {
  const UserRepository = getRepository(User);

  const data: User[] = await UserRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return data;
}

const create = async function create(
  data: User
): Promise<User> {
  const UserRepository = getRepository(User);

  await UserRepository.save(data);

  return data;
};

export default {
  create,
  findAll,
  findById
};
