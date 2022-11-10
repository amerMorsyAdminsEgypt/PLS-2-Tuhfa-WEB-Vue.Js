import { METHOD, request } from "./../utils/request";
import { SharedMediaFolders } from "./api";

async function getAll(params) {
  return request(SharedMediaFolders.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(SharedMediaFolders.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(SharedMediaFolders.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(SharedMediaFolders.add, METHOD.POST, data);
}
async function update(data) {
  return request(SharedMediaFolders.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(SharedMediaFolders.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(SharedMediaFolders.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(SharedMediaFolders.deleteImage, METHOD.POST, data);
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
