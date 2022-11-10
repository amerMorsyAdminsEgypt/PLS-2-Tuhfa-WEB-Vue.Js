import { METHOD, request } from "./../../utils/request";
import { UserFamilies } from "./../api";

async function getAll(params) {
  return request(UserFamilies.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserFamilies.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserFamilies.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserFamilies.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserFamilies.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserFamilies.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserFamilies.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserFamilies.deleteImage, METHOD.POST, data);
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
