import { METHOD, request } from "./../../utils/request";
import { UserQualifications } from "./../api";

async function getAll(params) {
  return request(UserQualifications.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserQualifications.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserQualifications.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(UserQualifications.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(UserQualifications.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserQualifications.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserQualifications.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserQualifications.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserQualifications.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getReport,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
};
