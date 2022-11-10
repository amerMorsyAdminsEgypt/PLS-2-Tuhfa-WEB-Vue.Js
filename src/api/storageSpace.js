import { METHOD, request } from "./../utils/request";
import { StorageSpaces } from "./api";

async function getAll(params) {
  return request(StorageSpaces.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(StorageSpaces.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(StorageSpaces.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(StorageSpaces.add, METHOD.POST, data);
}
async function update(data) {
  return request(StorageSpaces.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(StorageSpaces.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(StorageSpaces.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(StorageSpaces.deleteImage, METHOD.POST, data);
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
