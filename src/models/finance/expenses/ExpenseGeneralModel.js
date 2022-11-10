import GeneralModelResponse from "./../../general/GeneralModelResponse";
import ExpensesStatistics from "./ExpensesStatistics";

export default class ExpenseGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.expensesStatistics = new ExpensesStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.expensesStatistics.fillExpensesStatisticsData(
        data.expensesStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
