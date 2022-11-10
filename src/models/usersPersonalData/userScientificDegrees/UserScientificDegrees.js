import GeneralModel from "./../../general/GeneralModel";
import UserScientificDegree from "./UserScientificDegree";
import UserScientificDegreesFilter from "./UserScientificDegreesFilter";
import defaultImg from "@/assets/images/UserScientificDegrees.svg";

export default class UserScientificDegrees extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userScientificDegreesData = [];
    this.userScientificDegree = new UserScientificDegree();
    this.filterData = new UserScientificDegreesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userScientificDegreesData = data.userScientificDegreesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
