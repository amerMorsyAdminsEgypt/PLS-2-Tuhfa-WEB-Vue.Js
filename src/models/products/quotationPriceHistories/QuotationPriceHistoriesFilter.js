import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class QuotationPriceHistoriesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.quotationPriceHistories
        .activationTypeTokens || [];

    this.storeItemToken = "";
    this.priceQuotationDetailsToken = "";
    this.quotationPriceHistoryToken = "";
    this.placeToken = "";
    this.priceQuotationDetailsInfoDataInclude = false;
    this.placeInfoDataInclude = false;
    this.totalItemsQuantityFrom = "";
    this.totalItemsQuantityTo = "";
    this.storeItemAmountFrom = "";
    this.storeItemAmountTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
