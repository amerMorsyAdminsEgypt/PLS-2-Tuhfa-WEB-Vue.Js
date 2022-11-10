import GeneralModelResponse from "./../../general/GeneralModelResponse";
import EducationalJoiningApplicationStatistics from "./EducationalJoiningApplicationStatistics";

export default class EducationalJoiningApplicationGeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.educationalJoiningApplicationsStatistics =
      new EducationalJoiningApplicationStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.educationalJoiningApplicationsStatistics.fillEducationalJoiningApplicationStatisticsData(
        data.educationalJoiningApplicationsStatistics
      );
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}
