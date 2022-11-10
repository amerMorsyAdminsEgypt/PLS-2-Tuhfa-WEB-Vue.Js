import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/educationalStages.svg";

export default class EducationalStage extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalStageToken = "";
    this.educationalStageNameCurrent = "";
    this.educationalStageNameAr = "";
    this.educationalStageNameEn = "";
    this.educationalStageNameUnd = "";
    this.educationalStageDescriptionCurrent = "";
    this.educationalStageDescriptionAr = "";
    this.educationalStageDescriptionEn = "";
    this.educationalStageDescriptionUnd = "";
    this.educationalStageNotes = "";
    this.educationalStageOrder = 0;
    this.educationalStageImageIsDefault = false;
    this.educationalStageImagePath = "";
    this.educationalStageImageSizeBytes = 0;
    this.educationalStageImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalStageToken = data.educationalStageToken ?? "";
      this.educationalStageNameCurrent = data.educationalStageNameCurrent ?? "";
      this.educationalStageNameAr = data.educationalStageNameAr ?? "";
      this.educationalStageNameEn = data.educationalStageNameEn ?? "";
      this.educationalStageNameUnd = data.educationalStageNameUnd ?? "";
      this.educationalStageDescriptionCurrent =
        data.educationalStageDescriptionCurrent ?? "";
      this.educationalStageDescriptionAr =
        data.educationalStageDescriptionAr ?? "";
      this.educationalStageDescriptionEn =
        data.educationalStageDescriptionEn ?? "";
      this.educationalStageDescriptionUnd =
        data.educationalStageDescriptionUnd ?? "";
      this.educationalStageNotes = data.educationalStageNotes ?? "";
      this.educationalStageOrder = data.educationalStageOrder ?? 0;
      this.educationalStageImageIsDefault =
        data.educationalStageImageIsDefault ?? false;
      this.educationalStageImagePath = data.educationalStageImagePath ?? "";
      this.educationalStageImageSizeBytes =
        data.educationalStageImageSizeBytes ?? 0;
      this.educationalStageImageSizeTextCurrent =
        data.educationalStageImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
