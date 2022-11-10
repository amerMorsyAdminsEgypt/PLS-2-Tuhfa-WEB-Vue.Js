import { METHOD, request } from "./../utils/request";
import { SystemComponents } from "./api";

async function getAll(params) {
  return request(SystemComponents.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(SystemComponents.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(SystemComponents.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(SystemComponents.add, METHOD.POST, data);
}
async function update(data) {
  return request(SystemComponents.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(SystemComponents.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(SystemComponents.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(SystemComponents.deleteImage, METHOD.POST, data);
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
