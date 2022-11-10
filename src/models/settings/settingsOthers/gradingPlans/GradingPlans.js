import GeneralModel from "./../../../general/GeneralModel";
import GradingPlan from "./GradingPlan";
import GradingPlansFilter from "./GradingPlansFilter";

export default class GradingPlans extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.gradingPlansData = [];
    this.gradingPlan = new GradingPlan();
    this.filterData = new GradingPlansFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.gradingPlansData = data.gradingPlansData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
