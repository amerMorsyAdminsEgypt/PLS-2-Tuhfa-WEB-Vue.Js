import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/interests.svg";
import UserInfoData from "./../../general/UserCreatedData";
import EducationalCategoryInterestData from "./EducationalCategoryInterestData";
import EducationalCategoryOtherInterestData from "./EducationalCategoryOtherInterestData";

export default class Interest extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.interestToken = "";
    this.interestTitleCurrent = "";
    this.interestTitleEn = "";
    this.interestTitleAr = "";
    this.interestTitleUnd = "";
    this.interestDescriptionCurrent = "";
    this.interestDescriptionAr = "";
    this.interestDescriptionEn = "";
    this.interestDescriptionUnd = "";
    this.interestTypeToken = "";
    this.interestTypeNameCurrent = "";
    this.interestTypeNameAr = "";
    this.interestTypeNameEn = "";
    this.interestTypeNameUnd = "";
    this.interestImageIsDefault = "";
    this.interestImagePath = "";
    this.interestImageSizeBytes = "";
    this.interestImageSizeTextCurrent = "";
    this.interestImageSizeTextAr = "";
    this.interestImageSizeTextEn = "";
    this.interestImageSizeTextUnd = "";
    this.interestNotes = "";
    this.studentUserToken = "";
    this.studentUserInfoData = new UserInfoData();
    this.educationalCategoryInterestData = [];
    this.educationalCategoryOtherInterestData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.interestToken = data.interestToken ?? "";
      this.interestTitleCurrent = data.interestTitleCurrent ?? "";
      this.interestTitleEn = data.interestTitleEn ?? "";
      this.interestTitleAr = data.interestTitleAr ?? "";
      this.interestTitleUnd = data.interestTitleUnd ?? "";
      this.interestDescriptionCurrent = data.interestDescriptionCurrent ?? "";
      this.interestDescriptionAr = data.interestDescriptionAr ?? "";
      this.interestDescriptionEn = data.interestDescriptionEn ?? "";
      this.interestDescriptionUnd = data.interestDescriptionUnd ?? "";
      this.interestTypeToken = data.interestTypeToken ?? "";
      this.interestTypeNameCurrent = data.interestTypeNameCurrent ?? "";
      this.interestTypeNameAr = data.interestTypeNameAr ?? "";
      this.interestTypeNameEn = data.interestTypeNameEn ?? "";
      this.interestTypeNameUnd = data.interestTypeNameUnd ?? "";
      this.interestImageIsDefault = data.interestImageIsDefault ?? "";
      this.interestImagePath = data.interestImagePath ?? "";
      this.interestImageSizeBytes = data.interestImageSizeBytes ?? "";
      this.interestImageSizeTextCurrent =
        data.interestImageSizeTextCurrent ?? "";
      this.interestImageSizeTextAr = data.interestImageSizeTextAr ?? "";
      this.interestImageSizeTextEn = data.interestImageSizeTextEn ?? "";
      this.interestImageSizeTextUnd = data.interestImageSizeTextUnd ?? "";
      this.interestNotes = data.interestNotes ?? "";
      this.studentUserToken = data.studentUserToken ?? "";
      this.studentUserInfoData.fillDataUserCreatedData(
        data.studentUserInfoData
      );
      this.educationalCategoryInterestData =
        data.educationalCategoryInterestData ?? [
          new EducationalCategoryInterestData(),
        ];
      this.educationalCategoryOtherInterestData =
        data.educationalCategoryOtherInterestData ?? [
          new EducationalCategoryOtherInterestData(),
        ];
    } else {
      this.setInitialValue();
    }
  }
}
