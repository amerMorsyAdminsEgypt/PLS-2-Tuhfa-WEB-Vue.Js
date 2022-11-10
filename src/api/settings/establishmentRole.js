import { METHOD, request } from "./../../utils/request";
import { EstablishmentRole } from "./../api";

async function getAll(params) {
  return request(EstablishmentRole.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EstablishmentRole.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EstablishmentRole.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(EstablishmentRole.add, METHOD.POST, data);
}
async function update(data) {
  return request(EstablishmentRole.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(EstablishmentRole.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(EstablishmentRole.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EstablishmentRole.deleteImage, METHOD.POST, data);
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
