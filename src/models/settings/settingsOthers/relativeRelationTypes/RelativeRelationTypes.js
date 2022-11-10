import GeneralModel from "./../../../general/GeneralModel";
import RelativeRelationType from "./RelativeRelationType";
import RelativeRelationTypesFilter from "./RelativeRelationTypesFilter";

export default class RelativeRelationTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.relativeRelationTypesData = [];
    this.relativeRelationType = new RelativeRelationType();
    this.filterData = new RelativeRelationTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.relativeRelationTypesData = data.relativeRelationTypesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
