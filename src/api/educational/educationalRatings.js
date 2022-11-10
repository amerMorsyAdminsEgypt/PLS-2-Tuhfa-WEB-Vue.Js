import { METHOD, request } from "./../../utils/request";
import { EducationalRatings } from "./../api";

async function getAll(params) {
  return request(EducationalRatings.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EducationalRatings.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalRatings.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalRatings.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalRatings.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(EducationalRatings.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(EducationalRatings.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EducationalRatings.deleteImage, METHOD.POST, data);
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
