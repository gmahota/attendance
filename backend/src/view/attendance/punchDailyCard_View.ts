import PunchDailyCard from "../../models/attendance/punchDailyCard";
import moment from "moment";

export default {
  render(item: PunchDailyCard) {
    let totalDelay= ""
    if(!item.delayOut && ! item.delayEntrance){
      const a = moment.duration(item.delayOut);
      const b = moment.duration(item.delayEntrance);

      const c = a.add(b);

      totalDelay= [
              ('0' + c.hours()).slice(-2),
              ('0' + c.minutes()).slice(-2),
              ('0' + c.seconds()).slice(-2),
          ].join(':');
    }


    return {
        ...item,
        totalDelay
    };
  },
  renderMany(items: PunchDailyCard[]) {
    return items?.map(item =>this.render(item));
  },
};
