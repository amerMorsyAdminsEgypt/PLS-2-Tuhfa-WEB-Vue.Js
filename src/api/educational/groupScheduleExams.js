import { METHOD, request } from "./../../utils/request";
import { GroupScheduleExams } from "./../api";

async function getAll(params) {
  return request(GroupScheduleExams.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(GroupScheduleExams.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(GroupScheduleExams.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(GroupScheduleExams.add, METHOD.POST, data);
}
async function update(data) {
  return request(GroupScheduleExams.update, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(GroupScheduleExams.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(GroupScheduleExams.deleteImage, METHOD.POST, data);
}

async function getReport(params) {
  return request(GroupScheduleExams.getReport, METHOD.GET, params);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  finalDelete,
  deleteImage,
  getReport,
};
