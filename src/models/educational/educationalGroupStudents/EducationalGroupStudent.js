import BaseEntityModel from "./../../general/BaseEntityModel";
import EducationalJoiningApplicationInfoData from "./EducationalJoiningApplicationInfoData";
import EducationalCategoryInfoData from "./EducationalCategoryInfoData";
import defaultImg from "@/assets/images/EducationalGroupStudents.svg";
import UserInfoData from "./../../general/UserCreatedData";

export default class EducationalGroupStudent extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalGroupStudentToken = "";
    this.studentUserToken = "";
    this.educationalGroupToken = "";
    this.certificateStatusToken = "";
    this.certificateStatusNameCurrent = "";
    this.educationalJoiningApplicationToken = "";
    this.educationalJoiningApplicationTokens = [];
    this.studentUserInfoDate = new UserInfoData();
    this.educationalGroupInfoData = new EducationalCategoryInfoData();
    this.educationalJoiningApplicationInfoDate =
      new EducationalJoiningApplicationInfoData();
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.educationalGroupStudentToken = data.educationalGroupStudentToken ?? "";
    this.studentUserToken = data.studentUserToken ?? "";
    this.certificateStatusToken = data.certificateStatusToken ?? "";
    this.certificateStatusNameCurrent = data.certificateStatusNameCurrent ?? "";
    this.educationalGroupToken = data.educationalGroupToken ?? "";
    this.educationalJoiningApplicationToken =
      data.educationalJoiningApplicationToken ?? "";
    this.educationalJoiningApplicationTokens =
      data.educationalJoiningApplicationTokens ?? [];
    this.studentUserInfoDate.fillDataUserCreatedData(data.studentUserInfoDate);
    this.educationalGroupInfoData.fillEducationalCategoryInfoData(
      data.educationalGroupInfoData
    );
    this.educationalJoiningApplicationInfoDate.fillEducationalJoiningApplicationInfoData(
      data.educationalJoiningApplicationInfoDate
    );
  }
}
