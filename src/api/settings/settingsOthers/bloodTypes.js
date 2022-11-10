import { METHOD, request } from "./../../../utils/request";
import { BloodTypes } from "./../../api";

async function getAll(params) {
  return request(BloodTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(BloodTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(BloodTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(BloodTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(BloodTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(BloodTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(BloodTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(BloodTypes.deleteImage, METHOD.POST, data);
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
