import DebtGeneralModel from "./DebtGeneralModel";
import Debt from "./Debt";
import DebtsFilter from "./DebtsFilter";

export default class Debts extends DebtGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.debtsData = [];
    this.debt = new Debt();
    this.filterData = new DebtsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.debtsData = data.debtsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
