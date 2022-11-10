import { METHOD, request } from "./../../utils/request";
import { Notifications } from "./../api";

async function getAll(params) {
  return request(Notifications.getAll, METHOD.GET, params);
}
async function getCountNotRead(params) {
  return request(Notifications.getCountNotRead, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Notifications.getDialog, METHOD.GET, params);
}

async function read(data) {
  return request(Notifications.read, METHOD.POST, data);
}
async function readAll(data) {
  return request(Notifications.readAll, METHOD.POST, data);
}
async function openAll(data) {
  return request(Notifications.openAll, METHOD.POST, data);
}

export default {
  getAll,
  getCountNotRead,
  getDialog,
  read,
  readAll,
  openAll,
};
