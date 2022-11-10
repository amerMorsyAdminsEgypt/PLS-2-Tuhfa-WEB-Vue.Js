import { METHOD, request } from "./../../utils/request";
import { UserTrainingCourses } from "./../api";

async function getAll(params) {
  return request(UserTrainingCourses.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserTrainingCourses.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserTrainingCourses.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserTrainingCourses.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserTrainingCourses.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserTrainingCourses.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserTrainingCourses.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserTrainingCourses.deleteImage, METHOD.POST, data);
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
