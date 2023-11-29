import moment from "moment-timezone";

const formatDate = (dateTime) =>
  moment.tz(dateTime, "Asia/Bangkok").format("DD/MM/YYYY HH:mm:ss");

export default formatDate;
