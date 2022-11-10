import { METHOD, request } from "./../../../utils/request";
import { ComplaintTypes } from "./../../api";

async function getAll(params) {
  return request(ComplaintTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ComplaintTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ComplaintTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ComplaintTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(ComplaintTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ComplaintTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ComplaintTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ComplaintTypes.deleteImage, METHOD.POST, data);
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
