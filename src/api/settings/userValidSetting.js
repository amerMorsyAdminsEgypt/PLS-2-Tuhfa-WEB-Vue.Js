import { METHOD, request } from "./../../utils/request";
import { UserValidSettings } from "./../api";

async function getAll(params) {
  return request(UserValidSettings.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserValidSettings.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserValidSettings.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserValidSettings.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserValidSettings.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserValidSettings.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserValidSettings.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserValidSettings.deleteImage, METHOD.POST, data);
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
