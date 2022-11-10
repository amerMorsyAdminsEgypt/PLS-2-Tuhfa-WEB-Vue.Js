import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";
import { getLanguage } from "./../../utils/functions";
import { LANGUAGES } from "./../../utils/constants";
import i18n from "./../../i18n";

export default class CountedServicesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.language = getLanguage();
    switch (this.language) {
      case LANGUAGES.arEG:
        this.itemName = `{countedServiceNameAr} - (${i18n.t(
          "CountedServiceTransactions.countedServiceCount"
        )}: {countedServiceRemainCount}) - (${i18n.t(
          "price"
        )}: {countedServicePrice}) - (${i18n.t(
          "type"
        )}: {countedServiceTypeData.countedServiceTypeNameAr})`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `{countedServiceNameEn} - (${i18n.t(
          "CountedServiceTransactions.countedServiceCount"
        )}: {countedServiceRemainCount}) - (${i18n.t(
          "price"
        )}: {countedServicePrice}) - (${i18n.t(
          "type"
        )}: {countedServiceTypeData.countedServiceTypeNameEn})`;
        break;
    }

    this.countedServiceTypeToken = "";
    this.placeToken = "";
    this.educationalCategoryToken = "";
    this.countedServiceTypeDataInclude = true;
    this.educationalCategoryInfoDataInclude = true;
    this.placeInfoDataInclude = true;

    this.activationTypeTokens =
      store.getters.generalSetting.countedServices.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
