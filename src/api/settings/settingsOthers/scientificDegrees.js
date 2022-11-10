import { METHOD, request } from "./../../../utils/request";
import { ScientificDegrees } from "./../../api";

async function getAll(params) {
  return request(ScientificDegrees.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ScientificDegrees.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ScientificDegrees.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ScientificDegrees.add, METHOD.POST, data);
}
async function update(data) {
  return request(ScientificDegrees.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ScientificDegrees.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ScientificDegrees.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ScientificDegrees.deleteImage, METHOD.POST, data);
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
