import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/militaryStatus.svg";

export default class MilitaryStatusType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.militaryStatusTypeToken = "";
    this.militaryStatusTypeNameCurrent = "";
    this.militaryStatusTypeNameAr = "";
    this.militaryStatusTypeNameEn = "";
    this.militaryStatusTypeNameUnd = "";
    this.militaryStatusTypeDescriptionCurrent = "";
    this.militaryStatusTypeDescriptionAr = "";
    this.militaryStatusTypeDescriptionEn = "";
    this.militaryStatusTypeDescriptionUnd = "";
    this.militaryStatusTypeNotes = "";
    this.militaryStatusTypeImageIsDefault = false;
    this.militaryStatusTypeImagePath = "";
    this.militaryStatusTypeImageSizeBytes = 0;
    this.militaryStatusTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.militaryStatusTypeToken = data.militaryStatusTypeToken;
      this.militaryStatusTypeNameCurrent = data.militaryStatusTypeNameCurrent;
      this.militaryStatusTypeNameAr = data.militaryStatusTypeNameAr;
      this.militaryStatusTypeNameEn = data.militaryStatusTypeNameEn;
      this.militaryStatusTypeNameUnd = data.militaryStatusTypeNameUnd;
      this.militaryStatusTypeDescriptionCurrent =
        data.militaryStatusTypeDescriptionCurrent;
      this.militaryStatusTypeDescriptionAr =
        data.militaryStatusTypeDescriptionAr;
      this.militaryStatusTypeDescriptionEn =
        data.militaryStatusTypeDescriptionEn;
      this.militaryStatusTypeDescriptionUnd =
        data.militaryStatusTypeDescriptionUnd;
      this.militaryStatusTypeNotes = data.militaryStatusTypeNotes;
      this.militaryStatusTypeImageIsDefault =
        data.militaryStatusTypeImageIsDefault;
      this.militaryStatusTypeImagePath = data.militaryStatusTypeImagePath;
      this.militaryStatusTypeImageSizeBytes =
        data.militaryStatusTypeImageSizeBytes;
      this.militaryStatusTypeImageSizeTextCurrent =
        data.militaryStatusTypeImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
