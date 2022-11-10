import PaginationData from "@/models/general/PaginationData";
import Sector from "./Sector";
import SectorsFilter from "./SectorsFilter";

export default class Sectors {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.sectorsData = [];
    this.sector = new Sector();
    this.filterData = new SectorsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      if (data.pagination) {
        data.pagination.listSort = data.listSort;
      }
      this.pagination.fillPaginationData(data.pagination);
      this.sectorsData = data.sectorsData;
    } else {
      this.setInitialValue();
    }
  }
}
