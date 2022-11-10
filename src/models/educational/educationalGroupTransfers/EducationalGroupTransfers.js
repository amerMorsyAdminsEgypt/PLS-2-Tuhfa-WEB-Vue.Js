import GeneralModel from "./../../general/GeneralModel";
import EducationalGroupTransfer from "./EducationalGroupTransfer";
import EducationalGroupTransfersFilter from "./EducationalGroupTransfersFilter";

export default class EducationalGroupTransfers extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalGroupTransfersData = [];
    this.educationalGroupTransfer = new EducationalGroupTransfer();
    this.filterData = new EducationalGroupTransfersFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalGroupTransfersData =
        data.educationalGroupTransfersData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
