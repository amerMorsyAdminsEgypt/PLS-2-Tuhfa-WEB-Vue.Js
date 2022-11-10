import { METHOD, request } from "./../utils/request";
import { Users } from "./api";

async function getAll(params) {
  return request(Users.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Users.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Users.getDialog, METHOD.GET, params);
}
async function getReport(params) {
  return request(Users.getReport, METHOD.GET, params);
}
async function getCardIdReport(params) {
  return request(Users.getCardIdReport, METHOD.GET, params);
}

async function add(data) {
  return request(Users.add, METHOD.POST, data);
}
async function update(data) {
  return request(Users.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Users.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Users.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Users.deleteImage, METHOD.POST, data);
}
async function updateAndGetUserFinanceStatistic(data) {
  return request(Users.updateAndGetUserFinanceStatistic, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getReport,
  getCardIdReport,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
  updateAndGetUserFinanceStatistic,
};
