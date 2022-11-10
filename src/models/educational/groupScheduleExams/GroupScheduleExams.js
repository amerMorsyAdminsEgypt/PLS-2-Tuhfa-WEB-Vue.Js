import GeneralModel from "./../../general/GeneralModel";
import GroupScheduleExam from "./GroupScheduleExam";
import GroupScheduleExamReport from "./GroupScheduleExamReport";
import GroupScheduleExamsFilter from "./GroupScheduleExamsFilter";

export default class GroupScheduleExams extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.groupScheduleExamsData = [];
    this.groupScheduleExam = new GroupScheduleExam();
    this.groupScheduleExamReport = new GroupScheduleExamReport();
    this.filterData = new GroupScheduleExamsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.groupScheduleExamsData = data.groupScheduleExamsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
