import EducationalCategoryInfoData from "./../../educational/educationalCategories/EducationalCategoryInfoData";
import PlaceInfoData from "./../../places/PlaceInfoData";

export default class EducationalCategoryInterestData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalCategoryInterestToken = "";
    this.startDateTime = "";
    this.endDateTime = "";
    this.joiningTypeToken = "";
    this.joiningTypeNameCurrent = "";
    this.joiningTypeNameEn = "";
    this.joiningTypeNameAr = "";
    this.joiningTypeNameUnd = "";
    this.educationalCategoryInterestDescriptionCurrent = "";
    this.educationalCategoryInterestDescriptionAr = "";
    this.educationalCategoryInterestDescriptionEn = "";
    this.educationalCategoryInterestDescriptionUnd = "";
    this.educationalCategoryToken = "";
    this.placeToken = "";
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
    this.placeInfoData = new PlaceInfoData();
  }
  fillData(data) {
    if (data) {
      this.educationalCategoryInterestToken =
        data.educationalCategoryInterestToken ?? "";
      this.startDateTime = data.startDateTime ?? "";
      this.endDateTime = data.endDateTime ?? "";
      this.joiningTypeToken = data.joiningTypeToken ?? "";
      this.joiningTypeNameCurrent = data.joiningTypeNameCurrent ?? "";
      this.joiningTypeNameEn = data.joiningTypeNameEn ?? "";
      this.joiningTypeNameAr = data.joiningTypeNameAr ?? "";
      this.joiningTypeNameUnd = data.joiningTypeNameUnd ?? "";
      this.educationalCategoryInterestDescriptionCurrent =
        data.educationalCategoryInterestDescriptionCurrent ?? "";
      this.educationalCategoryInterestDescriptionAr =
        data.educationalCategoryInterestDescriptionAr ?? "";
      this.educationalCategoryInterestDescriptionEn =
        data.educationalCategoryInterestDescriptionEn ?? "";
      this.educationalCategoryInterestDescriptionUnd =
        data.educationalCategoryInterestDescriptionUnd ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.placeToken = data.placeToken ?? "";
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
      this.placeInfoData.fillData(data.placeInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
