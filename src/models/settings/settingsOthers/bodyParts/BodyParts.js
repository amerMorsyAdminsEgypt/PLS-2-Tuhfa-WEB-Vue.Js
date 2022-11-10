import GeneralModel from "./../../../general/GeneralModel";
import BodyPart from "./BodyPart";
import BodyPartsFilter from "./BodyPartsFilter";

export default class BodyParts extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.bodyPartsData = [];
    this.bodyPart = new BodyPart();
    this.filterData = new BodyPartsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.bodyPartsData = data.bodyPartsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
