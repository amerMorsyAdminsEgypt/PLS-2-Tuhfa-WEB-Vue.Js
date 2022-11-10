import { METHOD, request } from "./../../utils/request";
import { EducationalGroupStudents } from "./../api";

async function getAll(params) {
  return request(EducationalGroupStudents.getAll, METHOD.GET, params);
}

async function addStudents(data) {
  return request(EducationalGroupStudents.addStudents, METHOD.POST, data);
}
async function changeCertificateStatus(data) {
  return request(
    EducationalGroupStudents.changeCertificateStatus,
    METHOD.POST,
    data
  );
}

export default {
  getAll,
  addStudents,
  changeCertificateStatus,
};
