import { METHOD, request } from "./../../utils/request";
import { PriceQuotationJobOrders, JobOrderHistoryWorks } from "./../api";

async function getAll(params) {
  return request(PriceQuotationJobOrders.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PriceQuotationJobOrders.getDetails, METHOD.GET, params);
}
async function getReport(params) {
  return request(PriceQuotationJobOrders.getReport, METHOD.GET, params);
}

async function add(data) {
  return request(PriceQuotationJobOrders.add, METHOD.POST, data);
}
async function update(data) {
  return request(PriceQuotationJobOrders.update, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(PriceQuotationJobOrders.deleteImage, METHOD.POST, data);
}

async function moveToNewlyWanted(data) {
  return request(JobOrderHistoryWorks.moveToNewlyWanted, METHOD.POST, data);
}
async function moveToWorkProgres(data) {
  return request(JobOrderHistoryWorks.moveToWorkProgres, METHOD.POST, data);
}
async function moveToFinishNotCustomerReceived(data) {
  return request(
    JobOrderHistoryWorks.moveToFinishNotCustomerReceived,
    METHOD.POST,
    data
  );
}
async function moveToFinishCustomerReceived(data) {
  return request(
    JobOrderHistoryWorks.moveToFinishCustomerReceived,
    METHOD.POST,
    data
  );
}
async function moveToCanceled(data) {
  return request(JobOrderHistoryWorks.moveToCanceled, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getReport,
  add,
  update,
  deleteImage,

  moveToNewlyWanted,
  moveToWorkProgres,
  moveToFinishNotCustomerReceived,
  moveToFinishCustomerReceived,
  moveToCanceled,
};
