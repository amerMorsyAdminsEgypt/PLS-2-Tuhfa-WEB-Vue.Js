import GeneralModel from "./../../../general/GeneralModel";
import InsuranceCompany from "./InsuranceCompany";
import InsuranceCompaniesFilter from "./InsuranceCompaniesFilter";

export default class InsuranceCompanies extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.insuranceCompaniesData = [];
    this.insuranceCompany = new InsuranceCompany();
    this.filterData = new InsuranceCompaniesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.insuranceCompaniesData = data.insuranceCompaniesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
