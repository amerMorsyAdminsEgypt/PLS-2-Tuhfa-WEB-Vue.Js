import PriceQuotationAffiliateOperationGeneralModel from "./PriceQuotationAffiliateOperationGeneralModel";
import PriceQuotationAffiliateOperation from "./PriceQuotationAffiliateOperation";
import PriceQuotationAffiliateOperationsFilter from "./PriceQuotationAffiliateOperationsFilter";

export default class PriceQuotationAffiliateOperations extends PriceQuotationAffiliateOperationGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.priceQuotationAffiliateOperationsData = [];
    this.priceQuotationAffiliateOperation =
      new PriceQuotationAffiliateOperation();
    this.filterData = new PriceQuotationAffiliateOperationsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.priceQuotationAffiliateOperationsData =
        data.priceQuotationAffiliateOperationsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
