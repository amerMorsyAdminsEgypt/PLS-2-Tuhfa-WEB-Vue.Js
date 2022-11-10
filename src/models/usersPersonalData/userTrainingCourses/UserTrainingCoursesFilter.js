import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";

export default class UserTrainingCoursesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    // this.userDataInclude = true;
    this.certificateDataInclude = true;

    this.userToken = "";
    this.certificateToken = "";
    this.userTrainingCourseToken = "";
    this.joiningDateTimeFrom = "";
    this.joiningDateTimeTo = "";
    this.obtainingDateTimeFrom = "";
    this.obtainingDateTimeTo = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      // this.userDataInclude = data.userDataInclude ?? true;
      this.certificateDataInclude = data.certificateDataInclude ?? true;
      this.userToken = data.userToken ?? "";
      this.certificateToken = data.certificateToken ?? "";
      this.userTrainingCourseToken = data.userTrainingCourseToken ?? "";
      this.joiningDateTimeFrom = data.joiningDateTimeFrom ?? "";
      this.joiningDateTimeTo = data.joiningDateTimeTo ?? "";
      this.obtainingDateTimeFrom = data.obtainingDateTimeFrom ?? "";
      this.obtainingDateTimeTo = data.obtainingDateTimeTo ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
