import { METHOD, request } from "./../../utils/request";
import { FollowInterests } from "./../api";

async function getAll(params) {
  return request(FollowInterests.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(FollowInterests.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(FollowInterests.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(FollowInterests.add, METHOD.POST, data);
}
async function update(data) {
  return request(FollowInterests.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(FollowInterests.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(FollowInterests.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(FollowInterests.deleteImage, METHOD.POST, data);
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
