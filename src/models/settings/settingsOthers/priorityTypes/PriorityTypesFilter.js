import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";
import { getLanguage } from "./../../../../utils/functions";
import { LANGUAGES } from "./../../../../utils/constants";

export default class PriorityTypesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.colorInfoDataInclude = true;
    this.priorityScopeDataInclude = true;
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName =
          "{fullCode} - {priorityTypeNameAr} - {colorDataDB.colorNameAr}";
        break;
      case LANGUAGES.enUS:
        this.itemName =
          "{fullCode} - {priorityTypeNameEn} - {colorDataDB.colorNameEn}";
        break;
    }
    this.colorToken = "";
    this.priorityScopeTypeToken = "";
    this.activationTypeTokens =
      store.getters.generalSetting.priorityTypes.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.colorToken = data.colorToken || "";
      this.priorityScopeTypeToken = data.priorityScopeTypeToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
