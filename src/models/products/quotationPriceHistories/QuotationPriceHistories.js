import GeneralModel from "./../../general/GeneralModel";
import QuotationPriceHistory from "./QuotationPriceHistory";
import QuotationPriceHistoryModel from "./QuotationPriceHistoryModel";
import QuotationPriceHistoriesFilter from "./QuotationPriceHistoriesFilter";

export default class QuotationPriceHistories extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.quotationPriceHistoriesData = [];
    this.quotationPriceHistory = new QuotationPriceHistory();
    this.quotationPriceHistoryModel = new QuotationPriceHistoryModel();
    this.filterData = new QuotationPriceHistoriesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.quotationPriceHistoriesData = data.quotationPriceHistoriesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
