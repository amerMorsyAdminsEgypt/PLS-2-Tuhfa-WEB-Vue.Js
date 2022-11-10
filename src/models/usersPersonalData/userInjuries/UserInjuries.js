import GeneralModel from "./../../general/GeneralModel";
import UserInjury from "./UserInjury";
import UserInjuriesFilter from "./UserInjuriesFilter";
import defaultImg from "@/assets/images/UserInjuries.svg";

export default class UserInjuries extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userInjuriesData = [];
    this.userInjury = new UserInjury();
    this.filterData = new UserInjuriesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userInjuriesData = data.userInjuriesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
