import User from "../../models/attendance/user";
import { getRepository,getConnection,FindConditions } from "typeorm";

interface Filter {
  department?:string,
  group?: string;
}

const findById = async function findById(id: string): Promise<User> {
  const UserRepository = getRepository(User);

  const data: User = await UserRepository.findOneOrFail({
      where: {id: id }
    });

  return data;
};

const findAll = async function findAll(filter:Filter): Promise<User[]> {
  const UserRepository = getRepository(User);
  
  const data: User[] = await UserRepository.find({
    where: "",
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
