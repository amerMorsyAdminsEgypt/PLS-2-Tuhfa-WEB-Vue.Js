import { METHOD, request } from "./../../utils/request";
import { InterestFollowUps } from "./../api";

async function getAll(params) {
  return request(InterestFollowUps.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(InterestFollowUps.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(InterestFollowUps.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(InterestFollowUps.add, METHOD.POST, data);
}
async function update(data) {
  return request(InterestFollowUps.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(InterestFollowUps.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(InterestFollowUps.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(InterestFollowUps.deleteImage, METHOD.POST, data);
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
