import { METHOD, request } from "./../../../utils/request";
import { CommunicationTypes } from "./../../api";

async function getAll(params) {
  return request(CommunicationTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(CommunicationTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(CommunicationTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(CommunicationTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(CommunicationTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(CommunicationTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(CommunicationTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(CommunicationTypes.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationType,
  finalDelete,
  deleteImage,
};
