import PaginationData from "@/models/general/PaginationData";
import Governorate from "./Governorate";
import GovernoratesFilter from "./GovernoratesFilter";

export default class Governorates {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.governoratesData = [];
    this.governorate = new Governorate();
    this.filterData = new GovernoratesFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      if (data.pagination) {
        data.pagination.listSort = data.listSort;
      }
      this.pagination.fillPaginationData(data.pagination);
      this.governoratesData = data.governoratesData;
    } else {
      this.setInitialValue();
    }
  }
}
