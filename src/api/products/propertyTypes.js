import { METHOD, request } from "./../../utils/request";
import { PropertyTypes } from "./../api";

async function getAll(params) {
  return request(PropertyTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PropertyTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(PropertyTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(PropertyTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(PropertyTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(PropertyTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(PropertyTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(PropertyTypes.deleteImage, METHOD.POST, data);
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
