import { METHOD, request } from "./../../utils/request";
import { Complaints } from "./../api";

async function getAll(params) {
  return request(Complaints.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Complaints.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Complaints.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(Complaints.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(Complaints.add, METHOD.POST, data);
}
async function update(data) {
  return request(Complaints.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Complaints.changeActivationType, METHOD.POST, data);
}

async function close(data) {
  return request(Complaints.close, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(Complaints.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Complaints.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getReport,
  add,
  update,
  changeActivationType,
  close,
  finalDelete,
  deleteImage,
};
