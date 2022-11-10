import { METHOD, request } from "./../../utils/request";
import { CountedServiceTransactions } from "./../api";

async function getAll(params) {
  return request(CountedServiceTransactions.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(CountedServiceTransactions.getDetails, METHOD.GET, params);
}

async function buy(data) {
  return request(CountedServiceTransactions.buy, METHOD.POST, data);
}
async function sell(data) {
  return request(CountedServiceTransactions.sell, METHOD.POST, data);
}
async function refund(data) {
  return request(CountedServiceTransactions.refund, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(CountedServiceTransactions.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  buy,
  sell,
  refund,
  deleteImage,
};
