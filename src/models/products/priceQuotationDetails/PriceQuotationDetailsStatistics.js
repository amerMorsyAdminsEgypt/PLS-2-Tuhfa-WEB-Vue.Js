export default class PriceQuotationsStatistics {
  constructor() {
    this.setPriceQuotationsStatisticsInitialValue();
  }
  setPriceQuotationsStatisticsInitialValue() {
    this.totalCount = 0;
    this.totalNewlyWanted = 0;
    this.newlyWantedPercentage = 0;
    this.newlyWantedPercentageText = "";
    this.totalWorkProgres = 0;
    this.workProgresPercentage = 0;
    this.workProgresPercentageText = "";
    this.totalReviewedByCustomer = 0;
    this.reviewedByCustomerPercentage = 0;
    this.reviewedByCustomerPercentageText = "";
    this.totalRejectedByCustomer = 0;
    this.rejectedByCustomerPercentage = 0;
    this.rejectedByCustomerPercentageText = "";
    this.totalCanceledbyCustomer = 0;
    this.canceledbyCustomerPercentage = 0;
    this.canceledbyCustomerPercentageText = "";
    this.totalWaitingForQuotes = 0;
    this.waitingForQuotesPercentage = 0;
    this.waitingForQuotesPercentageText = "";
    this.totalInJobOrder = 0;
    this.inJobOrderPercentage = 0;
    this.inJobOrderPercentageText = "";
    this.totalFinishJobOrderNotCustomerReceive = 0;
    this.finishJobOrderNotCustomerReceivePercentage = 0;
    this.finishJobOrderNotCustomerReceivePercentageText = "";
    this.totalFinishJobOrderCustomerReceive = 0;
    this.finishJobOrderCustomerReceivePercentage = 0;
    this.finishJobOrderCustomerReceivePercentageText = "";
  }
  fillPriceQuotationsStatisticsData(data) {
    if (data) {
      this.totalCount = data.totalCount ?? 0;
      this.totalNewlyWanted = data.totalNewlyWanted ?? 0;
      this.newlyWantedPercentage = data.newlyWantedPercentage ?? 0;
      this.newlyWantedPercentageText = data.newlyWantedPercentageText ?? "";
      this.totalWorkProgres = data.totalWorkProgres ?? 0;
      this.workProgresPercentage = data.workProgresPercentage ?? 0;
      this.workProgresPercentageText = data.workProgresPercentageText ?? "";
      this.totalReviewedByCustomer = data.totalReviewedByCustomer ?? 0;
      this.reviewedByCustomerPercentage =
        data.reviewedByCustomerPercentage ?? 0;
      this.reviewedByCustomerPercentageText =
        data.reviewedByCustomerPercentageText ?? "";
      this.totalRejectedByCustomer = data.totalRejectedByCustomer ?? 0;
      this.rejectedByCustomerPercentage =
        data.rejectedByCustomerPercentage ?? 0;
      this.rejectedByCustomerPercentageText =
        data.rejectedByCustomerPercentageText ?? "";
      this.totalCanceledbyCustomer = data.totalCanceledbyCustomer ?? 0;
      this.canceledbyCustomerPercentage =
        data.canceledbyCustomerPercentage ?? 0;
      this.canceledbyCustomerPercentageText =
        data.canceledbyCustomerPercentageText ?? "";
      this.totalWaitingForQuotes = data.totalWaitingForQuotes ?? 0;
      this.waitingForQuotesPercentage = data.waitingForQuotesPercentage ?? 0;
      this.waitingForQuotesPercentageText =
        data.waitingForQuotesPercentageText ?? "";
      this.totalInJobOrder = data.totalInJobOrder ?? 0;
      this.inJobOrderPercentage = data.inJobOrderPercentage ?? 0;
      this.inJobOrderPercentageText = data.inJobOrderPercentageText ?? "";
      this.totalFinishJobOrderNotCustomerReceive =
        data.totalFinishJobOrderNotCustomerReceive ?? 0;
      this.finishJobOrderNotCustomerReceivePercentage =
        data.finishJobOrderNotCustomerReceivePercentage ?? 0;
      this.finishJobOrderNotCustomerReceivePercentageText =
        data.finishJobOrderNotCustomerReceivePercentageText ?? "";
      this.totalFinishJobOrderCustomerReceive =
        data.totalFinishJobOrderCustomerReceive ?? 0;
      this.finishJobOrderCustomerReceivePercentage =
        data.finishJobOrderCustomerReceivePercentage ?? 0;
      this.finishJobOrderCustomerReceivePercentageText =
        data.finishJobOrderCustomerReceivePercentageText ?? "";
    } else {
      this.setPriceQuotationsStatisticsInitialValue();
    }
  }
}
