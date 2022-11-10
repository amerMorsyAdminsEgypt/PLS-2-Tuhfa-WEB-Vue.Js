import GeneralModel from "./../../../general/GeneralModel";
import ReminderPlan from "./ReminderPlan";
import ReminderPlansFilter from "./ReminderPlansFilter";

export default class ReminderPlans extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.reminderPlansData = [];
    this.reminderPlan = new ReminderPlan();
    this.filterData = new ReminderPlansFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.reminderPlansData = data.reminderPlansData || [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
