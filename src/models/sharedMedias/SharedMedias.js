import SharedMediaGeneralModel from "./SharedMediaGeneralModel";
import SharedMedia from "./SharedMedia";
import SharedMediasFilter from "./SharedMediasFilter";

export default class SharedMedias extends SharedMediaGeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.sharedMediasData = [];
    this.sharedMedia = new SharedMedia();
    this.filterData = new SharedMediasFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.sharedMediasData = data.sharedMediaData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
