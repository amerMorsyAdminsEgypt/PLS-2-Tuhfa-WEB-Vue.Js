import { METHOD, request } from "./../../utils/request";
import { StoreItems } from "./../api";

async function getAll(params) {
  return request(StoreItems.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(StoreItems.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(StoreItems.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(StoreItems.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(StoreItems.add, METHOD.POST, data);
}
async function update(data) {
  return request(StoreItems.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(StoreItems.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(StoreItems.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(StoreItems.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getReport,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
};
