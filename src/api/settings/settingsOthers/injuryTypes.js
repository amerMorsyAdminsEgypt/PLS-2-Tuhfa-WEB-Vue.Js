import { METHOD, request } from "./../../../utils/request";
import { InjuryTypes } from "./../../api";

async function getAll(params) {
  return request(InjuryTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(InjuryTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(InjuryTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(InjuryTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(InjuryTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(InjuryTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(InjuryTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(InjuryTypes.deleteImage, METHOD.POST, data);
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
