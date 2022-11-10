import GeneralModel from "./../../../general/GeneralModel";
import PaymentMethod from "./PaymentMethod";
import PaymentMethodsFilter from "./PaymentMethodsFilter";

export default class PaymentMethods extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.paymentMethodsData = [];
    this.paymentMethod = new PaymentMethod();
    this.filterData = new PaymentMethodsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.paymentMethodsData = data.paymentMethodsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
