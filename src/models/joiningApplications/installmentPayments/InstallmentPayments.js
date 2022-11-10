import InstallmentPaymentGeneralModel from "./InstallmentPaymentGeneralModel";
import InstallmentPayment from "./InstallmentPayment";
import InstallmentPaymentsFilter from "./InstallmentPaymentsFilter";

export default class InstallmentPayments extends InstallmentPaymentGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.installmentPaymentsData = [];
    this.installmentPayment = new InstallmentPayment();
    this.filterData = new InstallmentPaymentsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.installmentPaymentsData = data.installmentPaymentsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
