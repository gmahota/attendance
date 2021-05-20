import WorkSchedule from "../../models/attendance/workSchedule";
import { getRepository,getConnection } from "typeorm";

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<WorkSchedule> {
  const WorkScheduleRepository = getRepository(WorkSchedule);

  const data: WorkSchedule = await WorkScheduleRepository.findOneOrFail({
    where: { id: id },
    relations:["Shifts"]
    });

  return data;
};

const findAll = async function findAll(): Promise<WorkSchedule[]> {
  const WorkScheduleRepository = getRepository(WorkSchedule);

  const data: WorkSchedule[] = await WorkScheduleRepository.find({
    order: {
      name: "ASC",
      id: "DESC",
    },
  });

  return data;
}

const create = async function create(
  data: WorkSchedule
): Promise<WorkSchedule> {
  const WorkScheduleRepository = getRepository(WorkSchedule);

  await WorkScheduleRepository.save(data);

  return data;
};

export default {
  create,
  findAll,
  findById
};
