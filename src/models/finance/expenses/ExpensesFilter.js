import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class ExpensesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.expensesTypeInfoDataInclude = true;
    this.accountInfoDataInclude = true;
    this.paymentMethodInfoDataInclude = true;
    this.refundUserInfoDataInclude = true;
    this.refundPaymentMethodInfoDataInclude = true;

    this.expensesTypeToken = "";
    this.accountToken = "";
    this.paymentMethodToken = "";
    this.refundUserToken = "";
    this.refundPaymentMethodToken = "";
    this.expensesRefundTypeToken = "";
    this.expensesMoneyValueFrom = "";
    this.expensesMoneyValueTo = "";
    this.activationTypeTokens =
      store.getters.generalSetting.expenses.activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
    } else {
      this.setInitialValue();
    }
  }
}
