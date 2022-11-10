export default class DropDownListItemsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.dropDownListItemToken = "";
    this.dropDownListItemId = "";
    this.dropDownListItemNameCurrent = "";
    this.dropDownListItemNameAr = "";
    this.dropDownListItemNameEn = "";
    this.dropDownListItemNameUnd = "";
  }
  fillData(data) {
    if (data) {
      this.dropDownListItemToken = data.dropDownListItemToken ?? "";
      this.dropDownListItemId = data.dropDownListItemId ?? "";
      this.dropDownListItemNameCurrent = data.dropDownListItemNameCurrent ?? "";
      this.dropDownListItemNameAr = data.dropDownListItemNameAr ?? "";
      this.dropDownListItemNameEn = data.dropDownListItemNameEn ?? "";
      this.dropDownListItemNameUnd = data.dropDownListItemNameUnd ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
