import { METHOD, request } from "./../../utils/request";
import { UserInjuries } from "./../api";

async function getAll(params) {
  return request(UserInjuries.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserInjuries.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserInjuries.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserInjuries.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserInjuries.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserInjuries.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserInjuries.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserInjuries.deleteImage, METHOD.POST, data);
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
