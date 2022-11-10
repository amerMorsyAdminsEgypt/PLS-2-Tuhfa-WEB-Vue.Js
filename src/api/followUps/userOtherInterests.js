import { METHOD, request } from "./../../utils/request";
import { UserOtherInterests } from "./../api";

async function getAll(params) {
  return request(UserOtherInterests.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserOtherInterests.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserOtherInterests.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(UserOtherInterests.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserOtherInterests.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserOtherInterests.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserOtherInterests.finalDelete, METHOD.POST, data);
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
