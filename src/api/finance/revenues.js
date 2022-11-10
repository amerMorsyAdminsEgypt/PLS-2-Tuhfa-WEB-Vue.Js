import { METHOD, request } from "./../../utils/request";
import { Revenues } from "./../api";

async function getAll(params) {
  return request(Revenues.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Revenues.getDetails, METHOD.GET, params);
}

async function accrual(data) {
  return request(Revenues.accrual, METHOD.POST, data);
}
async function refund(data) {
  return request(Revenues.refund, METHOD.POST, data);
}

async function deleteImage(data) {
  return request(Revenues.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  accrual,
  refund,
  deleteImage,
};
