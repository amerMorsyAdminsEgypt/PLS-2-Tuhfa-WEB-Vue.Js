export default class OtherInterestData {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.userOtherInterestToken = "";
    this.interestTypeToken = "";
    this.interestTypeNameCurrent = "";
    this.otherInterestNameAr = "";
    this.otherInterestNameEn = "";
    this.otherInterestNameUnd = "";
    this.otherInterestDescriptionAr = "";
    this.otherInterestDescriptionEn = "";
    this.otherInterestDescriptionUnd = "";
    this.otherInterestNotes = "";
    this.otherInterestDateTimeFrom = "";
    this.otherInterestDateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.userOtherInterestToken = data.userOtherInterestToken ?? "";
      this.interestTypeToken = data.interestTypeToken ?? "";
      this.interestTypeNameCurrent = data.interestTypeNameCurrent ?? "";
      this.otherInterestNameAr = data.otherInterestNameAr ?? "";
      this.otherInterestNameEn = data.otherInterestNameEn ?? "";
      this.otherInterestNameUnd = data.otherInterestNameUnd ?? "";
      this.otherInterestDescriptionAr = data.otherInterestDescriptionAr ?? "";
      this.otherInterestDescriptionEn = data.otherInterestDescriptionEn ?? "";
      this.otherInterestDescriptionUnd = data.otherInterestDescriptionUnd ?? "";
      this.otherInterestNotes = data.otherInterestNotes ?? "";
      this.otherInterestDateTimeFrom = data.otherInterestDateTimeFrom ?? "";
      this.otherInterestDateTimeTo = data.otherInterestDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
