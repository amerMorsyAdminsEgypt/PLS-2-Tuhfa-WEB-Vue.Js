import { METHOD, request } from "./../../../utils/request";
import { JobGrades } from "./../../api";

async function getAll(params) {
  return request(JobGrades.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(JobGrades.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(JobGrades.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(JobGrades.add, METHOD.POST, data);
}
async function update(data) {
  return request(JobGrades.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(JobGrades.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(JobGrades.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(JobGrades.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
};
