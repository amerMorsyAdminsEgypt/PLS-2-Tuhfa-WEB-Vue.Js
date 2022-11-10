import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/communicationTypes.svg";

export default class CommunicationType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.communicationTypeToken = "";
    this.communicationTypeNameCurrent = "";
    this.communicationTypeNameAr = "";
    this.communicationTypeNameEn = "";
    this.communicationTypeNameUnd = "";
    this.communicationTypeDescriptionCurrent = "";
    this.communicationTypeDescriptionAr = "";
    this.communicationTypeDescriptionEn = "";
    this.communicationTypeDescriptionUnd = "";
    this.communicationTypeNotes = "";
    this.communicationTypeImageIsDefault = false;
    this.communicationTypeImagePath = "";
    this.communicationTypeImageSizeBytes = 0;
    this.communicationTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.communicationTypeToken = data.communicationTypeToken || "";
      this.communicationTypeNameCurrent =
        data.communicationTypeNameCurrent || "";
      this.communicationTypeNameAr = data.communicationTypeNameAr || "";
      this.communicationTypeNameEn = data.communicationTypeNameEn || "";
      this.communicationTypeNameUnd = data.communicationTypeNameUnd || "";
      this.communicationTypeDescriptionCurrent =
        data.communicationTypeDescriptionCurrent || "";
      this.communicationTypeDescriptionAr =
        data.communicationTypeDescriptionAr || "";
      this.communicationTypeDescriptionEn =
        data.communicationTypeDescriptionEn || "";
      this.communicationTypeDescriptionUnd =
        data.communicationTypeDescriptionUnd || "";
      this.communicationTypeNotes = data.communicationTypeNotes || "";
      this.communicationTypeImageIsDefault =
        data.communicationTypeImageIsDefault || false;
      this.communicationTypeImagePath = data.communicationTypeImagePath || "";
      this.communicationTypeImageSizeBytes =
        data.communicationTypeImageSizeBytes || "";
      this.communicationTypeImageSizeTextCurrent =
        data.communicationTypeImageSizeTextCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
