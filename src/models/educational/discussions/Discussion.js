import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/discussions.svg";
import EducationalCategoryInfoData from "./../../countedServices/EducationalCategoryInfoData";
import EducationalScheduleTimeInfoData from "./../../educational/educationalScheduleTimes/EducationalScheduleTimeInfoData";
import EducationalGroupInfoData from "./../../educational/educationalGroups/EducationalGroupInfoData";

export default class Discussion extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.discussionToken = "";
    this.mainToken = "";
    this.discussionTitleCurrent = "";
    this.discussionTitleEn = "";
    this.discussionTitleAr = "";
    this.discussionTitleUnd = "";
    this.discussionTypeToken = "";
    this.discussionTypeNameCurrent = "";
    this.discussionTypeNameAr = "";
    this.discussionTypeNameEn = "";
    this.discussionTypeNameUnd = "";
    this.discussionClosedStateTypeToken = "";
    this.discussionClosedStateTypeNameCurrent = "";
    this.discussionClosedStateTypeNameAr = "";
    this.discussionClosedStateTypeNameEn = "";
    this.discussionClosedStateTypeNameUnd = "";
    this.discussionDescriptionCurrent = "";
    this.discussionDescriptionAr = "";
    this.discussionDescriptionEn = "";
    this.discussionDescriptionUnd = "";
    this.discussionNotes = "";
    this.discussionTotalCommentsCount = 0;
    this.discussionMediaPath = "";
    this.discussionMediaSizeBytes = 0;
    this.discussionMediaSizeTextCurrent = "";
    this.discussionMediaSizeTextAr = "";
    this.discussionMediaSizeTextEn = "";
    this.discussionMediaSizeTextUnd = "";
    this.discussionMediaTypeToken = "";
    this.discussionMediaTypeNameCurrent = "";
    this.discussionMediaTypeNameAr = "";
    this.discussionMediaTypeNameEn = "";
    this.discussionMediaTypeNameUnd = "";
    this.educationalCategoryToken = "";
    this.educationalScheduleTimeToken = "";
    this.educationalGroupToken = "";
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
    this.educationalScheduleTimeInfoData =
      new EducationalScheduleTimeInfoData();
    this.educationalGroupInfoData = new EducationalGroupInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.discussionToken = data.discussionToken ?? "";
      this.mainToken = data.mainToken ?? "";
      this.discussionTitleCurrent = data.discussionTitleCurrent ?? "";
      this.discussionTitleEn = data.discussionTitleEn ?? "";
      this.discussionTitleAr = data.discussionTitleAr ?? "";
      this.discussionTitleUnd = data.discussionTitleUnd ?? "";
      this.discussionTypeToken = data.discussionTypeToken ?? "";
      this.discussionTypeNameCurrent = data.discussionTypeNameCurrent ?? "";
      this.discussionTypeNameAr = data.discussionTypeNameAr ?? "";
      this.discussionTypeNameEn = data.discussionTypeNameEn ?? "";
      this.discussionTypeNameUnd = data.discussionTypeNameUnd ?? "";
      this.discussionClosedStateTypeToken =
        data.discussionClosedStateTypeToken ?? "";
      this.discussionClosedStateTypeNameCurrent =
        data.discussionClosedStateTypeNameCurrent ?? "";
      this.discussionClosedStateTypeNameAr =
        data.discussionClosedStateTypeNameAr ?? "";
      this.discussionClosedStateTypeNameEn =
        data.discussionClosedStateTypeNameEn ?? "";
      this.discussionClosedStateTypeNameUnd =
        data.discussionClosedStateTypeNameUnd ?? "";
      this.discussionDescriptionCurrent =
        data.discussionDescriptionCurrent ?? "";
      this.discussionDescriptionAr = data.discussionDescriptionAr ?? "";
      this.discussionDescriptionEn = data.discussionDescriptionEn ?? "";
      this.discussionDescriptionUnd = data.discussionDescriptionUnd ?? "";
      this.discussionNotes = data.discussionNotes ?? "";
      this.discussionTotalCommentsCount =
        data.discussionTotalCommentsCount ?? 0;
      this.discussionMediaPath = data.discussionMediaPath ?? "";
      this.discussionMediaSizeBytes = data.discussionMediaSizeBytes ?? 0;
      this.discussionMediaSizeTextCurrent =
        data.discussionMediaSizeTextCurrent ?? "";
      this.discussionMediaSizeTextAr = data.discussionMediaSizeTextAr ?? "";
      this.discussionMediaSizeTextEn = data.discussionMediaSizeTextEn ?? "";
      this.discussionMediaSizeTextUnd = data.discussionMediaSizeTextUnd ?? "";
      this.discussionMediaTypeToken = data.discussionMediaTypeToken ?? "";
      this.discussionMediaTypeNameCurrent =
        data.discussionMediaTypeNameCurrent ?? "";
      this.discussionMediaTypeNameAr = data.discussionMediaTypeNameAr ?? "";
      this.discussionMediaTypeNameEn = data.discussionMediaTypeNameEn ?? "";
      this.discussionMediaTypeNameUnd = data.discussionMediaTypeNameUnd ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
      this.educationalScheduleTimeInfoData.fillData(
        data.educationalScheduleTimeInfoData
      );
      this.educationalGroupInfoData.fillData(data.educationalGroupInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
