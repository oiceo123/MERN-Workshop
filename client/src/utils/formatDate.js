// ใช้ moment เป็นเวลาในรูปแบบสากล
/* import moment from "moment-timezone";

const formatDate = (dateTime) =>
  moment.tz(dateTime, "Asia/Bangkok").format("DD/MM/YYYY HH:mm:ss"); */

// ไม่ใช้ moment เป็นเวลาในรูปแบบประเทศไทย
const formatDate = (dateTime) =>
  new Date(dateTime).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

export default formatDate;
