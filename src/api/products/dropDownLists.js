import { METHOD, request } from "./../../utils/request";
import { DropDownLists } from "./../api";

async function getAll(params) {
  return request(DropDownLists.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(DropDownLists.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(DropDownLists.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(DropDownLists.add, METHOD.POST, data);
}
async function update(data) {
  return request(DropDownLists.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(DropDownLists.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(DropDownLists.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(DropDownLists.deleteImage, METHOD.POST, data);
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
