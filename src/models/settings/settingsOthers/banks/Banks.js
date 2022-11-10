import GeneralModel from "./../../../general/GeneralModel";
import Bank from "./Bank";
import BanksFilter from "./BanksFilter";

export default class Banks extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.banksData = [];
    this.bank = new Bank();
    this.filterData = new BanksFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.banksData = data.banksData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
