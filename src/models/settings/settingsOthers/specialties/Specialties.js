import GeneralModel from "./../../../general/GeneralModel";
import Specialty from "./Specialty";
import SpecialtiesFilter from "./SpecialtiesFilter";

export default class Specialties extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.specialtiesData = [];
    this.specialty = new Specialty();
    this.filterData = new SpecialtiesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.specialtiesData = data.specialtiesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
