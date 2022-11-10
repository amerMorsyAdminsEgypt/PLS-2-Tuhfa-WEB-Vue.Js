import { METHOD, request } from "./../../utils/request";
import { DiscussionComments } from "./../api";

async function getAll(params) {
  return request(DiscussionComments.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(DiscussionComments.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(DiscussionComments.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(DiscussionComments.add, METHOD.POST, data);
}
async function update(data) {
  return request(DiscussionComments.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(DiscussionComments.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(DiscussionComments.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(DiscussionComments.deleteImage, METHOD.POST, data);
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
