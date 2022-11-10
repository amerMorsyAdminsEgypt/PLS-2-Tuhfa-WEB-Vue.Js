import GeneralModelResponse from "./../../general/GeneralModelResponse";
import EducationalGroupStatistics from "./EducationalGroupStatistics";

export default class EducationalGroupGeneralMode extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.educationalGroupStatistics = new EducationalGroupStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.educationalGroupStatistics.fillEducationalGroupStatisticsData(
        data.educationalGroupStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
