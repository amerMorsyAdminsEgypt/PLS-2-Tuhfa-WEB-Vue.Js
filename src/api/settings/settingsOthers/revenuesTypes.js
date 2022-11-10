import { METHOD, request } from "./../../../utils/request";
import { RevenuesTypes } from "./../../api";

async function getAll(params) {
  return request(RevenuesTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(RevenuesTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(RevenuesTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(RevenuesTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(RevenuesTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(RevenuesTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(RevenuesTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(RevenuesTypes.deleteImage, METHOD.POST, data);
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
