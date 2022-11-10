import DebtInfoData from "./../debts/Debt";

export default class InstallmentDebtsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.installmentScheduleToken = "";
    this.debtToken = "";
    this.debtInfoData = new DebtInfoData();
  }
  fillData(data) {
    if (data) {
      this.installmentScheduleToken = data.installmentScheduleToken ?? "";
      this.debtToken = data.debtToken ?? "";
      this.debtInfoData.fillData(data.debtInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
