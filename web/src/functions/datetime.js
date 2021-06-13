import moment from "moment";

export default function formatDate(date,format) {
  try {
    var a = moment(date);

    const dt = a.format(format)
    
    if(dt.toString() === "Invalid date"){
      return ""
    }
    return dt
  } catch (e) {
    return "";
  }
}