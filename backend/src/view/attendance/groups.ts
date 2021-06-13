import Group from "../../models/attendance/userGroup"


export default {
  render(item: Group) {
    return {
      id:item.id,
      name:item.name, 
      createdAt:item.createdAt,
      updatedAt:item.updatedAt,
      parent_id:item.parent_id
    };
  },
  renderMany(items: Group[]) {
    return items?.map(item =>this.render(item));
  },
};
