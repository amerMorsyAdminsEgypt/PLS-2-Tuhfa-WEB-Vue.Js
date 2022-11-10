import { METHOD, request } from "./../utils/request";
import { SharedMediaWithSpaceStorageMedias } from "./api";

async function getAll(params) {
  return request(SharedMediaWithSpaceStorageMedias.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(
    SharedMediaWithSpaceStorageMedias.getDetails,
    METHOD.GET,
    params
  );
}

async function add(data) {
  return request(SharedMediaWithSpaceStorageMedias.add, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(
    SharedMediaWithSpaceStorageMedias.finalDelete,
    METHOD.POST,
    data
  );
}

export default {
  getAll,
  getDetails,
  add,
  finalDelete,
};
