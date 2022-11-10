import GeneralModel from "./../../general/GeneralModel";
import StudentScheduleExamTime from "./StudentScheduleExamTime";
import StudentScheduleExamTimesFilter from "./StudentScheduleExamTimesFilter";

export default class StudentScheduleExamTimes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.studentScheduleExamTimesData = [];
    this.studentScheduleExamTime = new StudentScheduleExamTime();
    this.filterData = new StudentScheduleExamTimesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.studentScheduleExamTimesData =
        data.studentScheduleExamTimesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
