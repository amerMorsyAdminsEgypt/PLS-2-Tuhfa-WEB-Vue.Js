import CountedServiceTransactionGeneralModel from "./CountedServiceTransactionGeneralModel";
import CountedServiceTransaction from "./CountedServiceTransaction";
import CountedServiceTransactionsFilter from "./CountedServiceTransactionsFilter";

export default class CountedServiceTransactions extends CountedServiceTransactionGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.countedServiceTransactionsData = [];
    this.countedServiceTransaction = new CountedServiceTransaction();
    this.filterData = new CountedServiceTransactionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.countedServiceTransactionsData =
        data.countedServiceTransactionsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
