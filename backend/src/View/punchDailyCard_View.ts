import PunchDailyCard from "../models/attendance/punchDailyCard";

export default {
  render(item: PunchDailyCard) {
    return {
        ...item,
        totalDelay:item.getTotalDelay()
    };
  },
  renderMany(items: PunchDailyCard[]) {
    return items.map(item =>this.render(item));
  },
};
