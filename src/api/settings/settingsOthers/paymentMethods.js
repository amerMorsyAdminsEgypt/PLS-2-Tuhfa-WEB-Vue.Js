import { METHOD, request } from "./../../../utils/request";
import { PaymentMethods } from "./../../api";

async function getAll(params) {
  return request(PaymentMethods.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PaymentMethods.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(PaymentMethods.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(PaymentMethods.add, METHOD.POST, data);
}
async function update(data) {
  return request(PaymentMethods.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(PaymentMethods.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(PaymentMethods.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(PaymentMethods.deleteImage, METHOD.POST, data);
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
