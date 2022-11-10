import GeneralModelResponse from "./../general/GeneralModelResponse";
import SharedMediaWithSpaceStorageMedia from "./SharedMediaWithSpaceStorageMedia";
import SharedMediaWithSpaceStorageMediasFilter from "./SharedMediaWithSpaceStorageMediasFilter";

export default class SharedMediaWithSpaceStorageMedias extends GeneralModelResponse {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.sharedMediaWithSpaceStorageMediasData = [];
    this.sharedMediaWithSpaceStorageMedia =
      new SharedMediaWithSpaceStorageMedia();
    this.filterData = new SharedMediaWithSpaceStorageMediasFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.sharedMediaWithSpaceStorageMediasData =
        data.sharedMediaWithSpaceStorageMediaData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
