import { METHOD, request } from "./../utils/request";
import { API_LONG_TIMEOUT } from "./../utils/constants";
import { StorageSpaceMedias } from "./api";

async function getAll(params) {
  return request(StorageSpaceMedias.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(StorageSpaceMedias.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(StorageSpaceMedias.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(StorageSpaceMedias.add, METHOD.POST, data, {
    timeout: API_LONG_TIMEOUT,
  });
}
async function update(data) {
  return request(StorageSpaceMedias.update, METHOD.POST, data, {
    timeout: API_LONG_TIMEOUT,
  });
}

async function changeActivationType(data) {
  return request(StorageSpaceMedias.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(StorageSpaceMedias.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(StorageSpaceMedias.deleteImage, METHOD.POST, data);
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
