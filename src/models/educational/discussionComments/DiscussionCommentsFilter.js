import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class DiscussionCommentsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();

    this.activationTypeTokens =
      store.getters.generalSetting.discussionComments.activationTypeTokens ??
      [];
    this.parentDiscussionCommentInfoDataInclude = false;
    this.discussionInfoDataInclude = false;
    this.discussionCommentMentionUserDataInclude = false;
    this.discussionCommentMentionUserDataInclude = false;
    this.getOnlyDiscussionCommentsParents = false;
    this.parentDiscussionCommentToken = "";
    this.discussionToken = "";
    this.discussionCommentToken = "";
    this.educationalGroupToken = ""; //added by me
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.activationTypeTokens = data.activationTypeTokens ?? [];
      this.parentDiscussionCommentInfoDataInclude =
        data.parentDiscussionCommentInfoDataInclude ?? false;
      this.discussionInfoDataInclude = data.discussionInfoDataInclude ?? false;
      this.discussionCommentMentionUserDataInclude =
        data.discussionCommentMentionUserDataInclude ?? false;
      this.discussionCommentMentionUserDataInclude =
        data.discussionCommentMentionUserDataInclude ?? false;
      this.getOnlyDiscussionCommentsParents =
        data.getOnlyDiscussionCommentsParents ?? false;
      this.parentDiscussionCommentToken =
        data.parentDiscussionCommentToken ?? "";
      this.discussionToken = data.discussionToken ?? "";
      this.discussionCommentToken = data.discussionCommentToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
