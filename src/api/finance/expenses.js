import { METHOD, request } from "./../../utils/request";
import { Expenses } from "./../api";

async function getAll(params) {
  return request(Expenses.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Expenses.getDetails, METHOD.GET, params);
}

async function pay(data) {
  return request(Expenses.pay, METHOD.POST, data);
}
async function refund(data) {
  return request(Expenses.refund, METHOD.POST, data);
}

async function deleteImage(data) {
  return request(Expenses.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  pay,
  refund,
  deleteImage,
};
