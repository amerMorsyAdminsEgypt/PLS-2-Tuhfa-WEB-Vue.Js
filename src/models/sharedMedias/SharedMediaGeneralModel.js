import GeneralModelResponse from "./../general/GeneralModelResponse";
import StorageSpaceMediaStatistics from "./../storageSpaceMedias/StorageSpaceMediaStatistics";

export default class SharedMediaGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.sharedMediaStatistics = new StorageSpaceMediaStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.sharedMediaStatistics.fillStorageSpaceMediaStatisticsData(
        data.sharedMediaStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
