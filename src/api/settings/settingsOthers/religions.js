import { METHOD, request } from "./../../../utils/request";
import { Religions } from "./../../api";

async function getAll(params) {
  return request(Religions.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Religions.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Religions.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(Religions.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(Religions.add, METHOD.POST, data);
}
async function update(data) {
  return request(Religions.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Religions.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Religions.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Religions.deleteImage, METHOD.POST, data);
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
