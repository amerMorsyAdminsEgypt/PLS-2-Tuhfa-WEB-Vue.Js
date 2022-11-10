import ActivationStatistics from "./../../general/ActivationStatistics";

export default class DebtsStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setServiceEntitlementStatisticsInitialValue();
  }
  setServiceEntitlementStatisticsInitialValue() {
    this.setInitialValue();
    this.totalAccrualServiceEntitlement = "";
    this.totalAccuralServiceEntitlementWithCurrency = "";
    this.totalAccrualServiceEntitlementMoneyText = "";
    this.totalRefundServiceEntitlement = "";
    this.totalRefundServiceEntitlementWithCurrency = "";
    this.totalRefundServiceEntitlementMoneyText = "";
    this.totalDifferenceServiceEntitlement = "";
    this.totalDifferenceServiceEntitlementWithCurrency = "";
    this.totalDifferenceServiceEntitlementMoneyText = "";
    this.accrualServiceEntitlementPercentage = "";
    this.accrualServiceEntitlementPercentageText = "";
    this.refundServiceEntitlementPercentage = "";
    this.refundServiceEntitlementPercentageText = "";
    this.differenceServiceEntitlementPercentage = "";
    this.differenceServiceEntitlementPercentageText = "";
    this.countAccrualServiceEntitlement = "";
    this.countRefundServiceEntitlement = "";
  }
  fillServiceEntitlementStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalAccrualServiceEntitlement =
        data.totalAccrualServiceEntitlement ?? "";
      this.totalAccuralServiceEntitlementWithCurrency =
        data.totalAccuralServiceEntitlementWithCurrency ?? "";
      this.totalAccrualServiceEntitlementMoneyText =
        data.totalAccrualServiceEntitlementMoneyText ?? "";
      this.totalRefundServiceEntitlement =
        data.totalRefundServiceEntitlement ?? "";
      this.totalRefundServiceEntitlementWithCurrency =
        data.totalRefundServiceEntitlementWithCurrency ?? "";
      this.totalRefundServiceEntitlementMoneyText =
        data.totalRefundServiceEntitlementMoneyText ?? "";
      this.totalDifferenceServiceEntitlement =
        data.totalDifferenceServiceEntitlement ?? "";
      this.totalDifferenceServiceEntitlementWithCurrency =
        data.totalDifferenceServiceEntitlementWithCurrency ?? "";
      this.totalDifferenceServiceEntitlementMoneyText =
        data.totalDifferenceServiceEntitlementMoneyText ?? "";
      this.accrualServiceEntitlementPercentage =
        data.accrualServiceEntitlementPercentage ?? "";
      this.accrualServiceEntitlementPercentageText =
        data.accrualServiceEntitlementPercentageText ?? "";
      this.refundServiceEntitlementPercentage =
        data.refundServiceEntitlementPercentage ?? "";
      this.refundServiceEntitlementPercentageText =
        data.refundServiceEntitlementPercentageText ?? "";
      this.differenceServiceEntitlementPercentage =
        data.differenceServiceEntitlementPercentage ?? "";
      this.differenceServiceEntitlementPercentageText =
        data.differenceServiceEntitlementPercentageText ?? "";
      this.countAccrualServiceEntitlement =
        data.countAccrualServiceEntitlement ?? "";
      this.countRefundServiceEntitlement =
        data.countRefundServiceEntitlement ?? "";
    } else {
      this.setServiceEntitlementStatisticsInitialValue();
    }
  }
}
