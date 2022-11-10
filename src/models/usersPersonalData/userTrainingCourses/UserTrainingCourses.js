import GeneralModel from "./../../general/GeneralModel";
import UserTrainingCourse from "./UserTrainingCourse";
import UserTrainingCoursesFilter from "./UserTrainingCoursesFilter";
import defaultImg from "@/assets/images/UserTrainingCourses.svg";

export default class UserTrainingCourses extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userTrainingCoursesData = [];
    this.userTrainingCourse = new UserTrainingCourse();
    this.filterData = new UserTrainingCoursesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userTrainingCoursesData = data.userTrainingCoursesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
