import { METHOD, request } from "./../../utils/request";
import { EducationalGroupPlaces } from "./../api";

async function getAll(params) {
  return request(EducationalGroupPlaces.getAll, METHOD.GET, params);
}

export default {
  getAll,
};
