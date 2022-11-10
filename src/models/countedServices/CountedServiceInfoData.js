import CountedServiceType from "./../settings/settingsOthers/countedServiceTypes/CountedServiceType";
import EducationalCategoryInfoData from "./EducationalCategoryInfoData";
import PlaceInfoData from "./PlaceInfoData";

export default class CountedServiceInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.countedServiceToken = "";
    this.countedServiceBoughtCount = "";
    this.countedServiceSoldCount = "";
    this.countedServiceRemainCount = "";
    this.countedServiceNameCurrent = "";
    this.countedServiceNameEn = "";
    this.countedServiceNameAr = "";
    this.countedServiceNameUnd = "";
    this.countedServiceDescriptionCurrent = "";
    this.countedServiceDescriptionAr = "";
    this.countedServiceDescriptionEn = "";
    this.countedServiceDescriptionUnd = "";
    this.countedServicePrice = "";
    this.countedServiceMaximumDiscountPercentage = "";
    this.countedServiceImageIsDefault = "";
    this.countedServiceImagePath = "";
    this.countedServiceImageSizeBytes = "";
    this.countedServiceImageSizeTextCurrent = "";
    this.countedServiceNotes = "";
    this.countedServiceTypeToken = "";
    this.educationalCategoryToken = "";
    this.placeToken = "";
    this.countedServiceTypeData = new CountedServiceType();
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
    this.placeInfoData = new PlaceInfoData();
  }
  fillData(data) {
    if (data) {
      this.countedServiceToken = data.countedServiceToken ?? "";
      this.countedServiceBoughtCount = data.countedServiceBoughtCount ?? "";
      this.countedServiceSoldCount = data.countedServiceSoldCount ?? "";
      this.countedServiceRemainCount = data.countedServiceRemainCount ?? "";
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
