import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/operationTypes.svg";

export default class OperationType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.operationTypeToken = "";
    this.operationTypeNameCurrent = "";
    this.operationTypeNameAr = "";
    this.operationTypeNameEn = "";
    this.operationTypeNameUnd = "";
    this.operationTypeDescriptionCurrent = "";
    this.operationTypeDescriptionAr = "";
    this.operationTypeDescriptionEn = "";
    this.operationTypeDescriptionUnd = "";
    this.operationTypeNotes = "";
    this.operationTypeImageIsDefault = false;
    this.operationTypeImagePath = "";
    this.operationTypeImageSizeBytes = 0;
    this.operationTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.operationTypeToken = data.operationTypeToken;
      this.operationTypeNameCurrent = data.operationTypeNameCurrent;
      this.operationTypeNameAr = data.operationTypeNameAr;
      this.operationTypeNameEn = data.operationTypeNameEn;
      this.operationTypeNameUnd = data.operationTypeNameUnd;
      this.operationTypeDescriptionCurrent =
        data.operationTypeDescriptionCurrent;
      this.operationTypeDescriptionAr = data.operationTypeDescriptionAr;
      this.operationTypeDescriptionEn = data.operationTypeDescriptionEn;
      this.operationTypeDescriptionUnd = data.operationTypeDescriptionUnd;
      this.operationTypeNotes = data.operationTypeNotes;
      this.operationTypeImageIsDefault = data.operationTypeImageIsDefault;
      this.operationTypeImagePath = data.operationTypeImagePath;
      this.operationTypeImageSizeBytes = data.operationTypeImageSizeBytes;
      this.operationTypeImageSizeTextCurrent =
        data.operationTypeImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
