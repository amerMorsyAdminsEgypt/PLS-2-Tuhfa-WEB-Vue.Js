import GeneralModelResponse from "./../general/GeneralModelResponse";
import StorageSpaceMediaStatistics from "./StorageSpaceMediaStatistics";

export default class StorageSpaceMediaGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.storageSpaceMediaStatistics = new StorageSpaceMediaStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.storageSpaceMediaStatistics.fillStorageSpaceMediaStatisticsData(
        data.storageSpaceMediaStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
