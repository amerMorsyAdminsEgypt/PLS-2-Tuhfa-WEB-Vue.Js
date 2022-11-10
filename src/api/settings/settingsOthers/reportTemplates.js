import { METHOD, request } from "./../../../utils/request";
import { ReportTemplates } from "./../../api";

async function getDialog(params) {
  return request(ReportTemplates.getDialog, METHOD.GET, params);
}

export default { getDialog };
