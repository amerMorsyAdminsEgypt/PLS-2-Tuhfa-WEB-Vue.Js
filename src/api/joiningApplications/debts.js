import { METHOD, request } from "./../../utils/request";
import { Debts } from "./../api";

async function getAll(params) {
  return request(Debts.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(Debts.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Debts.getDialog, METHOD.GET, params);
}

export default {
  getAll,
  getDetails,
  getDialog,
};
