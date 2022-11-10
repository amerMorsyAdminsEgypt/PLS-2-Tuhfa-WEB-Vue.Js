import { METHOD, request } from "./../../../utils/request";
import { Banks } from "./../../api";

async function getAll(params) {
  return request(Banks.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Banks.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Banks.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Banks.add, METHOD.POST, data);
}
async function update(data) {
  return request(Banks.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Banks.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Banks.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Banks.deleteImage, METHOD.POST, data);
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
