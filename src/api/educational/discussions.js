import { METHOD, request } from "./../../utils/request";
import { Discussions } from "./../api";

async function getAll(params) {
  return request(Discussions.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Discussions.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Discussions.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Discussions.add, METHOD.POST, data);
}
async function update(data) {
  return request(Discussions.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Discussions.changeActivationType, METHOD.POST, data);
}
async function changeClosedState(data) {
  return request(Discussions.changeClosedState, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Discussions.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Discussions.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationType,
  changeClosedState,
  finalDelete,
  deleteImage,
};
