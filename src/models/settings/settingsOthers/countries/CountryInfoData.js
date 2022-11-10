export default class CountryInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.countryToken = "";
    this.nationalityNameCurrent = "";
    this.nationalityNameAr = "";
    this.nationalityNameEn = "";
    this.nationalityNameUnd = "";
    this.countryDescriptionCurrent = "";
    this.countryDescriptionAr = "";
    this.countryDescriptionEn = "";
    this.countryDescriptionUnd = "";
    this.countryNotes = "";
    this.countryImageIsDefault = false;
    this.countryImagePath = "";
    this.countryImageSizeBytes = 0;
    this.countryImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.countryToken = data.countryToken;
      this.nationalityNameCurrent = data.nationalityNameCurrent;
      this.nationalityNameAr = data.nationalityNameAr;
      this.nationalityNameEn = data.nationalityNameEn;
      this.nationalityNameUnd = data.nationalityNameUnd;
      this.countryDescriptionCurrent = data.countryDescriptionCurrent;
      this.countryDescriptionAr = data.countryDescriptionAr;
      this.countryDescriptionEn = data.countryDescriptionEn;
      this.countryDescriptionUnd = data.countryDescriptionUnd;
      this.countryNotes = data.countryNotes;
      this.countryImageIsDefault = data.countryImageIsDefault;
      this.countryImagePath = data.countryImagePath;
      this.countryImageSizeBytes = data.countryImageSizeBytes;
      this.countryImageSizeTextCurrent = data.countryImageSizeTextCurrent;
    } else {
      this.setInitialValue();
    }
  }
}
