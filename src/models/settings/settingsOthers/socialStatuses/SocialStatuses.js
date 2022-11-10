import GeneralModel from "./../../../general/GeneralModel";
import SocialStatuse from "./SocialStatuse";
import SocialStatusesFilter from "./SocialStatusesFilter";

export default class SocialStatuses extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.socialStatusesData = [];
    this.socialStatuse = new SocialStatuse();
    this.filterData = new SocialStatusesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.socialStatusesData = data.socialStatusesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
