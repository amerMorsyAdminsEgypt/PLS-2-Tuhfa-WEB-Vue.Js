import { METHOD, request } from "./../../../utils/request";
import { Specialties } from "./../../api";

async function getAll(params) {
  return request(Specialties.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Specialties.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Specialties.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Specialties.add, METHOD.POST, data);
}
async function update(data) {
  return request(Specialties.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Specialties.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Specialties.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Specialties.deleteImage, METHOD.POST, data);
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
