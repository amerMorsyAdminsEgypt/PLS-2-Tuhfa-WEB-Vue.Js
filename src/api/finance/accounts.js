import { METHOD, request } from "./../../utils/request";
import { Accounts } from "./../api";

async function getAll(params) {
  return request(Accounts.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Accounts.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Accounts.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Accounts.add, METHOD.POST, data);
}
async function update(data) {
  return request(Accounts.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Accounts.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Accounts.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Accounts.deleteImage, METHOD.POST, data);
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
