import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalCategoriesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.educationalCategories.activationTypeTokens ||
      [];
    this.educationalCategoryToken = "";
    this.gradingPlanToken = "";
    this.parentEducationalCategoryToken = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.gradingPlanDataInclude = false;
    this.systemComponentDataInclude = false;
    this.systemComponentsHierarchyDataInclude = false;
    this.parentEducationalCategoryDataInclude = false;
    this.getOnlyParentEducationalCategories = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.gradingPlanToken = data.gradingPlanToken || "";
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken || "";
      this.systemComponentToken = data.systemComponentToken || "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken || "";
      this.gradingPlanDataInclude = data.gradingPlanDataInclude || false;
      this.systemComponentDataInclude =
        data.systemComponentDataInclude || false;
      this.systemComponentsHierarchyDataInclude =
        data.systemComponentsHierarchyDataInclude || false;
      this.parentEducationalCategoryDataInclude =
        data.parentEducationalCategoryDataInclude || false;
      this.getOnlyParentEducationalCategories =
        data.getOnlyParentEducationalCategories || false;
    } else {
      this.setInitialValue();
    }
  }
}
