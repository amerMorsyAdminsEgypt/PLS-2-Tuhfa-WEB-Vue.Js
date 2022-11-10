import { METHOD, request } from "./../../../utils/request";
import { ClassificationDegrees } from "./../../api";

async function getAll(params) {
  return request(ClassificationDegrees.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ClassificationDegrees.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ClassificationDegrees.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ClassificationDegrees.add, METHOD.POST, data);
}
async function update(data) {
  return request(ClassificationDegrees.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ClassificationDegrees.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ClassificationDegrees.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ClassificationDegrees.deleteImage, METHOD.POST, data);
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
