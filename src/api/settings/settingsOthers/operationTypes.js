import { METHOD, request } from "./../../../utils/request";
import { OperationTypes } from "./../../api";

async function getAll(params) {
  return request(OperationTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(OperationTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(OperationTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(OperationTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(OperationTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(OperationTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(OperationTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(OperationTypes.deleteImage, METHOD.POST, data);
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
