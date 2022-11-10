import { METHOD, request } from "./../../utils/request";
import { UserOperations } from "./../api";

async function getAll(params) {
  return request(UserOperations.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserOperations.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserOperations.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserOperations.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserOperations.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserOperations.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserOperations.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserOperations.deleteImage, METHOD.POST, data);
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
