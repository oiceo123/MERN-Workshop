// ใช้ moment เป็นเวลาในรูปแบบสากล
/* import moment from "moment-timezone";

const formatDate = (dateTime) =>
  moment.tz(dateTime, "Asia/Bangkok").format("DD/MM/YYYY HH:mm:ss"); */

// ไม่ใช้ moment เป็นเวลาในรูปแบบประเทศไทย
/* const formatDate = (dateTime) =>
  new Date(dateTime).toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  }); */

const formatDate = (dateTime) =>
  new Date(dateTime).toLocaleString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export default formatDate;
