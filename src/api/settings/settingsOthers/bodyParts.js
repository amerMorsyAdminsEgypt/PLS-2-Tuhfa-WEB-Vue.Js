import { METHOD, request } from "./../../../utils/request";
import { BodyParts } from "./../../api";

async function getAll(params) {
  return request(BodyParts.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(BodyParts.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(BodyParts.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(BodyParts.add, METHOD.POST, data);
}
async function update(data) {
  return request(BodyParts.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(BodyParts.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(BodyParts.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(BodyParts.deleteImage, METHOD.POST, data);
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
