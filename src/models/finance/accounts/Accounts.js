import AccountGeneralModel from "./AccountGeneralModel";
import Account from "./Account";
import AccountsFilter from "./AccountsFilter";

export default class Accounts extends AccountGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.accountsData = [];
    this.account = new Account();
    this.filterData = new AccountsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.accountsData = data.accountsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
