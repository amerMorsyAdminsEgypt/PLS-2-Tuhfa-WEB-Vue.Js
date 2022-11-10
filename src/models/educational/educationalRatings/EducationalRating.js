import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/educationalRatings.svg";
import EducationalCategory from "./../educationalCategories/EducationalCategory";
import EducationalGroup from "./../educationalGroups/EducationalGroup";
import EducationalScheduleTime from "./../educationalScheduleTimes/EducationalScheduleTime";

export default class EducationalRating extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalRatingToken = "";
    this.educationalRatingTitleCurrent = "";
    this.educationalRatingTitleAr = "";
    this.educationalRatingTitleEn = "";
    this.educationalRatingTitleUnd = "";
    this.educationalRatingTypeToken = "";
    this.educationalRatingTypeNameCurrent = "";
    this.educationalRatingTypeNameAr = "";
    this.educationalRatingTypeNameEn = "";
    this.educationalRatingTypeNameUnd = "";
    this.educationalRatingNumber = 0;
    this.educationalRatingDescriptionCurrent = "";
    this.educationalRatingDescriptionAr = "";
    this.educationalRatingDescriptionEn = "";
    this.educationalRatingDescriptionUnd = "";
    this.educationalRatingNotes = "";
    this.educationalRatingImageIsDefault = "";
    this.educationalRatingImagePath = "";
    this.educationalRatingImageSizeBytes = "";
    this.educationalRatingImageSizeTextCurrent = "";
    this.educationalCategoryToken = "";
    this.educationalGroupToken = "";
    this.educationalScheduleTimeToken = "";
    this.educationalCategoryData = new EducationalCategory();
    this.educationalGroupData = new EducationalGroup();
    this.educationalScheduleTimeData = new EducationalScheduleTime();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalRatingToken = data.educationalRatingToken ?? "";
      this.educationalRatingTitleCurrent =
        data.educationalRatingTitleCurrent ?? "";
      this.educationalRatingTitleAr = data.educationalRatingTitleAr ?? "";
      this.educationalRatingTitleEn = data.educationalRatingTitleEn ?? "";
      this.educationalRatingTitleUnd = data.educationalRatingTitleUnd ?? "";
      this.educationalRatingTypeToken = data.educationalRatingTypeToken ?? "";
      this.educationalRatingTypeNameCurrent =
        data.educationalRatingTypeNameCurrent ?? "";
      this.educationalRatingTypeNameAr = data.educationalRatingTypeNameAr ?? "";
      this.educationalRatingTypeNameEn = data.educationalRatingTypeNameEn ?? "";
      this.educationalRatingTypeNameUnd =
        data.educationalRatingTypeNameUnd ?? "";
      this.educationalRatingNumber = data.educationalRatingNumber ?? 0;
      this.educationalRatingDescriptionCurrent =
        data.educationalRatingDescriptionCurrent ?? "";
      this.educationalRatingDescriptionAr =
        data.educationalRatingDescriptionAr ?? "";
      this.educationalRatingDescriptionEn =
        data.educationalRatingDescriptionEn ?? "";
      this.educationalRatingDescriptionUnd =
        data.educationalRatingDescriptionUnd ?? "";
      this.educationalRatingNotes = data.educationalRatingNotes ?? "";
      this.educationalRatingImageIsDefault =
        data.educationalRatingImageIsDefault ?? "";
      this.educationalRatingImagePath = data.educationalRatingImagePath ?? "";
      this.educationalRatingImageSizeBytes =
        data.educationalRatingImageSizeBytes ?? "";
      this.educationalRatingImageSizeTextCurrent =
        data.educationalRatingImageSizeTextCurrent ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.educationalGroupToken = data.educationalGroupToken ?? "";
      this.educationalScheduleTimeToken =
        data.educationalScheduleTimeToken ?? "";
      this.educationalCategoryData.fillData(data.educationalCategoryData);
      this.educationalGroupData.fillData(data.educationalGroupData);
      this.educationalScheduleTimeData.fillData(
        data.educationalScheduleTimeData
      );
    } else {
      this.setInitialValue();
    }
  }
}
