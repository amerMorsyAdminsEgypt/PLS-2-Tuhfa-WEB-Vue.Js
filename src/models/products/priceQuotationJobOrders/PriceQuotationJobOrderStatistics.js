export default class PriceQuotationJobOrderStatistics {
  constructor() {
    this.setPriceQuotationJobOrderStatisticsInitialValue();
  }
  setPriceQuotationJobOrderStatisticsInitialValue() {
    this.totalCount = 0;
    this.totalNewlyWanted = 0;
    this.newlyWantedPercentage = 0;
    this.newlyWantedPercentageText = "";
    this.totalWorkProgress = 0;
    this.workProgressPercentage = 0;
    this.workProgressPercentageText = "";
    this.totalFinishNotCustomerReceived = 0;
    this.finishNotCustomerReceivedPercentage = 0;
    this.finishNotCustomerReceivedPercentageText = "";
    this.totalFinishCustomerReceived = 0;
    this.finishCustomerReceivedPercentage = 0;
    this.finishCustomerReceivedPercentageText = "";
    this.totalCanceled = 0;
    this.canceledPercentage = 0;
    this.canceledPercentageText = "";
  }
  fillPriceQuotationJobOrderStatisticsData(data) {
    if (data) {
      this.totalCount = data.totalCount ?? 0;
      this.totalNewlyWanted = data.totalNewlyWanted ?? 0;
      this.newlyWantedPercentage = data.newlyWantedPercentage ?? 0;
      this.newlyWantedPercentageText = data.newlyWantedPercentageText ?? "";
      this.totalWorkProgress = data.totalWorkProgress ?? 0;
      this.workProgressPercentage = data.workProgressPercentage ?? 0;
      this.workProgressPercentageText = data.workProgressPercentageText ?? "";
      this.totalFinishNotCustomerReceived =
        data.totalFinishNotCustomerReceived ?? 0;
      this.finishNotCustomerReceivedPercentage =
        data.finishNotCustomerReceivedPercentage ?? 0;
      this.finishNotCustomerReceivedPercentageText =
        data.finishNotCustomerReceivedPercentageText ?? "";
      this.totalFinishCustomerReceived = data.totalFinishCustomerReceived ?? 0;
      this.finishCustomerReceivedPercentage =
        data.finishCustomerReceivedPercentage ?? 0;
      this.finishCustomerReceivedPercentageText =
        data.finishCustomerReceivedPercentageText ?? "";
      this.totalCanceled = data.totalCanceled ?? 0;
      this.canceledPercentage = data.canceledPercentage ?? 0;
      this.canceledPercentageText = data.canceledPercentageText ?? "";
    } else {
      this.setPriceQuotationJobOrderStatisticsInitialValue();
    }
  }
}
