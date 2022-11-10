import { METHOD, request } from "./../../../utils/request";
import { PriorityTypes } from "./../../api";

async function getAll(params) {
  return request(PriorityTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PriorityTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(PriorityTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(PriorityTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(PriorityTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(PriorityTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(PriorityTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(PriorityTypes.deleteImage, METHOD.POST, data);
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
