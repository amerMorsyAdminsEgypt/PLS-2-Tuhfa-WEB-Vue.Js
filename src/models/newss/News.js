import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/news.svg";
import NewsCategory from "./../settings/settingsOthers/newsCategories/NewsCategory";

export default class News extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.newsToken = "";
    this.newsTitleCurrent = "";
    this.newsTitleAr = "";
    this.newsTitleEn = "";
    this.newsTitleUnd = "";
    this.newsDescriptionCurrent = "";
    this.newsDescriptionAr = "";
    this.newsDescriptionEn = "";
    this.newsDescriptionUnd = "";
    this.publisherNameCurrent = "";
    this.publisherNameEn = "";
    this.publisherNameAr = "";
    this.publisherNameUnd = "";
    this.newsNotes = "";
    this.newsCountOpen = "";
    this.newsMediaIsDefault = "";
    this.newsMediaPath = "";
    this.newsMediaSizeBytes = "";
    this.newsMediaSizeTextCurrent = "";
    this.newsMediaTypeToken = "";
    this.newsMediaTypeNameCurrent = "";
    this.newsCategoryTokenList = [];
    this.newsCategoryInfoData = new NewsCategory();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.newsToken = data.newsToken ?? "";
      this.newsTitleCurrent = data.newsTitleCurrent ?? "";
      this.newsTitleAr = data.newsTitleAr ?? "";
      this.newsTitleEn = data.newsTitleEn ?? "";
      this.newsTitleUnd = data.newsTitleUnd ?? "";
      this.newsDescriptionCurrent = data.newsDescriptionCurrent ?? "";
      this.newsDescriptionAr = data.newsDescriptionAr ?? "";
      this.newsDescriptionEn = data.newsDescriptionEn ?? "";
      this.newsDescriptionUnd = data.newsDescriptionUnd ?? "";
      this.publisherNameCurrent = data.publisherNameCurrent ?? "";
      this.publisherNameEn = data.publisherNameEn ?? "";
      this.publisherNameAr = data.publisherNameAr ?? "";
      this.publisherNameUnd = data.publisherNameUnd ?? "";
      this.newsNotes = data.newsNotes ?? "";
      this.newsCountOpen = data.newsCountOpen ?? "";
      this.newsMediaIsDefault = data.newsMediaIsDefault ?? "";
      this.newsMediaPath = data.newsMediaPath ?? "";
      this.newsMediaSizeBytes = data.newsMediaSizeBytes ?? "";
      this.newsMediaSizeTextCurrent = data.newsMediaSizeTextCurrent ?? "";
      this.newsMediaTypeToken = data.newsMediaTypeToken ?? "";
      this.newsMediaTypeNameCurrent = data.newsMediaTypeNameCurrent ?? "";
      this.newsCategoryTokenList = this.getNewsCategoryTokenList(
        data.newsCategoryInfoData
      );
      this.newsCategoryInfoData.fillData(data.newsCategoryInfoData);
    } else {
      this.setInitialValue();
    }
  }
  getNewsCategoryTokenList(newsCategoryInfoData) {
    if (newsCategoryInfoData) {
      return newsCategoryInfoData
        .filter((a) => a.newsCategoryToken)
        .map((a) => a.newsCategoryToken);
    } else {
      return [];
    }
  }
}
//#endregion model
