import BaseEntityModel from "./../../general/BaseEntityModel";
import PropertyDetailsData from "./PropertyDetailsData";
import defaultImg from "@/assets/images/PropertyTypes.svg";

export default class PropertyType extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.propertyTypeToken = "00000000-0000-0000-0000-000000000000";
    this.propertyTypeNameCurrent = "";
    this.propertyTypeNameAr = "";
    this.propertyTypeNameEn = "";
    this.propertyTypeNameUnd = "";
    this.propertyTypeDescriptionCurrent = "";
    this.propertyTypeDescriptionAr = "";
    this.propertyTypeDescriptionEn = "";
    this.propertyTypeDescriptionUnd = "";
    this.propertyTypeNotes = "";
    this.propertyTypeImageIsDefault = false;
    this.propertyTypeImagePath = "";
    this.propertyTypeImageSizeBytes = 0;
    this.propertyTypeImageSizeTextCurrent = "";
    this.propertyDetailsData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.propertyTypeToken =
        data.propertyTypeToken ?? "00000000-0000-0000-0000-000000000000";
      this.propertyTypeNameCurrent = data.propertyTypeNameCurrent ?? "";
      this.propertyTypeNameAr = data.propertyTypeNameAr ?? "";
      this.propertyTypeNameEn = data.propertyTypeNameEn ?? "";
      this.propertyTypeNameUnd = data.propertyTypeNameUnd ?? "";
      this.propertyTypeDescriptionCurrent =
        data.propertyTypeDescriptionCurrent ?? "";
      this.propertyTypeDescriptionAr = data.propertyTypeDescriptionAr ?? "";
      this.propertyTypeDescriptionEn = data.propertyTypeDescriptionEn ?? "";
      this.propertyTypeDescriptionUnd = data.propertyTypeDescriptionUnd ?? "";
      this.propertyTypeNotes = data.propertyTypeNotes ?? "";
      this.propertyTypeImageIsDefault =
        data.propertyTypeImageIsDefault ?? false;
      this.propertyTypeImagePath = data.propertyTypeImagePath ?? "";
      this.propertyTypeImageSizeBytes = data.propertyTypeImageSizeBytes ?? 0;
      this.propertyTypeImageSizeTextCurrent =
        data.propertyTypeImageSizeTextCurrent ?? "";
      this.propertyDetailsData = [];
      if (
        data.propertyDetailsData != null &&
        data.propertyDetailsData.length > 0
      ) {
        this.propertyDetailsData = data.propertyDetailsData.map((element) => {
          return new PropertyDetailsData(element);
        });
      }
    } else {
      this.setInitialValue();
    }
  }
}
