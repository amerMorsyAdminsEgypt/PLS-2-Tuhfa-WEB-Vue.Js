import { METHOD, request } from "./../../utils/request";
import { JoiningApplicationSubscriptions } from "./../api";

async function getAll(params) {
  return request(JoiningApplicationSubscriptions.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(
    JoiningApplicationSubscriptions.getDetails,
    METHOD.GET,
    params
  );
}
async function getDialog(params) {
  return request(JoiningApplicationSubscriptions.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(JoiningApplicationSubscriptions.add, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
};
