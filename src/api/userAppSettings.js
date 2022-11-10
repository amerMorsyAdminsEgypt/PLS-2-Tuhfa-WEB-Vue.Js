import { METHOD, request } from "./../utils/request";
import { UserAppSettings } from "./api";

async function get(params) {
  return request(UserAppSettings.get, METHOD.GET, params);
}
async function update(data) {
  return request(UserAppSettings.update, METHOD.POST, data);
}

export default { get, update };
