import GeneralModel from "./../../../general/GeneralModel";
import Country from "./Country";
import CountriesFilter from "./CountriesFilter";

export default class Countries extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.countriesData = [];
    this.country = new Country();
    this.filterData = new CountriesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.countriesData = data.countriesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
