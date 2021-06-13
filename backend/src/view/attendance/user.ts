import User from "../../models/attendance/user"


export default {
  render(item: User) {
    return {
      id:item.id,
      name:item.name, 
      scheduleByUserOrGroup:item.scheduleByUserOrGroup,
      userGroup:item.userGroup?.name,
      schedule:item.schedule?.name
    };
  },
  renderMany(items: User[]) {
    return items?.map(item =>this.render(item));
  },
};
