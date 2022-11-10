import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";
import { getLanguage } from "./../../utils/functions";
import { LANGUAGES } from "./../../utils/constants";
import i18n from "./../../i18n";

export default class ServicesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `{serviceNameAr} - ${i18n.t(
          "type"
        )}:{serviceTypeData.serviceTypeNameAr} - ${i18n.t(
          "price"
        )}:{servicePrice} - ${i18n.t(
          "EducationalCategories.name"
        )}:{educationalCategoryData.educationalCategoryNameAr} - ${i18n.t(
          "place"
        )}:{placeData.placeNameAr}`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `{serviceNameEn} - ${i18n.t(
          "type"
        )}:{serviceTypeData.serviceTypeNameEn} - ${i18n.t(
          "price"
        )}:{servicePrice} - ${i18n.t(
          "EducationalCategories.name"
        )}:{educationalCategoryData.educationalCategoryNameEn} - ${i18n.t(
          "place"
        )}:{placeData.placeNameEn}`;
        break;
    }

    this.serviceTypeToken = "";
    this.placeToken = "";
    this.educationalCategoryToken = "";
    this.serviceTypeDataInclude = true;
    this.educationalCategoryInfoDataInclude = true;
    this.placeInfoDataInclude = true;

    this.activationTypeTokens =
      store.getters.generalSetting.services.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
