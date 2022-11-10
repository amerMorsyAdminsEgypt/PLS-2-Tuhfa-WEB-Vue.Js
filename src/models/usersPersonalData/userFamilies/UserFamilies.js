import GeneralModel from "./../../general/GeneralModel";
import UserFamily from "./UserFamily";
import UserFamiliesFilter from "./UserFamiliesFilter";
import defaultImg from "@/assets/images/UserFamilies.svg";

export default class UserFamilies extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userFamiliesData = [];
    this.userFamily = new UserFamily();
    this.filterData = new UserFamiliesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userFamiliesData = data.usersFamilyData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
