import GeneralModel from "./../../general/GeneralModel";
import UserOperation from "./UserOperation";
import UserOperationsFilter from "./UserOperationsFilter";
import defaultImg from "@/assets/images/UserOperations.svg";

export default class UserOperations extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userOperationsData = [];
    this.userOperation = new UserOperation();
    this.filterData = new UserOperationsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userOperationsData = data.userOperationsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
