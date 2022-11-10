import GeneralModelResponse from "./../../general/GeneralModelResponse";
import PriceQuotationsStatistics from "./PriceQuotationsStatistics";

export default class PriceQuotationGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.priceQuotationStatistics = new PriceQuotationsStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.priceQuotationStatistics.fillPriceQuotationsStatisticsData(
        data.priceQuotationStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
