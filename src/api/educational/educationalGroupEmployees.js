import { METHOD, request } from "./../../utils/request";
import { EducationalGroupEmployees } from "./../api";

async function getAll(params) {
  return request(EducationalGroupEmployees.getAll, METHOD.GET, params);
}

export default {
  getAll,
};
