
import PunchDailyCard from "../../models/attendance/punchDailyCard";
import { getRepository,getManager,Between } from "typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";

interface Filter {
  group?: string;
  user?: string;
  dateBegin?: Date;
  dateEnd?: Date;
  date?:Date;
}

const findByDate = async function findByDate(date: Date): Promise<PunchDailyCard> {
  const PunchDailyCardRepository = getRepository(PunchDailyCard);

  const item: PunchDailyCard = await PunchDailyCardRepository.findOneOrFail(
    { 
      where: { date: Date }
    }    
  );

  return item;
};

const findAll = async function findAll(filter:Filter): Promise<PunchDailyCard[]> {
  const entityManager = getManager();

  let condations:FindConditions<PunchDailyCard>[] = []

  if(filter?.user) {
    condations.push({userId:filter.user})
  }

  if(filter?.date) {
    condations.push({date:filter.date})
  }

  if (filter?.dateBegin && filter?.dateEnd) {
    
    condations.push({date:Between(filter?.dateBegin,filter?.dateEnd)})
  }
  
  const items: PunchDailyCard[] = await entityManager.find(PunchDailyCard,{
    where:condations,
    order: {
      date: "ASC"
    }
  })

  
  return items;
};

export default {
  findByDate,
  findAll
};