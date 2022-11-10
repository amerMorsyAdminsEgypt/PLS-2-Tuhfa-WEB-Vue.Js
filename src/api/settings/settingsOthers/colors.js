import { METHOD, request } from "./../../../utils/request";
import { Colors } from "./../../api";

async function getAll(params) {
  return request(Colors.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Colors.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Colors.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(Colors.add, METHOD.POST, data);
}
async function update(data) {
  return request(Colors.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(Colors.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(Colors.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Colors.deleteImage, METHOD.POST, data);
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
