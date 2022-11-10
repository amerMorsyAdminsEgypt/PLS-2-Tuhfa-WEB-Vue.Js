import { METHOD, request } from "./../../utils/request";
import { DiscussionCommentReacts } from "./../api";

async function add(data) {
  return request(DiscussionCommentReacts.add, METHOD.POST, data);
}

export default {
  add,
};
