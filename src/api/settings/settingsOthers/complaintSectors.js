import { METHOD, request } from "./../../../utils/request";
import { ComplaintSectors } from "./../../api";

async function getAll(params) {
  return request(ComplaintSectors.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ComplaintSectors.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ComplaintSectors.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ComplaintSectors.add, METHOD.POST, data);
}
async function update(data) {
  return request(ComplaintSectors.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ComplaintSectors.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ComplaintSectors.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ComplaintSectors.deleteImage, METHOD.POST, data);
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
