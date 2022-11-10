import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/countedServiceTypes.svg";

export default class CountedServiceType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.countedServiceTypeToken = "";
    this.countedServiceTypeNameCurrent = "";
    this.countedServiceTypeNameAr = "";
    this.countedServiceTypeNameEn = "";
    this.countedServiceTypeNameUnd = "";
    this.countedServiceTypeDescriptionCurrent = "";
    this.countedServiceTypeDescriptionAr = "";
    this.countedServiceTypeDescriptionEn = "";
    this.countedServiceTypeDescriptionUnd = "";
    this.countedServiceTypeNotes = "";
    this.countedServiceTypeImageIsDefault = false;
    this.countedServiceTypeImagePath = "";
    this.countedServiceTypeImageSizeBytes = 0;
    this.countedServiceTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.countedServiceTypeToken = data.countedServiceTypeToken ?? "";
      this.countedServiceTypeNameCurrent =
        data.countedServiceTypeNameCurrent ?? "";
      this.countedServiceTypeNameAr = data.countedServiceTypeNameAr ?? "";
      this.countedServiceTypeNameEn = data.countedServiceTypeNameEn ?? "";
      this.countedServiceTypeNameUnd = data.countedServiceTypeNameUnd ?? "";
      this.countedServiceTypeDescriptionCurrent =
        data.countedServiceTypeDescriptionCurrent ?? "";
      this.countedServiceTypeDescriptionAr =
        data.countedServiceTypeDescriptionAr ?? "";
      this.countedServiceTypeDescriptionEn =
        data.countedServiceTypeDescriptionEn ?? "";
      this.countedServiceTypeDescriptionUnd =
        data.countedServiceTypeDescriptionUnd ?? "";
      this.countedServiceTypeNotes = data.countedServiceTypeNotes ?? "";
      this.countedServiceTypeImageIsDefault =
        data.countedServiceTypeImageIsDefault ?? false;
      this.countedServiceTypeImagePath = data.countedServiceTypeImagePath ?? "";
      this.countedServiceTypeImageSizeBytes =
        data.countedServiceTypeImageSizeBytes ?? 0;
      this.countedServiceTypeImageSizeTextCurrent =
        data.countedServiceTypeImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
