import { METHOD, request } from "./../../../utils/request";
import { PersonalCardTypes } from "./../../api";

async function getAll(params) {
  return request(PersonalCardTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PersonalCardTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(PersonalCardTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(PersonalCardTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(PersonalCardTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(PersonalCardTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(PersonalCardTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(PersonalCardTypes.deleteImage, METHOD.POST, data);
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
