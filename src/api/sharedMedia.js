import { METHOD, request } from "./../utils/request";
import { SharedMedias } from "./api";

async function getAll(params) {
  return request(SharedMedias.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(SharedMedias.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(SharedMedias.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(SharedMedias.add, METHOD.POST, data);
}
async function update(data) {
  return request(SharedMedias.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(SharedMedias.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(SharedMedias.finalDelete, METHOD.POST, data);
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
