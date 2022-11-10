import InstallmentGeneralModel from "./InstallmentGeneralModel";
import Installment from "./Installment";
import InstallmentsFilter from "./InstallmentsFilter";

export default class Installments extends InstallmentGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.installmentsData = [];
    this.installment = new Installment();
    this.filterData = new InstallmentsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.installmentsData = data.installmentsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
