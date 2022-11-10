import { METHOD, request } from "./../../utils/request";
import { ComplaintFollowUps } from "./../api";

async function getAll(params) {
  return request(ComplaintFollowUps.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ComplaintFollowUps.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ComplaintFollowUps.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ComplaintFollowUps.add, METHOD.POST, data);
}
async function update(data) {
  return request(ComplaintFollowUps.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ComplaintFollowUps.changeActivationType, METHOD.POST, data);
}

async function close(data) {
  return request(ComplaintFollowUps.close, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(ComplaintFollowUps.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ComplaintFollowUps.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationType,
  close,
  finalDelete,
  deleteImage,
};
