import GeneralModel from "./../../general/GeneralModel";
import Discussion from "./Discussion";
import DiscussionsFilter from "./DiscussionsFilter";

export default class Discussions extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.discussionsData = [];
    this.discussion = new Discussion();
    this.filterData = new DiscussionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.discussionsData = data.discussionsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
