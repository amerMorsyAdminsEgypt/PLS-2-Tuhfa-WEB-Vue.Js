import { METHOD, request } from "./../utils/request";
import { SystemComponentsHierarchies } from "./api";

async function getAll(params) {
  return request(SystemComponentsHierarchies.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(SystemComponentsHierarchies.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(SystemComponentsHierarchies.getDialog, METHOD.GET, params);
}

async function add(data) {
  return request(SystemComponentsHierarchies.add, METHOD.POST, data);
}
async function update(data) {
  return request(SystemComponentsHierarchies.update, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(
    SystemComponentsHierarchies.changeActivationType,
    METHOD.POST,
    data
  );
}

async function finalDelete(data) {
  return request(SystemComponentsHierarchies.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(SystemComponentsHierarchies.deleteImage, METHOD.POST, data);
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
