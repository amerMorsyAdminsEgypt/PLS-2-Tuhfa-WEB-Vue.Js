import { METHOD, request } from "./../../../utils/request";
import { EmployeePayrollSettings } from "./../../api";

async function getAll(params) {
  return request(EmployeePayrollSettings.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(EmployeePayrollSettings.getDetails, METHOD.GET, params);
}

async function add(data) {
  return request(EmployeePayrollSettings.add, METHOD.POST, data);
}
async function update(data) {
  return request(EmployeePayrollSettings.update, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(EmployeePayrollSettings.finalDelete, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  add,
  update,
  finalDelete,
};
