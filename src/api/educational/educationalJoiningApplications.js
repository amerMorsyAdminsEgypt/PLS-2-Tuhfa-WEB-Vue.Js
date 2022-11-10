import { METHOD, request } from "./../../utils/request";
import { EducationalJoiningApplications } from "./../api";

async function getAll(params) {
  return request(EducationalJoiningApplications.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EducationalJoiningApplications.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalJoiningApplications.getDialog, METHOD.GET, params);
}
async function getStatement(params) {
  return request(
    EducationalJoiningApplications.getStatement,
    METHOD.GET,
    params
  );
}

async function add(data) {
  return request(EducationalJoiningApplications.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalJoiningApplications.update, METHOD.POST, data);
}

async function changeApprove(data) {
  return request(
    EducationalJoiningApplications.changeApprove,
    METHOD.POST,
    data
  );
}

async function finalDelete(data) {
  return request(EducationalJoiningApplications.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EducationalJoiningApplications.deleteImage, METHOD.POST, data);
}

async function getReport(data) {
  return request(EducationalJoiningApplications.getReport, METHOD.GET, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getStatement,
  add,
  update,
  changeApprove,
  finalDelete,
  deleteImage,
  getReport,
};
