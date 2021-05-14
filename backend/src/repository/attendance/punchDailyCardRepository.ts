
import PunchDailyCard from "../../models/attendance/punchDailyCard";
import { getRepository } from "typeorm";

interface Key {
  id?: any;
}

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<PunchDailyCard> {
  const PunchDailyCardRepository = getRepository(PunchDailyCard);

  const item: PunchDailyCard = await PunchDailyCardRepository.findOneOrFail(
    { 
      where: { id: id }
    }    
  );

  return item;
};

const findAll = async function findAll(): Promise<PunchDailyCard[]> {
  const PunchDailyCardRepository = getRepository(PunchDailyCard);

  const PunchDailyCards: PunchDailyCard[] = await PunchDailyCardRepository.find({
    order: {
      date: "ASC"
    },
    relations: ["details","details.punchLogs"]
  })

  return PunchDailyCards;
};


const create = async function create(
  item: PunchDailyCard,
): Promise<PunchDailyCard> {
  const PunchDailyCardRepository = getRepository(PunchDailyCard);

  const data  = PunchDailyCardRepository.create(item);

  await PunchDailyCardRepository.save(data);

  return data;
};

export default {
  create,
  findById,
  findAll
};