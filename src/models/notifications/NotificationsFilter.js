import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class NotificationsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.notifications.activationTypeTokens || [];

    this.statusOpen = true;
    this.statusRead = true;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.statusOpen = data.statusOpen ?? true;
    } else {
      this.setInitialValue();
    }
  }
}
