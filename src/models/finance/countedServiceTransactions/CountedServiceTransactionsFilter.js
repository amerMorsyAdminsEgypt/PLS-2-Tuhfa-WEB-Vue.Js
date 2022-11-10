import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class CountedServiceTransactionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.countedServiceTransactionToken = "";
    this.countedServiceTransactionTypeToken = "";
    this.accountToken = "";
    this.paymentMethodToken = "";
    this.refundUserToken = "";
    this.refundPaymentMethodToken = "";
    this.countedServiceTransactionRefundTypeToken = "";
    this.countedServiceTransactionMoneyValueFrom = "";
    this.countedServiceTransactionMoneyValueTo = "";

    this.countedServiceInfoDataInclude = false;
    this.accountInfoDataInclude = false;
    this.studentUserInfoDataInclude = false;
    this.paymentMethodInfoDataInclude = false;
    this.refundUserInfoDataInclude = false;
    this.refundPaymentMethodInfoDataInclude = false;
    try {
      this.activationTypeTokens =
        store.getters.generalSetting.countedServiceTransactions.activationTypeTokens;
    } catch (error) {
      this.activationTypeTokens = [];
    }
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
