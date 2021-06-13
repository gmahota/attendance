import User from "../../models/attendance/user";
import { getRepository,getConnection,FindConditions } from "typeorm";

interface Filter {
  department?:string,
  group?: string;
}

const findById = async function findById(id: string): Promise<User> {
  const UserRepository = getRepository(User);

  const data: User = await UserRepository.findOneOrFail({
      where: {id: id },
      relations: ["userGroup","schedule","department"]
    });

  return data;
};





const findAll = async function findAll(filter:Filter): Promise<User[]> {
  const UserRepository = getRepository(User);

  const data: User[] = await UserRepository.find({
    where: "",
    relations: ["userGroup","schedule","department"],
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return data;
}

const findByScheduleId = async function findAll(id: string): Promise<User[]> {
  
  const users: User[]= await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .innerJoinAndSelect("user.schedule","schedule")    
    .where("schedule.id = :id", { id: id })    
    .getMany();

  return users;

  
}

const findByGroupId = async function findByGroupId(id: number): Promise<User[]> {
 

  const users: User[]= await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .innerJoinAndSelect("user.userGroup","userGroup")    
    .where("userGroup.id = :id", { id: id })    
    .getMany();

  return users;
};

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
  findById,
  findByScheduleId,
  findByGroupId
};
