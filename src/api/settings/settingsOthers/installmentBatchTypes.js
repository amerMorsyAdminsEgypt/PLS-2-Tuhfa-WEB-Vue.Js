import { METHOD, request } from "./../../../utils/request";
import { InstallmentBatchTypes } from "./../../api";

async function getAll(params) {
  return request(InstallmentBatchTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(InstallmentBatchTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(InstallmentBatchTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(InstallmentBatchTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(InstallmentBatchTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(InstallmentBatchTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(InstallmentBatchTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(InstallmentBatchTypes.deleteImage, METHOD.POST, data);
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
