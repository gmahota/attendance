import moment from "moment";

export default function formatDate(date,format) {
  try {
    var a = moment(date);

    return a.format(format);
  } catch (e) {
    return "";
  }
}