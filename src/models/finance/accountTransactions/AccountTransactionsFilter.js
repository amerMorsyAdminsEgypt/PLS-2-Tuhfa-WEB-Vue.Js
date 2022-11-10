import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class AccountTransactionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.accountTransactionTypeToken = "";
    this.accountToken = "";
    this.paymentMethodToken = "";
    this.sendTo = "";
    this.token = "";

    this.installmentPaymentToken = "";
    this.revenuesToken = "";
    this.expensesTypeToken = "";
    this.expensesToken = "";

    this.accountInfoDataInclude = true;
    this.expensesInfoDataInclude = true;
    this.revenuesInfoDataInclude = true;
    this.paymentMethodInfoDataInclude = true;
    try {
      this.activationTypeTokens =
        store.getters.generalSetting.accountTransactions.activationTypeTokens;
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
