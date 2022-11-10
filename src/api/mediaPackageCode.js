import { METHOD, request } from "./../utils/request";
import { MediaPackageCodes } from "./api";

async function getAll(params) {
  return request(MediaPackageCodes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(MediaPackageCodes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(MediaPackageCodes.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(MediaPackageCodes.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(MediaPackageCodes.add, METHOD.POST, data);
}
async function subscribe(data) {
  return request(MediaPackageCodes.subscribe, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(MediaPackageCodes.changeActivationType, METHOD.POST, data);
}
// DeleteNotUsedCodes
async function finalDelete(data) {
  return request(MediaPackageCodes.finalDelete, METHOD.POST, data);
}
async function deleteNotUsedCodes(data) {
  return request(MediaPackageCodes.deleteNotUsedCodes, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getReport,
  add,
  subscribe,
  changeActivationType,
  finalDelete,
  deleteNotUsedCodes,
};
