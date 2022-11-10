import PaginationData from "@/models/general/PaginationData";
import District from "./District";
import DistrictsFilter from "./DistrictsFilter";

export default class Districts {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.districtsData = [];
    this.district = new District();
    this.filterData = new DistrictsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      if (data.pagination) {
        data.pagination.listSort = data.listSort;
      }
      this.pagination.fillPaginationData(data.pagination);
      this.districtsData = data.districtsData;
    } else {
      this.setInitialValue();
    }
  }
}
