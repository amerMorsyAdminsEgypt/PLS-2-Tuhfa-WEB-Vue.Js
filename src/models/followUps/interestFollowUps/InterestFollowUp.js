import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/interestFollowUps.svg";
import EducationalCategoryInterestData from "./../interests/EducationalCategoryInterestData";
import EducationalCategoryOtherInterestData from "./../interests/EducationalCategoryOtherInterestData";

export default class InterestFollowUp extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(object = {}) {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.interestFollowUpToken = "";
    this.mainToken = object.mainToken ?? "";
    this.interestFollowUpTitleCurrent = "";
    this.interestFollowUpTitleEn = "";
    this.interestFollowUpTitleAr = "";
    this.interestFollowUpTitleUnd = "";
    this.interestFollowUpDescriptionCurrent = "";
    this.interestFollowUpDescriptionAr = "";
    this.interestFollowUpDescriptionEn = "";
    this.interestFollowUpDescriptionUnd = "";
    this.replyStatusTypeToken = "";
    this.replyStatusTypeNameCurrent = "";
    this.replyStatusTypeNameAr = "";
    this.replyStatusTypeNameEn = "";
    this.replyStatusTypeNameUnd = "";
    this.followUpTypeToken = object.followUpTypeToken ?? "";
    this.followUpTypeNameCurrent = "";
    this.followUpTypeNameAr = "";
    this.followUpTypeNameEn = "";
    this.followUpTypeNameUnd = "";
    this.interestFollowUpImageIsDefault = "";
    this.interestFollowUpImagePath = "";
    this.interestFollowUpImageSizeBytes = "";
    this.interestFollowUpImageSizeTextCurrent = "";
    this.interestFollowUpImageSizeTextAr = "";
    this.interestFollowUpImageSizeTextEn = "";
    this.interestFollowUpImageSizeTextUnd = "";
    this.interestFollowUpNotes = "";
    this.educationalCategoryInterestToken = "";
    this.educationalCategoryOtherInterestToken = "";
    this.educationalCategoryInterestData =
      new EducationalCategoryInterestData();
    this.educationalCategoryOtherInterestData =
      new EducationalCategoryOtherInterestData();
  }

  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.interestFollowUpToken = data.interestFollowUpToken ?? "";
      this.mainToken = data.mainToken ?? "";
      this.interestFollowUpTitleCurrent =
        data.interestFollowUpTitleCurrent ?? "";
      this.interestFollowUpTitleEn = data.interestFollowUpTitleEn ?? "";
      this.interestFollowUpTitleAr = data.interestFollowUpTitleAr ?? "";
      this.interestFollowUpTitleUnd = data.interestFollowUpTitleUnd ?? "";
      this.interestFollowUpDescriptionCurrent =
        data.interestFollowUpDescriptionCurrent ?? "";
      this.interestFollowUpDescriptionAr =
        data.interestFollowUpDescriptionAr ?? "";
      this.interestFollowUpDescriptionEn =
        data.interestFollowUpDescriptionEn ?? "";
      this.interestFollowUpDescriptionUnd =
        data.interestFollowUpDescriptionUnd ?? "";
      this.replyStatusTypeToken = data.replyStatusTypeToken ?? "";
      this.replyStatusTypeNameCurrent = data.replyStatusTypeNameCurrent ?? "";
      this.replyStatusTypeNameAr = data.replyStatusTypeNameAr ?? "";
      this.replyStatusTypeNameEn = data.replyStatusTypeNameEn ?? "";
      this.replyStatusTypeNameUnd = data.replyStatusTypeNameUnd ?? "";
      this.followUpTypeToken = data.followUpTypeToken ?? "";
      this.followUpTypeNameCurrent = data.followUpTypeNameCurrent ?? "";
      this.followUpTypeNameAr = data.followUpTypeNameAr ?? "";
      this.followUpTypeNameEn = data.followUpTypeNameEn ?? "";
      this.followUpTypeNameUnd = data.followUpTypeNameUnd ?? "";
      this.interestFollowUpImageIsDefault =
        data.interestFollowUpImageIsDefault ?? "";
      this.interestFollowUpImagePath = data.interestFollowUpImagePath ?? "";
      this.interestFollowUpImageSizeBytes =
        data.interestFollowUpImageSizeBytes ?? "";
      this.interestFollowUpImageSizeTextCurrent =
        data.interestFollowUpImageSizeTextCurrent ?? "";
      this.interestFollowUpImageSizeTextAr =
        data.interestFollowUpImageSizeTextAr ?? "";
      this.interestFollowUpImageSizeTextEn =
        data.interestFollowUpImageSizeTextEn ?? "";
      this.interestFollowUpImageSizeTextUnd =
        data.interestFollowUpImageSizeTextUnd ?? "";
      this.interestFollowUpNotes = data.interestFollowUpNotes ?? "";
      this.educationalCategoryInterestToken =
        data.educationalCategoryInterestToken ?? "";
      this.educationalCategoryOtherInterestToken =
        data.educationalCategoryOtherInterestToken ?? "";
      this.educationalCategoryInterestData.fillData(
        data.educationalCategoryInterestData
      );
      this.educationalCategoryOtherInterestData.fillData(
        data.educationalCategoryOtherInterestData
      );
    } else {
      this.setInitialValue();
    }
  }
}
