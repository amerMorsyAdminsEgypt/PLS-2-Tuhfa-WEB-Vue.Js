import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/countedServices.svg";
import CountedServiceType from "./../settings/settingsOthers/countedServiceTypes/CountedServiceType";
import EducationalCategoryInfoData from "./EducationalCategoryInfoData";
import PlaceInfoData from "./PlaceInfoData";

export default class CountedService extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.countedServiceToken = "";
    this.countedServiceNameCurrent = "";
    this.countedServiceNameEn = "";
    this.countedServiceNameAr = "";
    this.countedServiceNameUnd = "";
    this.countedServiceDescriptionCurrent = "";
    this.countedServiceDescriptionAr = "";
    this.countedServiceDescriptionEn = "";
    this.countedServiceDescriptionUnd = "";
    this.countedServicePrice = "";
    this.countedServicePriceWithCurrency = "";
    this.countedServiceMaximumDiscountPercentage = "";
    this.countedServiceImageIsDefault = "";
    this.countedServiceImagePath = "";
    this.countedServiceImageSizeBytes = "";
    this.countedServiceImageSizeTextCurrent = "";
    this.countedServiceNotes = "";
    this.countedServiceTypeToken = "";
    this.countedServiceBoughtCount = "";
    this.countedServiceSoldCount = "";
    this.countedServiceRemainCount = "";
    this.educationalCategoryToken = "";
    this.placeToken = "";
    this.countedServiceTypeData = new CountedServiceType();
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
    this.placeInfoData = new PlaceInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.countedServiceToken = data.countedServiceToken ?? "";
      this.countedServiceNameCurrent = data.countedServiceNameCurrent ?? "";
      this.countedServiceNameEn = data.countedServiceNameEn ?? "";
      this.countedServiceNameAr = data.countedServiceNameAr ?? "";
      this.countedServiceNameUnd = data.countedServiceNameUnd ?? "";
      this.countedServiceDescriptionCurrent =
        data.countedServiceDescriptionCurrent ?? "";
      this.countedServiceDescriptionAr = data.countedServiceDescriptionAr ?? "";
      this.countedServiceDescriptionEn = data.countedServiceDescriptionEn ?? "";
      this.countedServiceDescriptionUnd =
        data.countedServiceDescriptionUnd ?? "";
      this.countedServicePrice = data.countedServicePrice ?? "";
      this.countedServicePriceWithCurrency =
        data.countedServicePriceWithCurrency ?? "";
      this.countedServiceMaximumDiscountPercentage =
        data.countedServiceMaximumDiscountPercentage ?? "";
      this.countedServiceImageIsDefault =
        data.countedServiceImageIsDefault ?? "";
      this.countedServiceImagePath = data.countedServiceImagePath ?? "";
      this.countedServiceImageSizeBytes =
        data.countedServiceImageSizeBytes ?? "";
      this.countedServiceImageSizeTextCurrent =
        data.countedServiceImageSizeTextCurrent ?? "";
      this.countedServiceNotes = data.countedServiceNotes ?? "";
      this.countedServiceTypeToken = data.countedServiceTypeToken ?? "";
      this.countedServiceBoughtCount = data.countedServiceBoughtCount ?? "";
      this.countedServiceSoldCount = data.countedServiceSoldCount ?? "";
      this.countedServiceRemainCount = data.countedServiceRemainCount ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.placeToken = data.placeToken ?? "";
      this.countedServiceTypeData.fillData(data.countedServiceTypeData);
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
