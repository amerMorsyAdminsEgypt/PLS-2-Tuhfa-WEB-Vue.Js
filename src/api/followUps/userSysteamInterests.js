import { METHOD, request } from "./../../utils/request";
import { UserSysteamInterests } from "./../api";

async function getAll(params) {
  return request(UserSysteamInterests.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserSysteamInterests.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserSysteamInterests.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserSysteamInterests.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserSysteamInterests.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserSysteamInterests.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserSysteamInterests.finalDelete, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationType,
  finalDelete,
};
