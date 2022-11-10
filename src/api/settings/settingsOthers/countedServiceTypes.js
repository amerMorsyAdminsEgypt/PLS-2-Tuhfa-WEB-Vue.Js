import { METHOD, request } from "./../../../utils/request";
import { CountedServiceTypes } from "./../../api";

async function getAll(params) {
  return request(CountedServiceTypes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(CountedServiceTypes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(CountedServiceTypes.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(CountedServiceTypes.add, METHOD.POST, data);
}
async function update(data) {
  return request(CountedServiceTypes.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(CountedServiceTypes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(CountedServiceTypes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(CountedServiceTypes.deleteImage, METHOD.POST, data);
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
