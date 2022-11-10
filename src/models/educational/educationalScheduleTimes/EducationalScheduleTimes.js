import GeneralModel from "./../../general/GeneralModel";
import EducationalScheduleTime from "./EducationalScheduleTime";
import EducationalScheduleTimeModel from "./EducationalScheduleTimeModel";
import EducationalScheduleTimesFilter from "./EducationalScheduleTimesFilter";
import EducationalScheduleTimesFilterEnquiry from "./EducationalScheduleTimesFilterEnquiry";
import EducationalScheduleTimesFilterReport from "./EducationalScheduleTimesFilterReport";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";

export default class EducationalScheduleTimes extends GeneralModel {
  constructor(filterReportType = FILTER_REPORT_TYPES.Default) {
    super();
    this.setInitialValue(filterReportType);
  }
  setInitialValue(filterReportType = FILTER_REPORT_TYPES.Default) {
    this.setGeneralModelInitialValue();
    this.educationalScheduleTimesData = [];
    this.educationalScheduleTime = new EducationalScheduleTime();
    this.educationalScheduleTimeModel = new EducationalScheduleTimeModel();
    this.filterData = new EducationalScheduleTimesFilter();
    this.filterReport = new EducationalScheduleTimesFilterReport(
      filterReportType
    );
    this.filterEnquiry = new EducationalScheduleTimesFilterEnquiry();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalScheduleTimesData =
        data.educationalScheduleTimesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
