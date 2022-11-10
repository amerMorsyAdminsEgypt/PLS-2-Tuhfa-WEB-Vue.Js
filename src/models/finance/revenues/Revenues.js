import RevenueGeneralModel from "./RevenueGeneralModel";
import Revenue from "./Revenue";
import RevenuesFilter from "./RevenuesFilter";

export default class Revenues extends RevenueGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.revenuesData = [];
    this.revenue = new Revenue();
    this.filterData = new RevenuesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.revenuesData = data.revenuesData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
