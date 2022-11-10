import GeneralModel from "./../../general/GeneralModel";
import UserQualification from "./UserQualification";
import UserQualificationsFilter from "./UserQualificationsFilter";
import defaultImg from "@/assets/images/UserQualifications.svg";

export default class UserQualifications extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userQualificationsData = [];
    this.userQualification = new UserQualification();
    this.filterData = new UserQualificationsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userQualificationsData = data.userQualificationsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
