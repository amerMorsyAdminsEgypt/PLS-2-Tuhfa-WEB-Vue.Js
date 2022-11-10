import { METHOD, request } from "./../../../utils/request";
import { Certificates } from "./../../api";

async function getAll(params) {
  return request(Certificates.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Certificates.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Certificates.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Certificates.add, METHOD.POST, data);
}
async function update(data) {
  return request(Certificates.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Certificates.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Certificates.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Certificates.deleteImage, METHOD.POST, data);
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
