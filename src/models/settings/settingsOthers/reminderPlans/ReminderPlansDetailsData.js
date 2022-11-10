import PriorityTypeInfoData from "./../priorityTypes/PriorityTypeInfoData";

export default class ReminderPlansDetailsData {
  constructor(durationTypeToken) {
    this.setInitialValue(durationTypeToken);
  }
  setInitialValue(durationTypeToken) {
    this.reminderPlanDetailsNameCurrent = "";
    this.reminderPlanDetailsNameEn = "";
    this.reminderPlanDetailsNameAr = "";
    this.reminderPlanDetailsNameUnd = "";
    this.reminderDurationFrom = "";
    this.reminderDurationTo = "";
    this.durationTypeToken = durationTypeToken;
    this.durationTypeNameCurrent = "";
    this.durationTypeNameAr = "";
    this.durationTypeNameEn = "";
    this.durationTypeNameUnd = "";
    this.componentDescriptionCurrent = "";
    this.reminderDescriptionEn = "";
    this.reminderDescriptionAr = "";
    this.reminderDescriptionUnd = "";
    this.priorityTypeToken = "";
    this.priorityTypeInfoData = new PriorityTypeInfoData();
  }
  fillReminderPlansDetailsData(data) {
    if (data) {
      this.reminderPlanDetailsNameCurrent =
        data.reminderPlanDetailsNameCurrent || "";
      this.reminderPlanDetailsNameEn = data.reminderPlanDetailsNameEn || "";
      this.reminderPlanDetailsNameAr = data.reminderPlanDetailsNameAr || "";
      this.reminderPlanDetailsNameUnd = data.reminderPlanDetailsNameUnd || "";
      this.reminderDurationFrom = data.reminderDurationFrom || "";
      this.reminderDurationTo = data.reminderDurationTo || "";
      this.durationTypeToken = data.durationTypeToken || "";
      this.durationTypeNameCurrent = data.durationTypeNameCurrent || "";
      this.durationTypeNameAr = data.durationTypeNameAr || "";
      this.durationTypeNameEn = data.durationTypeNameEn || "";
      this.durationTypeNameUnd = data.durationTypeNameUnd || "";
      this.componentDescriptionCurrent = data.componentDescriptionCurrent || "";
      this.reminderDescriptionEn = data.reminderDescriptionEn || "";
      this.reminderDescriptionAr = data.reminderDescriptionAr || "";
      this.reminderDescriptionUnd = data.reminderDescriptionUnd || "";
      this.priorityTypeToken = data.priorityTypeToken || "";
      this.priorityTypeInfoData.fillPriorityTypeInfoData(
        data.priorityTypeInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
