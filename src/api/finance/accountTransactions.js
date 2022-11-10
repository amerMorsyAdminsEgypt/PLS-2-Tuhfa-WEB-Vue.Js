import { METHOD, request } from "./../../utils/request";
import { AccountTransactions } from "./../api";

async function getAll(params) {
  return request(AccountTransactions.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(AccountTransactions.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(AccountTransactions.getDialog, METHOD.GET, params);
}
async function getBillReport(params) {
  return request(AccountTransactions.getBillReport, METHOD.GET, params);
}

async function add(data) {
  return request(AccountTransactions.add, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getBillReport,
  add,
};
