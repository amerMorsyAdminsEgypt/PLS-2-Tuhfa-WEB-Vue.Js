import { METHOD, request } from "./../utils/request";
import { CountedServices } from "./api";

async function getAll(params) {
  return request(CountedServices.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(CountedServices.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(CountedServices.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(CountedServices.add, METHOD.POST, data);
}
async function update(data) {
  return request(CountedServices.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(CountedServices.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(CountedServices.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(CountedServices.deleteImage, METHOD.POST, data);
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
