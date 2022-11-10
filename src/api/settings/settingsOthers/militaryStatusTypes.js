import { METHOD, request } from "./../../../utils/request";
import { MilitaryStatusTypes } from "./../../api";

async function getAll(params) {
  return request(MilitaryStatusTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(MilitaryStatusTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(MilitaryStatusTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(MilitaryStatusTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(MilitaryStatusTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(MilitaryStatusTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(MilitaryStatusTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(MilitaryStatusTypes.deleteImage, METHOD.POST, data);
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
