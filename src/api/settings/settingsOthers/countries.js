import { METHOD, request } from "./../../../utils/request";
import { Countries } from "./../../api";

async function getAll(params) {
  return request(Countries.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Countries.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Countries.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Countries.add, METHOD.POST, data);
}
async function update(data) {
  return request(Countries.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Countries.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Countries.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Countries.deleteImage, METHOD.POST, data);
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
