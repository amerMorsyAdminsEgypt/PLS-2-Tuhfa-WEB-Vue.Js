import PaginationData from "@/models/general/PaginationData";
import Job from "./Job";
import JobsFilter from "./JobsFilter";

export default class Jobs {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.jobsData = [];
    this.job = new Job();
    this.filterData = new JobsFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      if (data.pagination) {
        data.pagination.listSort = data.listSort;
      }
      this.pagination.fillPaginationData(data.pagination);
      this.jobsData = data.jobsData;
    } else {
      this.setInitialValue();
    }
  }
}
