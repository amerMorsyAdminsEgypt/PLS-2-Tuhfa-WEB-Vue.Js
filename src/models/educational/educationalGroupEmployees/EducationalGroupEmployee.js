import defaultImg from "@/assets/images/employees.svg";

export default class EducationalGroupEmployee {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.countTimes = "";
    this.userToken = "";
    this.userNameCurrent = "";
    this.fullCode = "";
    this.userName = "";
    this.userPhoneWithCC = "";
    this.userImagePath = "";
    this.userTypeToken = "";
    this.userTypeNameCurrent = "";
    this.userJobGradeToken = "";
    this.userJobGradeNameCurrent = "";
    this.userJobGradeImagePath = "";
  }
  fillData(data) {
    if (data) {
      this.countTimes = data.countTimes ?? "";
      this.userToken = data.userToken ?? "";
      this.userNameCurrent = data.userNameCurrent ?? "";
      this.fullCode = data.fullCode ?? "";
      this.userName = data.userName ?? "";
      this.userPhoneWithCC = data.userPhoneWithCC ?? "";
      this.userImagePath = data.userImagePath ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userJobGradeToken = data.userJobGradeToken ?? "";
      this.userJobGradeNameCurrent = data.userJobGradeNameCurrent ?? "";
      this.userJobGradeImagePath = data.userJobGradeImagePath ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
