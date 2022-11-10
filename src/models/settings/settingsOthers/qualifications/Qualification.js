import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/qualifications.svg";

export default class Qualification extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.qualificationToken = "";
    this.qualificationNameCurrent = "";
    this.qualificationNameAr = "";
    this.qualificationNameEn = "";
    this.qualificationNameUnd = "";
    this.qualificationDescriptionCurrent = "";
    this.qualificationDescriptionAr = "";
    this.qualificationDescriptionEn = "";
    this.qualificationDescriptionUnd = "";
    this.qualificationNotes = "";
    this.qualificationImageIsDefault = false;
    this.qualificationImagePath = "";
    this.qualificationImageSizeBytes = 0;
    this.qualificationImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.qualificationToken = data.qualificationToken;
      this.qualificationNameCurrent = data.qualificationNameCurrent;
      this.qualificationNameAr = data.qualificationNameAr;
      this.qualificationNameEn = data.qualificationNameEn;
      this.qualificationNameUnd = data.qualificationNameUnd;
      this.qualificationDescriptionCurrent =
        data.qualificationDescriptionCurrent;
      this.qualificationDescriptionAr = data.qualificationDescriptionAr;
      this.qualificationDescriptionEn = data.qualificationDescriptionEn;
      this.qualificationDescriptionUnd = data.qualificationDescriptionUnd;
      this.qualificationNotes = data.qualificationNotes;
      this.qualificationImageIsDefault = data.qualificationImageIsDefault;
      this.qualificationImagePath = data.qualificationImagePath;
      this.qualificationImageSizeBytes = data.qualificationImageSizeBytes;
      this.qualificationImageSizeTextCurrent =
        data.qualificationImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
