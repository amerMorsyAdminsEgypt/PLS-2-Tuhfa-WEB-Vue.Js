import { getUserAuthorizeToken } from "./../../../utils/functions";
import defaultImg from "@/assets/images/plus.svg";

export default class EducationalGroupAddStudents {
  icon = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.educationalCategoryToken = "";
    this.educationalCategoryNameCurrent = "";
    this.educationalGroupToken = "";
    this.educationalGroupNameCurrent = "";
    this.educationalJoiningApplicationTokens = [];
  }
  fillData(data) {
    if (data) {
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.educationalCategoryNameCurrent =
        data.educationalCategoryData.educationalCategoryNameCurrent || "";
      this.educationalGroupToken = data.educationalGroupToken || "";
      this.educationalGroupNameCurrent = data.educationalGroupNameCurrent || "";
      this.educationalJoiningApplicationTokens =
        data.educationalJoiningApplicationTokens || [];
    } else {
      this.setInitialValue();
    }
  }
}
