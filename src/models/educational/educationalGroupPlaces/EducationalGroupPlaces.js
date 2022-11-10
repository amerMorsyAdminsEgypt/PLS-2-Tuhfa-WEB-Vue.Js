import GeneralModel from "./../../general/GeneralModel";
import EducationalGroupPlace from "./EducationalGroupPlace";
import EducationalGroupPlacesFilter from "./EducationalGroupPlacesFilter";

export default class EducationalGroupPlaces extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalGroupPlacesData = [];
    this.educationalGroupPlace = new EducationalGroupPlace();
    this.filterData = new EducationalGroupPlacesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalGroupPlacesData = data.educationalGroupPlaces ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
