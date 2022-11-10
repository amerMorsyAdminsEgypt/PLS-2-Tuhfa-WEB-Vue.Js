import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class PriceQuotationAffiliateOperationsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    try {
      this.activationTypeTokens =
        store.getters.generalSetting.priceQuotationAffiliateOperations.activationTypeTokens;
    } catch (error) {
      this.activationTypeTokens = [];
    }

    this.priceQuotationDetailsToken = "";
    this.priceQuotationDetailsInfoDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.priceQuotationDetailsInfoDataInclude =
        data.priceQuotationDetailsInfoDataInclude ?? false;
    } else {
      this.setInitialValue();
    }
  }
}
