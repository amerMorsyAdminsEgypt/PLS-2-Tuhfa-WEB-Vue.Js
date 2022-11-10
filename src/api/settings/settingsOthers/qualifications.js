import { METHOD, request } from "./../../../utils/request";
import { Qualifications } from "./../../api";

async function getAll(params) {
  return request(Qualifications.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Qualifications.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Qualifications.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Qualifications.add, METHOD.POST, data);
}
async function update(data) {
  return request(Qualifications.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Qualifications.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Qualifications.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Qualifications.deleteImage, METHOD.POST, data);
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
