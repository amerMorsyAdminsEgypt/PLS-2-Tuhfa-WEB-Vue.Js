import { METHOD, request } from "./../../utils/request";
import { QuotationPriceHistories } from "./../api";

async function getAll(params) {
  return request(QuotationPriceHistories.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(QuotationPriceHistories.getDetails, METHOD.GET, params);
}

async function add(data) {
  return request(QuotationPriceHistories.add, METHOD.POST, data);
}
async function update(data) {
  return request(QuotationPriceHistories.update, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(QuotationPriceHistories.finalDelete, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  add,
  update,
  finalDelete,
};
