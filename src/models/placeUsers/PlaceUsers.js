import PlaceUser from "./PlaceUser";
import PlaceUsersFilter from "./PlaceUsersFilter";

export default class PlaceUsers {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.placeUsersData = [];
    this.placeUser = new PlaceUser();
    this.filterData = new PlaceUsersFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.placeUsersData = data.placeUsersData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
