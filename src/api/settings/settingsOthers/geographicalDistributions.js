import { METHOD, request } from "./../../../utils/request";
import { GeographicalDistributions } from "./../../api";

async function getAll(params) {
  return request(GeographicalDistributions.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(GeographicalDistributions.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(GeographicalDistributions.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(GeographicalDistributions.add, METHOD.POST, data);
}
async function update(data) {
  return request(GeographicalDistributions.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(
    GeographicalDistributions.changeActivationType,
    METHOD.POST,
    data
  );
}

async function finalDelete(data) {
  return request(GeographicalDistributions.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(GeographicalDistributions.deleteImage, METHOD.POST, data);
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
