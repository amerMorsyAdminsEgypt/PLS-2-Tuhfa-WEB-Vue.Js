import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/newsCategories.svg";

export default class NewsCategory extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.newsCategoryToken = "";
    this.newsCategoryNameCurrent = "";
    this.newsCategoryNameAr = "";
    this.newsCategoryNameEn = "";
    this.newsCategoryNameUnd = "";
    this.newsCategoryDescriptionCurrent = "";
    this.newsCategoryDescriptionAr = "";
    this.newsCategoryDescriptionEn = "";
    this.newsCategoryDescriptionUnd = "";
    this.newsCategoryNotes = "";
    this.newsCategoryImageIsDefault = false;
    this.newsCategoryImagePath = "";
    this.newsCategoryImageSizeBytes = 0;
    this.newsCategoryImageSizeTextCurrent = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.newsCategoryToken = data.newsCategoryToken;
    this.newsCategoryNameCurrent = data.newsCategoryNameCurrent;
    this.newsCategoryNameAr = data.newsCategoryNameAr;
    this.newsCategoryNameEn = data.newsCategoryNameEn;
    this.newsCategoryNameUnd = data.newsCategoryNameUnd;
    this.newsCategoryDescriptionCurrent = data.newsCategoryDescriptionCurrent;
    this.newsCategoryDescriptionAr = data.newsCategoryDescriptionAr;
    this.newsCategoryDescriptionEn = data.newsCategoryDescriptionEn;
    this.newsCategoryDescriptionUnd = data.newsCategoryDescriptionUnd;
    this.newsCategoryNotes = data.newsCategoryNotes;
    this.newsCategoryImageIsDefault = data.newsCategoryImageIsDefault;
    this.newsCategoryImagePath = data.newsCategoryImagePath;
    this.newsCategoryImageSizeBytes = data.newsCategoryImageSizeBytes;
    this.newsCategoryImageSizeTextCurrent =
      data.newsCategoryImageSizeTextCurrent;
  }
}
