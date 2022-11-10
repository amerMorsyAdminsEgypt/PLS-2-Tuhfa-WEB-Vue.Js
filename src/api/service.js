import { METHOD, request } from "./../utils/request";
import { Services } from "./api";

async function getAll(params) {
  return request(Services.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Services.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Services.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Services.add, METHOD.POST, data);
}
async function update(data) {
  return request(Services.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Services.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Services.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Services.deleteImage, METHOD.POST, data);
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
