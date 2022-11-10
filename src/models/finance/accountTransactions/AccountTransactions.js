import AccountTransactionGeneralModel from "./AccountTransactionGeneralModel";
import AccountTransaction from "./AccountTransaction";
import AccountTransactionsFilter from "./AccountTransactionsFilter";

export default class AccountTransactions extends AccountTransactionGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.accountTransactionsData = [];
    this.accountTransaction = new AccountTransaction();
    this.filterData = new AccountTransactionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.accountTransactionsData = data.accountTransactionsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
