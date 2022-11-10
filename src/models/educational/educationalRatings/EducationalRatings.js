import GeneralModel from "./../../general/GeneralModel";
import EducationalRating from "./EducationalRating";
import EducationalRatingsFilter from "./EducationalRatingsFilter";

export default class EducationalRatings extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalRatingsData = [];
    this.educationalRating = new EducationalRating();
    this.filterData = new EducationalRatingsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalRatingsData = data.educationalRatingsData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
