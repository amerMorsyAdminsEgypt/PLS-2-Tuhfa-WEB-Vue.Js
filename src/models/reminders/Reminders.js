import ActivationStatistics from "./../../models/general/ActivationStatistics";
import Reminder from "./Reminder";
import ReminderPlan from "./../settings/settingsOthers/reminderPlans/ReminderPlan";
import RemindersFilter from "./RemindersFilter";

export default class Reminders {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.reminderPlan = new ReminderPlan();
    this.activationStatistics = new ActivationStatistics();
    this.remindersData = [];
    this.reminder = new Reminder();
    this.filterData = new RemindersFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.reminderPlan.fillData(data.reminderPlan);
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.remindersData = data.remindersData || [];
    } else {
      this.setInitialValue();
    }
  }
}
