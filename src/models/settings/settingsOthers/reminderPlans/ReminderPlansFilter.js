import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class ReminderPlansFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.reminderPlanDetailsDataInclude = true;
    this.priorityTypeInfoBeforeTimeDataInclude = true;
    this.priorityTypeInfoAfterTimeDataInclude = true;
    this.priorityTypeInfoOnTimeDataInclude = true;

    this.priorityTypeBeforeTimeToken = "";
    this.priorityTypeAfterTimeToken = "";
    this.priorityTypeOnTimeToken = "";

    this.activationTypeTokens =
      store.getters.generalSetting.reminderPlans.activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.priorityTypeBeforeTimeToken = data.priorityTypeBeforeTimeToken || "";
      this.priorityTypeAfterTimeToken = data.priorityTypeAfterTimeToken || "";
      this.priorityTypeOnTimeToken = data.priorityTypeOnTimeToken || "";
    } else {
      this.setInitialValue();
    }
  }
}
