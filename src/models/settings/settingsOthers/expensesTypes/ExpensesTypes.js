import GeneralModel from "./../../../general/GeneralModel";
import ExpensesType from "./ExpensesType";
import ExpensesTypesFilter from "./ExpensesTypesFilter";

export default class ExpensesTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.expensesTypesData = [];
    this.expensesType = new ExpensesType();
    this.filterData = new ExpensesTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.expensesTypesData = data.expensesTypesData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
