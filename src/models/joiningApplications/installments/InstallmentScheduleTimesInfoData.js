export default class InstallmentScheduleTimesInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.installmentScheduleTimeToken = "";
    this.fullCode = "";
    this.installmentBatchTypeToken = "";
    this.installmentBatchTypeNameCurrent = "";
    this.installmentMoney = "";
    this.installmentMoneyWithCurrency = "";
    this.installmentMoneyText = "";
    this.paidMoney = "";
    this.paidMoneyWithCurrency = "";
    this.paidMoneyText = "";
    this.remainderMoney = "";
    this.remainderMoneyWithCurrency = "";
    this.remainderMoneyText = "";
    this.finishPercentage = "";
    this.finishPercentageText = "";
    this.installmentDateTime = "";
    this.installmentDateTimeCustomized = "";
    this.installmentDate = "";
    this.installmentTime = "";
    this.installmentNotes = "";
  }
  fillData(data) {
    if (data) {
      this.installmentScheduleTimeToken =
        data.installmentScheduleTimeToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.installmentBatchTypeToken = data.installmentBatchTypeToken ?? "";
      this.installmentBatchTypeNameCurrent =
        data.installmentBatchTypeNameCurrent ?? "";
      this.installmentMoney = data.installmentMoney ?? "";
      this.installmentMoneyWithCurrency =
        data.installmentMoneyWithCurrency ?? "";
      this.installmentMoneyText = data.installmentMoneyText ?? "";
      this.paidMoney = data.paidMoney ?? "";
      this.paidMoneyWithCurrency = data.paidMoneyWithCurrency ?? "";
      this.paidMoneyText = data.paidMoneyText ?? "";
      this.remainderMoney = data.remainderMoney ?? "";
      this.remainderMoneyWithCurrency = data.remainderMoneyWithCurrency ?? "";
      this.remainderMoneyText = data.remainderMoneyText ?? "";
      this.finishPercentage = data.finishPercentage ?? "";
      this.finishPercentageText = data.finishPercentageText ?? "";
      this.installmentDateTime = data.installmentDateTime ?? "";
      this.installmentDateTimeCustomized =
        data.installmentDateTimeCustomized ?? "";
      this.installmentDate = data.installmentDate ?? "";
      this.installmentTime = data.installmentTime ?? "";
      this.installmentNotes = data.installmentNotes ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
