export default class ColorInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.colorToken = "";
    this.fullCode = "";
    this.colorNameCurrent = "";
    this.colorHexFromat = "";
    this.colorDescriptionCurrent = "";
    this.colorNotes = "";
    this.colorImageIsDefault = false;
    this.colorImagePath = "";
    this.colorImageSizeBytes = "";
    this.colorImageSizeTextCurrent = "";
  }
  fillColorInfoData(data) {
    if (data) {
      this.colorToken = data.colorToken || "";
      this.fullCode = data.fullCode || "";
      this.colorNameCurrent = data.colorNameCurrent || "";
      this.colorHexFromat = data.colorHexFromat || "";
      this.colorDescriptionCurrent = data.colorDescriptionCurrent || "";
      this.colorNotes = data.colorNotes || "";
      this.colorImageIsDefault = data.colorImageIsDefault || false;
      this.colorImagePath = data.colorImagePath || "";
      this.colorImageSizeBytes = data.colorImageSizeBytes || "";
      this.colorImageSizeTextCurrent = data.colorImageSizeTextCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
