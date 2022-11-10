import { METHOD, request } from "./../../utils/request";
import { StudentScheduleExamTimes } from "./../api";

async function getAll(params) {
  return request(StudentScheduleExamTimes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(StudentScheduleExamTimes.getDetails, METHOD.GET, params);
}
async function getInCalendar(params) {
  return request(StudentScheduleExamTimes.getInCalendar, METHOD.GET, params);
}
async function generateExam(params) {
  return request(StudentScheduleExamTimes.generateExam, METHOD.GET, params);
}

export default {
  getAll,
  getDetails,
  getInCalendar,
  generateExam,
};
