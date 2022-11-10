import { METHOD, request } from "./../utils/request";
import { MediaPackages } from "./api";

async function getAll(params) {
  return request(MediaPackages.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(MediaPackages.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(MediaPackages.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(MediaPackages.add, METHOD.POST, data);
}
async function update(data) {
  return request(MediaPackages.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(MediaPackages.changeActivationType, METHOD.POST, data);
}
async function changeActivationTypeMediaInPackage(data) {
  return request(
    MediaPackages.changeActivationTypeMediaInPackage,
    METHOD.POST,
    data
  );
}

async function finalDelete(data) {
  return request(MediaPackages.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(MediaPackages.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  add,
  update,
  changeActivationTypeMediaInPackage,
  changeActivationType,
  finalDelete,
  deleteImage,
};
