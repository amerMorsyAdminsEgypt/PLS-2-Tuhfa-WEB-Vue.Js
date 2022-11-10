import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/scientificDegrees.svg";

export default class ScientificDegree extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.scientificDegreeToken = "";
    this.scientificDegreeNameCurrent = "";
    this.scientificDegreeNameAr = "";
    this.scientificDegreeNameEn = "";
    this.scientificDegreeNameUnd = "";
    this.scientificDegreeGradeFrom = "";
    this.scientificDegreeGradeTo = "";
    this.scientificDegreeDescriptionCurrent = "";
    this.scientificDegreeDescriptionAr = "";
    this.scientificDegreeDescriptionEn = "";
    this.scientificDegreeDescriptionUnd = "";
    this.scientificDegreeNotes = "";
    this.scientificDegreeImageIsDefault = "";
    this.scientificDegreeImagePath = "";
    this.scientificDegreeImageSizeBytes = "";
    this.scientificDegreeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.scientificDegreeToken = data.scientificDegreeToken ?? "";
      this.scientificDegreeNameCurrent = data.scientificDegreeNameCurrent ?? "";
      this.scientificDegreeNameAr = data.scientificDegreeNameAr ?? "";
      this.scientificDegreeNameEn = data.scientificDegreeNameEn ?? "";
      this.scientificDegreeNameUnd = data.scientificDegreeNameUnd ?? "";
      this.scientificDegreeGradeFrom = data.scientificDegreeGradeFrom ?? "";
      this.scientificDegreeGradeTo = data.scientificDegreeGradeTo ?? "";
      this.scientificDegreeDescriptionCurrent =
        data.scientificDegreeDescriptionCurrent ?? "";
      this.scientificDegreeDescriptionAr =
        data.scientificDegreeDescriptionAr ?? "";
      this.scientificDegreeDescriptionEn =
        data.scientificDegreeDescriptionEn ?? "";
      this.scientificDegreeDescriptionUnd =
        data.scientificDegreeDescriptionUnd ?? "";
      this.scientificDegreeNotes = data.scientificDegreeNotes ?? "";
      this.scientificDegreeImageIsDefault =
        data.scientificDegreeImageIsDefault ?? "";
      this.scientificDegreeImagePath = data.scientificDegreeImagePath ?? "";
      this.scientificDegreeImageSizeBytes =
        data.scientificDegreeImageSizeBytes ?? "";
      this.scientificDegreeImageSizeTextCurrent =
        data.scientificDegreeImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
