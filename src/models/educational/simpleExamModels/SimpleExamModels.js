import GeneralModel from "./../../general/GeneralModel";
import SimpleExamModel from "./SimpleExamModel";
import SimpleExamModelModel from "./SimpleExamModelModel";
import SimpleExamModelsFilter from "./SimpleExamModelsFilter";

export default class SimpleExamModels extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.simpleExamModelsData = [];
    this.simpleExamModel = new SimpleExamModel();
    this.simpleExamModelModel = new SimpleExamModelModel();
    this.filterData = new SimpleExamModelsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.simpleExamModelsData = data.simpleExamModelsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
