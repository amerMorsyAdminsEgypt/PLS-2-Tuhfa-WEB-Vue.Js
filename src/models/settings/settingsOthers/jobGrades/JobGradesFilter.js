import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class JobGradesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.jobGradeToken = "";
    this.systemComponentToken = "";
    this.systemComponentHierarchyToken = "";
    this.parentJobGradeToken = "";
    this.getOnlyParentJobGrades = false;
    this.getOnlyChildJobGrades = false;
    this.systemComponentDataInclude = true;
    this.systemComponentsHierarchyDataInclude = true;
    this.parentJobGradeDataInclude = true;

    this.activationTypeTokens =
      store.getters.generalSetting.jobGrades.activationTypeTokens || [];
  }
  fillData(data) {
    this.fillFilterData(data);
  }
}
