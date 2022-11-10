import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/discussionComments.svg";

// import EducationalCategoryInfoData from "./../../countedServices/EducationalCategoryInfoData";

export default class DiscussionComment extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.reactTypeToken = ""; //added by me
    this.discussionCommentToken = "";
    this.discussionCommentDescriptionCurrent = "";
    this.discussionCommentDescriptionAr = "";
    this.discussionCommentDescriptionEn = "";
    this.discussionCommentDescriptionUnd = "";
    this.discussionCommentMediaPath = "";
    this.discussionCommentMediaIsDefault = false;
    this.discussionCommentMediaSizeBytes = 0;
    this.discussionCommentMediaSizeTextCurrent = "";
    this.discussionCommentMediaSizeTextAr = "";
    this.discussionCommentMediaSizeTextEn = "";
    this.discussionCommentMediaSizeTextUnd = "";
    this.discussionCommentMediaTypeToken = "";
    this.discussionCommentMediaTypeNameCurrent = "";
    this.discussionCommentMediaTypeNameAr = "";
    this.discussionCommentMediaTypeNameEn = "";
    this.discussionCommentMediaTypeNameUnd = "";
    this.discussionCommentNotes = "";
    this.totalCommentReactsCount = 0;
    this.totalLikesCount = 0;
    this.totalDisLikesCount = 0;
    this.totalRepliesCount = 0;
    this.parentDiscussionCommentToken = "";
    this.discussionToken = "";
    this.discussionInfoData = null;
    this.parentDiscussionCommentInfoData = null;
    this.discussionCommentMentionUsersData = [];
    this.userTokens = []; //added by me
    this.lecturerTokens = []; //added by me
    this.studentTokens = []; //added by me
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.reactTypeToken = data.reactTypeToken ?? "";
      this.discussionCommentToken = data.discussionCommentToken ?? "";
      this.discussionCommentDescriptionCurrent =
        data.discussionCommentDescriptionCurrent ?? "";
      this.discussionCommentDescriptionAr =
        data.discussionCommentDescriptionAr ?? "";
      this.discussionCommentDescriptionEn =
        data.discussionCommentDescriptionEn ?? "";
      this.discussionCommentDescriptionUnd =
        data.discussionCommentDescriptionUnd ?? "";
      this.discussionCommentMediaPath = data.discussionCommentMediaPath ?? "";
      this.discussionCommentMediaIsDefault =
        data.discussionCommentMediaIsDefault ?? false;
      this.discussionCommentMediaSizeBytes =
        data.discussionCommentMediaSizeBytes ?? 0;
      this.discussionCommentMediaSizeTextCurrent =
        data.discussionCommentMediaSizeTextCurrent ?? "";
      this.discussionCommentMediaSizeTextAr =
        data.discussionCommentMediaSizeTextAr ?? "";
      this.discussionCommentMediaSizeTextEn =
        data.discussionCommentMediaSizeTextEn ?? "";
      this.discussionCommentMediaSizeTextUnd =
        data.discussionCommentMediaSizeTextUnd ?? "";
      this.discussionCommentMediaTypeToken =
        data.discussionCommentMediaTypeToken ?? "";
      this.discussionCommentMediaTypeNameCurrent =
        data.discussionCommentMediaTypeNameCurrent ?? "";
      this.discussionCommentMediaTypeNameAr =
        data.discussionCommentMediaTypeNameAr ?? "";
      this.discussionCommentMediaTypeNameEn =
        data.discussionCommentMediaTypeNameEn ?? "";
      this.discussionCommentMediaTypeNameUnd =
        data.discussionCommentMediaTypeNameUnd ?? "";
      this.discussionCommentNotes = data.discussionCommentNotes ?? "";
      this.totalCommentReactsCount = data.totalCommentReactsCount ?? 0;
      this.totalLikesCount = data.totalLikesCount ?? 0;
      this.totalDisLikesCount = data.totalDisLikesCount ?? 0;
      this.totalRepliesCount = data.totalRepliesCount ?? 0;
      this.parentDiscussionCommentToken =
        data.parentDiscussionCommentToken ?? "";
      this.discussionToken = data.discussionToken ?? "";
      this.discussionInfoData = data.discussionInfoData ?? null;
      this.parentDiscussionCommentInfoData =
        data.parentDiscussionCommentInfoData ?? null;
      this.discussionCommentMentionUsersData =
        data.discussionCommentMentionUsersData ?? [];
      if (data.discussionCommentMentionUsersData) {
        this.userTokens = data.discussionCommentMentionUsersData.map(
          (item) => item.userToken
        );
      } else {
        this.userTokens = [];
      }
      this.lecturerTokens = data.lecturerTokens ?? [];
      this.studentTokens = data.studentTokens ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
