import { METHOD, request } from "./../../../utils/request";
import { SocialStatuses } from "./../../api";

async function getAll(params) {
  return request(SocialStatuses.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(SocialStatuses.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(SocialStatuses.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(SocialStatuses.add, METHOD.POST, data);
}
async function update(data) {
  return request(SocialStatuses.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(SocialStatuses.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(SocialStatuses.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(SocialStatuses.deleteImage, METHOD.POST, data);
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
