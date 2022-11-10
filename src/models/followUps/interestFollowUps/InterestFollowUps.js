import GeneralModel from "./../../general/GeneralModel";
import InterestFollowUp from "./InterestFollowUp";
import InterestFollowUpsFilter from "./InterestFollowUpsFilter";

export default class InterestFollowUps extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.interestFollowUpsData = [];
    this.interestFollowUp = new InterestFollowUp();
    this.filterData = new InterestFollowUpsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.interestFollowUpsData = data.interestFollowUpsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
