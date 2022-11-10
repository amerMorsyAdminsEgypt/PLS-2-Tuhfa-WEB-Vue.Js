import { METHOD, request } from "./../../utils/request";
import { EducationalGroups } from "./../api";

async function getAll(params) {
  return request(EducationalGroups.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EducationalGroups.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalGroups.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalGroups.add, METHOD.POST, data);
}
async function addWithScheduleTimes(data) {
  return request(EducationalGroups.addWithScheduleTimes, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalGroups.update, METHOD.POST, data);
}
async function changeCloseType(data) {
  return request(EducationalGroups.changeCloseType, METHOD.POST, data);
}
async function changeFinishType(data) {
  return request(EducationalGroups.changeFinishType, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(EducationalGroups.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(EducationalGroups.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EducationalGroups.deleteImage, METHOD.POST, data);
}
async function addStudents(data) {
  return request(EducationalGroups.addStudents, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  addWithScheduleTimes,
  update,
  changeCloseType,
  changeFinishType,
  changeActivationType,
  finalDelete,
  deleteImage,
  addStudents,
};
