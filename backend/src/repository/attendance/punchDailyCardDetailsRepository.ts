import PunchDailyCardDetails from "../../models/attendance/punchDailyCardDetails";
import { getRepository } from "typeorm";

interface Key {
  id?: any;
}

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<PunchDailyCardDetails> {
  const PunchDailyCardDetailsRepository = getRepository(PunchDailyCardDetails);

  const item: PunchDailyCardDetails = await PunchDailyCardDetailsRepository.findOneOrFail(
    { 
      where: { id: id }
    }    
  );

  return item;
};

const findAll = async function findAll(): Promise<PunchDailyCardDetails[]> {
  const PunchDailyCardDetailsRepository = getRepository(PunchDailyCardDetails);

  const PunchDailyCardDetailss: PunchDailyCardDetails[] = await PunchDailyCardDetailsRepository.find({
    order: {
      date: "ASC"
    }
  })

  return PunchDailyCardDetailss;
};


const create = async function create(
  item: PunchDailyCardDetails,
): Promise<PunchDailyCardDetails> {
  const PunchDailyCardDetailsRepository = getRepository(PunchDailyCardDetails);

  const data  = PunchDailyCardDetailsRepository.create(item);

  await PunchDailyCardDetailsRepository.save(data);

  return data;
};

export default {
  create,
  findById,
  findAll
};