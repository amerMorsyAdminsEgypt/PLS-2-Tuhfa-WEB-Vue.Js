import Notification from "./Notification";
import NotificationsFilter from "./NotificationsFilter";

export default class Notifications {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.notificationsData = [];
    this.notification = new Notification();
    this.filterData = new NotificationsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.notificationsData = data.notificationsData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
