import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/classificationDegrees.svg";

export default class ClassificationDegree extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.classificationDegreeToken = "";
    this.classificationDegreeNameCurrent = "";
    this.classificationDegreeNameAr = "";
    this.classificationDegreeNameEn = "";
    this.classificationDegreeNameUnd = "";
    this.classificationDegreeGradeFrom = "";
    this.classificationDegreeGradeTo = "";
    this.classificationDegreeDescriptionCurrent = "";
    this.classificationDegreeDescriptionAr = "";
    this.classificationDegreeDescriptionEn = "";
    this.classificationDegreeDescriptionUnd = "";
    this.classificationDegreeNotes = "";
    this.classificationDegreeImageIsDefault = "";
    this.classificationDegreeImagePath = "";
    this.classificationDegreeImageSizeBytes = "";
    this.classificationDegreeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.classificationDegreeToken = data.classificationDegreeToken ?? "";
      this.classificationDegreeNameCurrent =
        data.classificationDegreeNameCurrent ?? "";
      this.classificationDegreeNameAr = data.classificationDegreeNameAr ?? "";
      this.classificationDegreeNameEn = data.classificationDegreeNameEn ?? "";
      this.classificationDegreeNameUnd = data.classificationDegreeNameUnd ?? "";
      this.classificationDegreeGradeFrom =
        data.classificationDegreeGradeFrom ?? "";
      this.classificationDegreeGradeTo = data.classificationDegreeGradeTo ?? "";
      this.classificationDegreeDescriptionCurrent =
        data.classificationDegreeDescriptionCurrent ?? "";
      this.classificationDegreeDescriptionAr =
        data.classificationDegreeDescriptionAr ?? "";
      this.classificationDegreeDescriptionEn =
        data.classificationDegreeDescriptionEn ?? "";
      this.classificationDegreeDescriptionUnd =
        data.classificationDegreeDescriptionUnd ?? "";
      this.classificationDegreeNotes = data.classificationDegreeNotes ?? "";
      this.classificationDegreeImageIsDefault =
        data.classificationDegreeImageIsDefault ?? "";
      this.classificationDegreeImagePath =
        data.classificationDegreeImagePath ?? "";
      this.classificationDegreeImageSizeBytes =
        data.classificationDegreeImageSizeBytes ?? "";
      this.classificationDegreeImageSizeTextCurrent =
        data.classificationDegreeImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
