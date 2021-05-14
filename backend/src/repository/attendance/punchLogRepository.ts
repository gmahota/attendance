import PunchLog from "../../models/attendance/punchLog";
import { getRepository } from "typeorm";

interface Key {
  id?: any;
}

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<PunchLog> {
  const PunchLogRepository = getRepository(PunchLog);

  const item: PunchLog = await PunchLogRepository.findOneOrFail(
    { 
      where: { id: id }
    }    
  );

  return item;
};

const findAll = async function findAll(): Promise<PunchLog[]> {
  const PunchLogRepository = getRepository(PunchLog);

  const PunchLogs: PunchLog[] = await PunchLogRepository.find({
    order: {
      date: "ASC"
    }
  })

  return PunchLogs;
};


const create = async function create(
  item: PunchLog,
): Promise<PunchLog> {
  const PunchLogRepository = getRepository(PunchLog);

  const data  = PunchLogRepository.create(item);

  await PunchLogRepository.save(data);

  return data;
};

export default {
  create,
  findById,
  findAll
};