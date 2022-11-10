import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class InstallmentPaymentsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.debtUserInfoDataInclude = true;
    this.installmentScheduleTimeInfoDataInclude = true;
    this.accountInfoDataInclude = true;
    this.paymentMethodInfoDataInclude = true;
    this.refundUserInfoDataInclude = true;
    this.paymentUserInfoDataInclude = true;
    this.refundPaymentMethodInfoDataInclude = true;

    this.debtUserToken = "";
    this.paymentUserToken = "";
    this.installmentsToken = "";
    this.refundTypeToken = "";
    this.accountToken = "";
    this.paymentMethodToken = "";
    this.refundUserToken = "";
    this.refundPaymentMethodToken = "";
    this.installmentsRefundTypeToken = "";
    this.installmentsMoneyValueFrom = "";
    this.installmentsMoneyValueTo = "";

    this.activationTypeTokens =
      store.getters.generalSetting.installmentPayments.activationTypeTokens ??
      [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
