import PaginationData from "@/models/general/PaginationData";
import City from "./City";
import CitiesFilter from "./CitiesFilter";

export default class Cities {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.citiesData = [];
    this.city = new City();
    this.filterData = new CitiesFilter();
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      if (data.pagination) {
        data.pagination.listSort = data.listSort;
      }
      this.pagination.fillPaginationData(data.pagination);
      this.citiesData = data.citiesData;
    } else {
      this.setInitialValue();
    }
  }
}
