import { METHOD, request } from "./../../../utils/request";
import { NewsCategories } from "./../../api";

async function getAll(params) {
  return request(NewsCategories.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(NewsCategories.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(NewsCategories.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(NewsCategories.add, METHOD.POST, data);
}
async function update(data) {
  return request(NewsCategories.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(NewsCategories.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(NewsCategories.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(NewsCategories.deleteImage, METHOD.POST, data);
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
