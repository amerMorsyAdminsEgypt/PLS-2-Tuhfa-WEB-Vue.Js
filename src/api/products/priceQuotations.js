import { METHOD, request } from "./../../utils/request";
import { PriceQuotations } from "./../api";

async function getAll(params) {
  return request(PriceQuotations.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PriceQuotations.getDetails, METHOD.GET, params);
}
async function getReport(params) {
  return request(PriceQuotations.getReport, METHOD.GET, params);
}
async function getReportExport(params) {
  return request(PriceQuotations.getReportExport, METHOD.GET, params);
}

async function add(data) {
  return request(PriceQuotations.add, METHOD.POST, data);
}
async function sendToClient(data) {
  return request(PriceQuotations.sendToClient, METHOD.POST, data);
}
async function resend(data) {
  return request(PriceQuotations.resend, METHOD.POST, data);
}

async function moveToReject(data) {
  return request(PriceQuotations.moveToReject, METHOD.POST, data);
}
async function moveToApproved(data) {
  return request(PriceQuotations.moveToApproved, METHOD.POST, data);
}
async function moveToCancel(data) {
  return request(PriceQuotations.moveToCancel, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getReport,
  getReportExport,
  add,
  sendToClient,
  resend,
  moveToReject,
  moveToApproved,
  moveToCancel,
};
