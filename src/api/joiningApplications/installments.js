import { METHOD, request } from "./../../utils/request";
import { Installments } from "./../api";

async function getAll(params) {
  return request(Installments.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Installments.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Installments.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(Installments.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(Installments.add, METHOD.POST, data);
}
async function update(data) {
  return request(Installments.update, METHOD.POST, data);
}

async function cancel(data) {
  return request(Installments.cancel, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Installments.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getReport,
  add,
  update,
  cancel,
  deleteImage,
};
