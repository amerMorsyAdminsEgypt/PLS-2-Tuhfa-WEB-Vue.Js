import { METHOD, request } from "./../../../utils/request";
import { ExpensesTypes } from "./../../api";

async function getAll(params) {
  return request(ExpensesTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ExpensesTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ExpensesTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(ExpensesTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(ExpensesTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(ExpensesTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(ExpensesTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(ExpensesTypes.deleteImage, METHOD.POST, data);
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
