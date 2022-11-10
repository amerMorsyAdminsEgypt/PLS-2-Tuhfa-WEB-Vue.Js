import { METHOD, request } from "./../utils/request";
import { PlaceUsers } from "./api";

async function getAll(params) {
  return request(PlaceUsers.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(PlaceUsers.getDetails, METHOD.GET, params);
}

async function addPlaceUsers(data) {
  return request(PlaceUsers.addPlaceUsers, METHOD.POST, data);
}
async function addUserPlaces(data) {
  return request(PlaceUsers.addUserPlaces, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(PlaceUsers.finalDelete, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  addPlaceUsers,
  addUserPlaces,
  finalDelete,
};
