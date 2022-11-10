import { METHOD, request } from "./../../utils/request";
import { UserPersonalCards } from "./../api";

async function getAll(params) {
  return request(UserPersonalCards.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserPersonalCards.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserPersonalCards.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserPersonalCards.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserPersonalCards.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserPersonalCards.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserPersonalCards.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserPersonalCards.deleteImage, METHOD.POST, data);
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
