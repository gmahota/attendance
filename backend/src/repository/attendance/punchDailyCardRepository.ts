
import PunchDailyCard from "../../models/attendance/punchDailyCard";
import { getRepository,getManager } from "typeorm";

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
  const entityManager = getManager();

  const items: PunchDailyCard[] = await entityManager.find(PunchDailyCard,{
    order: {
      data: "ASC"
    }
  })

  return items;
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