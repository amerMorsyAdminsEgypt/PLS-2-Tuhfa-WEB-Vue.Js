import { METHOD, request } from "./../../utils/request";
import { EducationalGroupAttendances } from "./../api";

async function getAll(params) {
  return request(EducationalGroupAttendances.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EducationalGroupAttendances.getDetails, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalGroupAttendances.add, METHOD.POST, data);
}
async function addBySession(data) {
  return request(EducationalGroupAttendances.addBySession, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalGroupAttendances.update, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(EducationalGroupAttendances.finalDelete, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  add,
  addBySession,
  update,
  finalDelete,
};
