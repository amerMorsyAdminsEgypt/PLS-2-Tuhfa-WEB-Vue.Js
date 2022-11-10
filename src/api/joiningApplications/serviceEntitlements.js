import { METHOD, request } from "./../../utils/request";
import { ServiceEntitlements } from "./../api";

async function getAll(params) {
  return request(ServiceEntitlements.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(ServiceEntitlements.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(ServiceEntitlements.getDialog, METHOD.GET, params);
}

async function addServiceEntitlementAsDebt(data) {
  return request(
    ServiceEntitlements.addServiceEntitlementAsDebt,
    METHOD.POST,
    data
  );
}
async function refund(data) {
  return request(ServiceEntitlements.refund, METHOD.POST, data);
}
async function accrual(data) {
  return request(ServiceEntitlements.accrual, METHOD.POST, data);
}

async function deleteImage(data) {
  return request(ServiceEntitlements.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  addServiceEntitlementAsDebt,
  accrual,
  refund,
  deleteImage,
};
