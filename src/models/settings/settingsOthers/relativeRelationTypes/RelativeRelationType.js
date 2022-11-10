import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/RelativeRelationTypes.svg";

export default class RelativeRelationType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.relativeRelationTypeToken = "";
    this.relativeRelationTypeNameCurrent = "";
    this.relativeRelationTypeNameAr = "";
    this.relativeRelationTypeNameEn = "";
    this.relativeRelationTypeNameUnd = "";
    this.relativeRelationKinShipDegreeToken = "";
    this.relativeRelationKinShipDegreeNameCurrent = "";
    this.relativeRelationTypeDescriptionCurrent = "";
    this.relativeRelationTypeDescriptionAr = "";
    this.relativeRelationTypeDescriptionEn = "";
    this.relativeRelationTypeDescriptionUnd = "";
    this.relativeRelationTypeNotes = "";
    this.relativeRelationTypeImageIsDefault = false;
    this.relativeRelationTypeImagePath = "";
    this.relativeRelationTypeImageSizeBytes = 0;
    this.relativeRelationTypeImageSizeTextCurrent = "";
    this.relativeRelationTypeImageSizeTextAr = "";
    this.relativeRelationTypeImageSizeTextEn = "";
    this.relativeRelationTypeImageSizeTextUnd = "";
    this.relativeRelationRepetitionStatus = false;
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.relativeRelationTypeToken = data.relativeRelationTypeToken || "";
    this.relativeRelationTypeNameCurrent =
      data.relativeRelationTypeNameCurrent || "";
    this.relativeRelationTypeNameAr = data.relativeRelationTypeNameAr || "";
    this.relativeRelationTypeNameEn = data.relativeRelationTypeNameEn || "";
    this.relativeRelationTypeNameUnd = data.relativeRelationTypeNameUnd || "";
    this.relativeRelationKinShipDegreeToken =
      data.relativeRelationKinShipDegreeToken || "";
    this.relativeRelationKinShipDegreeNameCurrent =
      data.relativeRelationKinShipDegreeNameCurrent || "";
    this.relativeRelationTypeDescriptionCurrent =
      data.relativeRelationTypeDescriptionCurrent || "";
    this.relativeRelationTypeDescriptionAr =
      data.relativeRelationTypeDescriptionAr || "";
    this.relativeRelationTypeDescriptionEn =
      data.relativeRelationTypeDescriptionEn || "";
    this.relativeRelationTypeDescriptionUnd =
      data.relativeRelationTypeDescriptionUnd || "";
    this.relativeRelationTypeNotes = data.relativeRelationTypeNotes || "";
    this.relativeRelationTypeImageIsDefault =
      data.relativeRelationTypeImageIsDefault || false;
    this.relativeRelationTypeImagePath =
      data.relativeRelationTypeImagePath || "";
    this.relativeRelationTypeImageSizeBytes =
      data.relativeRelationTypeImageSizeBytes || 0;
    this.relativeRelationTypeImageSizeTextCurrent =
      data.relativeRelationTypeImageSizeTextCurrent || "";
    this.relativeRelationTypeImageSizeTextAr =
      data.relativeRelationTypeImageSizeTextAr || "";
    this.relativeRelationTypeImageSizeTextEn =
      data.relativeRelationTypeImageSizeTextEn || "";
    this.relativeRelationTypeImageSizeTextUnd =
      data.relativeRelationTypeImageSizeTextUnd || "";
    this.relativeRelationRepetitionStatus =
      data.relativeRelationRepetitionStatus || false;
  }
}
