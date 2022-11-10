import GeneralModelResponse from "./../../general/GeneralModelResponse";
import PriceQuotationJobOrderStatistics from "./PriceQuotationJobOrderStatistics";

export default class PriceQuotationDetailGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.priceQuotationJobOrderStatistics =
      new PriceQuotationJobOrderStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.priceQuotationJobOrderStatistics.fillPriceQuotationJobOrderStatisticsData(
        data.priceQuotationJobOrderStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
