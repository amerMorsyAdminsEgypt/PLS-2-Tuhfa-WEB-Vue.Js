import { METHOD, request } from "./../utils/request";
import { Reminders } from "./api";

async function getAll(params) {
  return request(Reminders.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Reminders.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Reminders.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Reminders.add, METHOD.POST, data);
}
async function update(data) {
  return request(Reminders.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Reminders.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Reminders.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Reminders.deleteImage, METHOD.POST, data);
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
