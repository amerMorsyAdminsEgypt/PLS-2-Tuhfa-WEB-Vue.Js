import { METHOD, request } from "./../../../utils/request";
import { ReminderPlans } from "./../../api";

async function getAll(params) {
  return request(ReminderPlans.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ReminderPlans.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ReminderPlans.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ReminderPlans.add, METHOD.POST, data);
}
async function update(data) {
  return request(ReminderPlans.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ReminderPlans.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ReminderPlans.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ReminderPlans.deleteImage, METHOD.POST, data);
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
