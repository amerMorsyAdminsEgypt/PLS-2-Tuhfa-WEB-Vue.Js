import GeneralModel from "./../../general/GeneralModel";
import UserExperience from "./UserExperience";
import UserExperiencesFilter from "./UserExperiencesFilter";
import defaultImg from "@/assets/images/UserExperiences.svg";

export default class UserExperiences extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userExperiencesData = [];
    this.userExperience = new UserExperience();
    this.filterData = new UserExperiencesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userExperiencesData = data.userExperiencesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
