import GeneralModel from "./../../general/GeneralModel";
import EducationalCategory from "./EducationalCategory";
import EducationalCategoriesFilter from "./EducationalCategoriesFilter";

export default class EducationalCategories extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalCategoriesData = [];
    this.educationalCategory = new EducationalCategory();
    this.filterData = new EducationalCategoriesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalCategoriesData = data.educationalCategoriesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
