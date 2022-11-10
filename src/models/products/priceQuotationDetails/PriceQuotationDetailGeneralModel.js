import GeneralModelResponse from "./../../general/GeneralModelResponse";
import PriceQuotationDetailsStatistics from "./PriceQuotationDetailsStatistics";

export default class PriceQuotationDetailGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.priceQuotationDetailsStatistics =
      new PriceQuotationDetailsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.priceQuotationDetailsStatistics.fillPriceQuotationsStatisticsData(
        data.priceQuotationDetailsStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
