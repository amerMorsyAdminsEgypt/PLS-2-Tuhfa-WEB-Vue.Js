import { METHOD, request } from "./../../../utils/request";
import { GradingPlans } from "./../../api";

async function getAll(params) {
  return request(GradingPlans.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(GradingPlans.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(GradingPlans.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(GradingPlans.add, METHOD.POST, data);
}
async function update(data) {
  return request(GradingPlans.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(GradingPlans.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(GradingPlans.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(GradingPlans.deleteImage, METHOD.POST, data);
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
