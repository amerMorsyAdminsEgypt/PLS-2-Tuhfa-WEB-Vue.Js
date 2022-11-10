import ExpenseGeneralModel from "./ExpenseGeneralModel";
import Expense from "./Expense";
import ExpensesFilter from "./ExpensesFilter";

export default class Expenses extends ExpenseGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.expensesData = [];
    this.expense = new Expense();
    this.filterData = new ExpensesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.expensesData = data.expensesData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
