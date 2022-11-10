import { METHOD, request } from "./../utils/request";
import { Places } from "./api";

async function getAll(params) {
  return request(Places.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Places.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Places.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Places.add, METHOD.POST, data);
}
async function update(data) {
  return request(Places.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Places.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Places.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Places.deleteImage, METHOD.POST, data);
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
