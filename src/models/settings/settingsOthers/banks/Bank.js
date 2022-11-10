import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/banks.svg";

export default class Bank extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.bankToken = "";
    this.bankNameCurrent = "";
    this.bankNameAr = "";
    this.bankNameEn = "";
    this.bankNameUnd = "";
    this.bankDescriptionCurrent = "";
    this.bankDescriptionAr = "";
    this.bankDescriptionEn = "";
    this.bankDescriptionUnd = "";
    this.bankNotes = "";
    this.bankImageIsDefault = false;
    this.bankImagePath = "";
    this.bankImageSizeBytes = 0;
    this.bankImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.bankToken = data.bankToken;
      this.bankNameCurrent = data.bankNameCurrent;
      this.bankNameAr = data.bankNameAr;
      this.bankNameEn = data.bankNameEn;
      this.bankNameUnd = data.bankNameUnd;
      this.bankDescriptionCurrent = data.bankDescriptionCurrent;
      this.bankDescriptionAr = data.bankDescriptionAr;
      this.bankDescriptionEn = data.bankDescriptionEn;
      this.bankDescriptionUnd = data.bankDescriptionUnd;
      this.bankNotes = data.bankNotes;
      this.bankImageIsDefault = data.bankImageIsDefault;
      this.bankImagePath = data.bankImagePath;
      this.bankImageSizeBytes = data.bankImageSizeBytes;
      this.bankImageSizeTextCurrent = data.bankImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
