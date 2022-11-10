import { METHOD, request } from "./../../../utils/request";
import { ServiceTypes } from "./../../api";

async function getAll(params) {
  return request(ServiceTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ServiceTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ServiceTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ServiceTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(ServiceTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ServiceTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ServiceTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ServiceTypes.deleteImage, METHOD.POST, data);
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
