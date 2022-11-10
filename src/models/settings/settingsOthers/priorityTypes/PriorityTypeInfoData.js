export default class PriorityTypeInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.priorityTypeToken = "";
    this.priorityTypeImagePath = "";
    this.priorityTypeNameCurrent = "";
    this.priorityTypeDescriptionCurrent = "";
    this.colorToken = "";
    this.colorNameCurrent = "";
    this.colorImagePath = "";
    this.colorHexFromat = "";
  }
  fillPriorityTypeInfoData(data) {
    if (data) {
      this.priorityTypeToken = data.priorityTypeToken || "";
      this.priorityTypeImagePath = data.priorityTypeImagePath || "";
      this.priorityTypeNameCurrent = data.priorityTypeNameCurrent || "";
      this.priorityTypeDescriptionCurrent =
        data.priorityTypeDescriptionCurrent || "";
      this.colorToken = data.colorToken || "";
      this.colorNameCurrent = data.colorNameCurrent || "";
      this.colorImagePath = data.colorImagePath || "";
      this.colorHexFromat = data.colorHexFromat || "";
    } else {
      this.setInitialValue();
    }
  }
}
