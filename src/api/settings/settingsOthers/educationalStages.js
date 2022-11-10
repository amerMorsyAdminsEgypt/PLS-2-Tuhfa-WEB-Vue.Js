import { METHOD, request } from "./../../../utils/request";
import { EducationalStages } from "./../../api";

async function getAll(params) {
  return request(EducationalStages.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EducationalStages.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalStages.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalStages.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalStages.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(EducationalStages.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(EducationalStages.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EducationalStages.deleteImage, METHOD.POST, data);
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
