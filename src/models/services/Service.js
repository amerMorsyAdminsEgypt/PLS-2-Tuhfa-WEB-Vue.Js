import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/services.svg";
import ServiceType from "./../settings/settingsOthers/serviceTypes/ServiceType";
import EducationalCategory from "./../educational/educationalCategories/EducationalCategory";
import Place from "./../places/Place";

export default class Service extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.serviceToken = "";
    this.serviceNameCurrent = "";
    this.serviceNameEn = "";
    this.serviceNameAr = "";
    this.serviceNameUnd = "";
    this.serviceDescriptionCurrent = "";
    this.serviceDescriptionAr = "";
    this.serviceDescriptionEn = "";
    this.serviceDescriptionUnd = "";
    this.servicePrice = "";
    this.serviceMaximumDiscountPercentage = "";
    this.serviceImageIsDefault = "";
    this.serviceImagePath = "";
    this.serviceImageSizeBytes = "";
    this.serviceImageSizeTextCurrent = "";
    this.serviceNotes = "";
    this.serviceTypeToken = "";
    this.educationalCategoryToken = "";
    this.placeToken = "";
    this.serviceTypeData = new ServiceType();
    this.educationalCategoryInfoData = new EducationalCategory();
    this.placeInfoData = new Place();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.serviceToken = data.serviceToken ?? "";
      this.serviceNameCurrent = data.serviceNameCurrent ?? "";
      this.serviceNameEn = data.serviceNameEn ?? "";
      this.serviceNameAr = data.serviceNameAr ?? "";
      this.serviceNameUnd = data.serviceNameUnd ?? "";
      this.serviceDescriptionCurrent = data.serviceDescriptionCurrent ?? "";
      this.serviceDescriptionAr = data.serviceDescriptionAr ?? "";
      this.serviceDescriptionEn = data.serviceDescriptionEn ?? "";
      this.serviceDescriptionUnd = data.serviceDescriptionUnd ?? "";
      this.servicePrice = data.servicePrice ?? "";
      this.serviceMaximumDiscountPercentage =
        data.serviceMaximumDiscountPercentage ?? "";
      this.serviceImageIsDefault = data.serviceImageIsDefault ?? "";
      this.serviceImagePath = data.serviceImagePath ?? "";
      this.serviceImageSizeBytes = data.serviceImageSizeBytes ?? "";
      this.serviceImageSizeTextCurrent = data.serviceImageSizeTextCurrent ?? "";
      this.serviceNotes = data.serviceNotes ?? "";
      this.serviceTypeToken = data.serviceTypeToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.placeToken = data.placeToken ?? "";
      this.serviceTypeData.fillData(data.serviceTypeData);
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
      this.placeInfoData.fillData(data.placeInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
