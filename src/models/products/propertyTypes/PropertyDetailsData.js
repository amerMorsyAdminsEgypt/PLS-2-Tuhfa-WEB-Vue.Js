import { PROPERTY_FIELD_TYPES } from "./../../../utils/constantLists";
import { DEFAULT_DATE } from "./../../../utils/constants";

export default class PropertyDetailsData {
  constructor(data = "") {
    if (data) this.fillData(data);
    else this.setInitialValue();
  }
  setInitialValue() {
    this.propertyNameCurrent = "";
    this.propertyNameAr = "";
    this.propertyNameEn = "";
    this.propertyNameUnd = "";
    this.propertyFieldTypeToken = "";
    this.propertyFieldTypeNameCurrent = "";
    this.propertyFieldDefaultValueCurrent = "";
    this.propertyFieldDefaultValueAr = "";
    this.propertyFieldDefaultValueEn = "";
    this.propertyFieldDefaultValueUnd = "";
    this.dropDownListToken = "";
    this.propertyFieldDefaultValueToken = "";
    this.defaultValueOptions = [];
    this.propertyDateTime = "";
  }
  fillData(data) {
    if (data) {
      this.propertyNameCurrent = data.propertyNameCurrent ?? "";
      this.propertyNameAr = data.propertyNameAr ?? "";
      this.propertyNameEn = data.propertyNameEn ?? "";
      this.propertyNameUnd = data.propertyNameUnd ?? "";
      this.propertyFieldTypeToken = data.propertyFieldTypeToken ?? "";
      this.propertyFieldTypeNameCurrent =
        data.propertyFieldTypeNameCurrent ?? "";
      this.propertyFieldDefaultValueCurrent =
        data.propertyFieldDefaultValueCurrent ?? "";
      this.propertyFieldDefaultValueAr = data.propertyFieldDefaultValueAr ?? "";
      this.propertyFieldDefaultValueEn = data.propertyFieldDefaultValueEn ?? "";
      this.propertyFieldDefaultValueUnd =
        data.propertyFieldDefaultValueUnd ?? "";
      this.dropDownListToken = data.dropDownListToken ?? "";
      this.propertyFieldDefaultValueToken =
        data.propertyFieldDefaultValueToken ?? "";
      this.defaultValueOptions = [];
      if (
        data.dropDownListInfoData != null &&
        data.dropDownListInfoData.dropDownListItemsData != null &&
        data.dropDownListInfoData.dropDownListItemsData.length > 0
      ) {
        this.defaultValueOptions =
          data.dropDownListInfoData.dropDownListItemsData.map((element) => {
            return {
              value: element.dropDownListItemToken,
              text: element.dropDownListItemNameCurrent,
            };
          });
      }
      this.propertyDateTime =
        data.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Time
          ? `${DEFAULT_DATE} ${data.propertyFieldDefaultValueAr}`
          : "";
    } else {
      this.setInitialValue();
    }
  }
}
