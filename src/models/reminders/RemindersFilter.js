import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class RemindersFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.reminders.activationTypeTokens || [];

    this.educationalCategoryInfoDataInclude = true;
    this.placeInfoDataInclude = true;
    this.userInfoDataInclude = true;
    this.educationalGroupInfoDataInclude = true;

    this.priorityTypeTokens = [];
    this.priorityTypeBeforeTimeStatus = "";
    this.priorityTypeAfterTimeStatus = "";
    this.priorityTypeOnTimeStatus = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalCategoryInfoDataInclude =
        data.educationalCategoryInfoDataInclude ?? true;
      this.placeInfoDataInclude = data.placeInfoDataInclude ?? true;
      this.userInfoDataInclude = data.userInfoDataInclude ?? true;

      this.priorityTypeTokens = data.priorityTypeTokens ?? "";
      this.priorityTypeBeforeTimeStatus =
        data.priorityTypeBeforeTimeStatus ?? "";
      this.priorityTypeAfterTimeStatus = data.priorityTypeAfterTimeStatus ?? "";
      this.priorityTypeOnTimeStatus = data.priorityTypeOnTimeStatus ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
