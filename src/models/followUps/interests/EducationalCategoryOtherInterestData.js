export default class EducationalCategoryOtherInterestData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalCategoryOtherInterestToken = "";
    this.educationalCategoryOtherInterestNameCurrent = "";
    this.educationalCategoryOtherInterestNameAr = "";
    this.educationalCategoryOtherInterestNameEn = "";
    this.educationalCategoryOtherInterestNameUnd = "";
    this.educationalCategoryOtherInterestDescriptionCurrent = "";
    this.educationalCategoryOtherInterestDescriptionAr = "";
    this.educationalCategoryOtherInterestDescriptionEn = "";
    this.educationalCategoryOtherInterestDescriptionUnd = "";
  }
  fillData(data) {
    if (data) {
      this.educationalCategoryOtherInterestToken =
        data.educationalCategoryOtherInterestToken ?? "";
      this.educationalCategoryOtherInterestNameCurrent =
        data.educationalCategoryOtherInterestNameCurrent ?? "";
      this.educationalCategoryOtherInterestNameAr =
        data.educationalCategoryOtherInterestNameAr ?? "";
      this.educationalCategoryOtherInterestNameEn =
        data.educationalCategoryOtherInterestNameEn ?? "";
      this.educationalCategoryOtherInterestNameUnd =
        data.educationalCategoryOtherInterestNameUnd ?? "";
      this.educationalCategoryOtherInterestDescriptionCurrent =
        data.educationalCategoryOtherInterestDescriptionCurrent ?? "";
      this.educationalCategoryOtherInterestDescriptionAr =
        data.educationalCategoryOtherInterestDescriptionAr ?? "";
      this.educationalCategoryOtherInterestDescriptionEn =
        data.educationalCategoryOtherInterestDescriptionEn ?? "";
      this.educationalCategoryOtherInterestDescriptionUnd =
        data.educationalCategoryOtherInterestDescriptionUnd ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
