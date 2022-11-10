import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";
import { getLanguage } from "./../../../../utils/functions";
import { LANGUAGES } from "./../../../../utils/constants";
import i18n from "./../../../../i18n";

let language = getLanguage();

export default class PriceListsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    switch (language) {
      case LANGUAGES.arEG:
        this.itemName = `${i18n.t("name")}: {priceListNameAr} - ${i18n.t(
          "PriceLists.packagePriceForClient"
        )}: {priceListPackagePriceForClient} - ${i18n.t(
          "PriceLists.sessionPriceForClient"
        )}: {priceListSessionPriceForClient}`;
        break;
      case LANGUAGES.enUS:
        this.itemName = `${i18n.t("name")}: {priceListNameEn} - ${i18n.t(
          "PriceLists.packagePriceForClient"
        )}: {priceListPackagePriceForClient} - ${i18n.t(
          "PriceLists.sessionPriceForClient"
        )}: {priceListSessionPriceForClient}`;
        break;
    }
    this.educationalCategoryInfoDataInclude = true;

    this.educationalCategoryToken = "";
    this.showStatusToken = "";

    this.activationTypeTokens =
      store.getters.generalSetting.priceLists.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
