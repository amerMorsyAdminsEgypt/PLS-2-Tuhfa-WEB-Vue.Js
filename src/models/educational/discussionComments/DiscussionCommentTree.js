import defaultImg from "@/assets/images/discussionComments.svg";
import imgEdit from "@/assets/images/pencil.svg";
import imgDelete from "@/assets/images/trash.svg";
import imgChangeActivationType from "@/assets/images/changeActivationType.svg";
import likeImage from "@/assets/images/like.svg";
import dislikeImage from "@/assets/images/dislike.svg";
import replyImage from "@/assets/images/reply.svg";
import {
  CUSTOM_TREE_ACTION_TYPE,
  REACT_TYPE,
} from "./../../../utils/constantLists";
import {
  fullPathFileFromServer,
  formateDateTimeLang,
  checkPrivilege,
} from "./../../../utils/functions";
import {
  hasDiscussionCommentAdd,
  hasDiscussionCommentEdit,
  hasDiscussionCommentFinaleDelete,
  hasDiscussionCommentChangeActivationType,
  hasDiscussionCommentReactAdd,
} from "./../../../utils/privilegeHelper";
import i18n from "./../../../i18n";

export default class DiscussionCommentTree {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.name = "";
    this.dateTime = "";
    this.description = "";
    this.mentionedUsers = [];
    this.reacts = [];
    this.actions = [];
    this.children = [];
  }

  fillData(data) {
    if (data) {
      this.image = defaultImg;
      this.image =
        fullPathFileFromServer(
          data.userCreatedData.userImagePath,
          defaultImg
        ) || defaultImg;

      this.name = data.userCreatedData.userNameCurrent || "";

      this.dateTime =
        formateDateTimeLang(data.creationDate, data.creationTime) || "";

      this.description = data.discussionCommentDescriptionCurrent || "";

      this.mentionedUsers = [];
      if (data.discussionCommentMentionUsersData) {
        this.mentionedUsers = data.discussionCommentMentionUsersData.map(
          (item) => item.userInfoData.userNameCurrent
        );
      }

      this.reacts = [];
      if (checkPrivilege(hasDiscussionCommentReactAdd()))
        this.reacts.push({
          type: CUSTOM_TREE_ACTION_TYPE.other,
          title: i18n.t("general.like"),
          icon: likeImage,
          count: data.totalLikesCount,
          actionName: "",
          data: {
            discussionCommentToken: data.discussionCommentToken,
            reactTypeToken: REACT_TYPE.Like,
          },
        });

      if (checkPrivilege(hasDiscussionCommentReactAdd()))
        this.reacts.push({
          type: CUSTOM_TREE_ACTION_TYPE.other,
          title: i18n.t("general.disLike"),
          icon: dislikeImage,
          count: data.totalDisLikesCount,
          actionName: "",
          data: {
            discussionCommentToken: data.discussionCommentToken,
            reactTypeToken: REACT_TYPE.DisLike,
          },
        });

      if (checkPrivilege(hasDiscussionCommentAdd()))
        this.reacts.push({
          type: CUSTOM_TREE_ACTION_TYPE.bottomSheet,
          title: i18n.t("general.reply"),
          icon: replyImage,
          count: data.totalRepliesCount,
          actionName: "DiscussionCommentAdd",
          data: { parentDiscussionCommentToken: data.discussionCommentToken },
        });

      this.actions = [];
      if (checkPrivilege(hasDiscussionCommentEdit()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.bottomSheet,
          title: i18n.t("edit"),
          icon: imgEdit,
          actionName: "DiscussionCommentUpdate",
          data: { ...data },
        });

      if (checkPrivilege(hasDiscussionCommentFinaleDelete()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.modal,
          title: i18n.t("delete"),
          icon: imgDelete,
          actionName: "DiscussionCommentDelete",
          data: { discussionCommentToken: data.discussionCommentToken },
        });

      if (checkPrivilege(hasDiscussionCommentChangeActivationType()))
        this.actions.push({
          type: CUSTOM_TREE_ACTION_TYPE.modal,
          title: i18n.t("changeActivationType"),
          icon: imgChangeActivationType,
          actionName: "DiscussionCommentChangeActivationType",
          data: { discussionCommentToken: data.discussionCommentToken },
        });

      this.children = [];

      // this.children = data.childrenData
      // ? data.childrenData.map((item) => new DiscussionCommentTree(item))
      // : [];
    } else {
      this.setInitialValue();
    }
  }
}
