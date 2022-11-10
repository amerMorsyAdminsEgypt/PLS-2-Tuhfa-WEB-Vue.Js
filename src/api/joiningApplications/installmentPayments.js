import { METHOD, request } from "./../../utils/request";
import { InstallmentPayments } from "./../api";

async function getAll(params) {
  return request(InstallmentPayments.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(InstallmentPayments.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(InstallmentPayments.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(InstallmentPayments.add, METHOD.POST, data);
}
async function refund(data) {
  return request(InstallmentPayments.refund, METHOD.POST, data);
}

async function deleteImage(data) {
  return request(InstallmentPayments.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  refund,
  deleteImage,
};
