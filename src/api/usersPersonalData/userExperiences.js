import { METHOD, request } from "./../../utils/request";
import { UserExperiences } from "./../api";

async function getAll(params) {
  return request(UserExperiences.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserExperiences.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserExperiences.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserExperiences.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserExperiences.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserExperiences.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserExperiences.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserExperiences.deleteImage, METHOD.POST, data);
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
