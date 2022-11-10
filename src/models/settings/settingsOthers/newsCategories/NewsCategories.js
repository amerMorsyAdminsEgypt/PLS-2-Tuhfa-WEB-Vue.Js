import GeneralModel from "./../../../general/GeneralModel";
import NewsCategory from "./NewsCategory";
import NewsCategoriesFilter from "./NewsCategoriesFilter";

export default class NewsCategories extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.newsCategoriesData = [];
    this.newsCategory = new NewsCategory();
    this.filterData = new NewsCategoriesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.newsCategoriesData = data.newsCategoriesData || [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
