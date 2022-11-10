import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class RevenuesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.revenuesTypeInfoDataInclude = true;
    this.accountInfoDataInclude = true;
    this.paymentMethodInfoDataInclude = true;
    this.refundUserInfoDataInclude = true;
    this.refundPaymentMethodInfoDataInclude = true;

    this.revenuesTypeToken = "";
    this.accountToken = "";
    this.paymentMethodToken = "";
    this.refundUserToken = "";
    this.refundPaymentMethodToken = "";
    this.revenuesRefundTypeToken = "";
    this.revenuesMoneyValueFrom = "";
    this.revenuesMoneyValueTo = "";
    this.activationTypeTokens =
      store.getters.generalSetting.revenues.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
