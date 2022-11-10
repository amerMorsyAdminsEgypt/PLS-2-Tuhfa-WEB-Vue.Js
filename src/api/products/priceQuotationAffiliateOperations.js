import { METHOD, request } from "./../../utils/request";
import { PriceQuotationAffiliateOperations } from "./../api";

async function getAll(params) {
  return request(PriceQuotationAffiliateOperations.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(
    PriceQuotationAffiliateOperations.getDetails,
    METHOD.GET,
    params
  );
}

async function add(data) {
  return request(PriceQuotationAffiliateOperations.add, METHOD.POST, data);
}
async function update(data) {
  return request(PriceQuotationAffiliateOperations.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(
    PriceQuotationAffiliateOperations.changeActivationType,
    METHOD.POST,
    data
  );
}
async function finalDelete(data) {
  return request(
    PriceQuotationAffiliateOperations.finalDelete,
    METHOD.POST,
    data
  );
}
async function deleteImage(data) {
  return request(
    PriceQuotationAffiliateOperations.deleteImage,
    METHOD.POST,
    data
  );
}
async function sendToClient(data) {
  return request(
    PriceQuotationAffiliateOperations.sendToClient,
    METHOD.POST,
    data
  );
}

export default {
  getAll,
  getDetails,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
  sendToClient,
};
