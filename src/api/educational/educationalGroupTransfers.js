import { METHOD, request } from "./../../utils/request";
import { EducationalGroupTransfers } from "./../api";

async function getAll(params) {
  return request(EducationalGroupTransfers.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalGroupTransfers.add, METHOD.POST, data);
}

export default {
  getAll,
  add,
};
