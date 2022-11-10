import { METHOD, request } from "./../../../utils/request";
import { PriceLists } from "./../../api";

async function getAll(params) {
  return request(PriceLists.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PriceLists.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(PriceLists.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(PriceLists.add, METHOD.POST, data);
}
async function update(data) {
  return request(PriceLists.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(PriceLists.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(PriceLists.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(PriceLists.deleteImage, METHOD.POST, data);
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
