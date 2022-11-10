import { METHOD, request } from "./../utils/request";
import { Newss } from "./api";

async function getAll(params) {
  return request(Newss.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Newss.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Newss.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Newss.add, METHOD.POST, data);
}
async function update(data) {
  return request(Newss.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Newss.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Newss.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Newss.deleteImage, METHOD.POST, data);
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
