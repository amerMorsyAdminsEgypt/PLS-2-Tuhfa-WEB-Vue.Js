import GeneralModel from "./../general/GeneralModel";
import SharedMediaFolder from "./SharedMediaFolder";
import SharedMediaFoldersFilter from "./SharedMediaFoldersFilter";

export default class SharedMediaFolders extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.sharedMediaFoldersData = [];
    this.sharedMediaFolder = new SharedMediaFolder();
    this.filterData = new SharedMediaFoldersFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.sharedMediaFoldersData = data.sharedMediaFoldersData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
