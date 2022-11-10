import { METHOD, request } from "./../../../utils/request";
import { KnownMethods } from "./../../api";

async function getAll(params) {
  return request(KnownMethods.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(KnownMethods.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(KnownMethods.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(KnownMethods.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(KnownMethods.add, METHOD.POST, data);
}
async function update(data) {
  return request(KnownMethods.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(KnownMethods.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(KnownMethods.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(KnownMethods.deleteImage, METHOD.POST, data);
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
