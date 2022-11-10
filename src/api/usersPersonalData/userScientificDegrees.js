import { METHOD, request } from "./../../utils/request";
import { UserScientificDegrees } from "./../api";

async function getAll(params) {
  return request(UserScientificDegrees.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserScientificDegrees.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserScientificDegrees.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserScientificDegrees.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserScientificDegrees.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserScientificDegrees.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserScientificDegrees.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserScientificDegrees.deleteImage, METHOD.POST, data);
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
