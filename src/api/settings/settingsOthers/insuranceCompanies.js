import { METHOD, request } from "./../../../utils/request";
import { InsuranceCompanies } from "./../../api";

async function getAll(params) {
  return request(InsuranceCompanies.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(InsuranceCompanies.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(InsuranceCompanies.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(InsuranceCompanies.add, METHOD.POST, data);
}
async function update(data) {
  return request(InsuranceCompanies.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(InsuranceCompanies.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(InsuranceCompanies.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(InsuranceCompanies.deleteImage, METHOD.POST, data);
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
