import { METHOD, request } from "./../../../utils/request";
import { RelativeRelationTypes } from "./../../api";

async function getAll(params) {
  return request(RelativeRelationTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(RelativeRelationTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(RelativeRelationTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(RelativeRelationTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(RelativeRelationTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(RelativeRelationTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(RelativeRelationTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(RelativeRelationTypes.deleteImage, METHOD.POST, data);
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
