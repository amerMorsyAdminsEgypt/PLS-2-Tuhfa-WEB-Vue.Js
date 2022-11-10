import { METHOD, request } from "./../../../utils/request";
import { GeneralJobs } from "./../../api";

async function getAll(params) {
  return request(GeneralJobs.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(GeneralJobs.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(GeneralJobs.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(GeneralJobs.add, METHOD.POST, data);
}
async function update(data) {
  return request(GeneralJobs.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(GeneralJobs.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(GeneralJobs.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(GeneralJobs.deleteImage, METHOD.POST, data);
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
