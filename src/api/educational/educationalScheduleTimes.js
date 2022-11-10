import { METHOD, request } from "./../../utils/request";
import { EducationalScheduleTimes } from "./../api";

async function getAll(params) {
  return request(EducationalScheduleTimes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EducationalScheduleTimes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalScheduleTimes.getDialog, METHOD.GET, params);
}
async function getGroupReport(params) {
  return request(EducationalScheduleTimes.getGroupReport, METHOD.GET, params);
}
async function getPlaceReport(params) {
  return request(EducationalScheduleTimes.getPlaceReport, METHOD.GET, params);
}
async function getEmployeeReport(params) {
  return request(
    EducationalScheduleTimes.getEmployeeReport,
    METHOD.GET,
    params
  );
}
async function getStudentReport(params) {
  return request(EducationalScheduleTimes.getStudentReport, METHOD.GET, params);
}
async function getReport(params) {
  return request(EducationalScheduleTimes.getReport, METHOD.GET, params);
}
async function getNamesReport(params) {
  return request(EducationalScheduleTimes.getNamesReport, METHOD.GET, params);
}
async function getAllInCalendar(params) {
  return request(EducationalScheduleTimes.getAllInCalendar, METHOD.GET, params);
}
async function enquiry(params) {
  return request(EducationalScheduleTimes.enquiry, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalScheduleTimes.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalScheduleTimes.update, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(EducationalScheduleTimes.finalDelete, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getGroupReport,
  getPlaceReport,
  getEmployeeReport,
  getStudentReport,
  getReport,
  getNamesReport,
  getAllInCalendar,
  enquiry,
  add,
  update,
  finalDelete,
};
