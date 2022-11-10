import defaultImg from "@/assets/images/EducationalGroupTransfers.svg";
import { getUserAuthorizeToken } from "./../../../utils/functions";
import EducationalGroupTransferData from "./EducationalGroupTransferData";

export default class EducationalGroupTransferModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.newEducationalGroupToken = "";
    this.educationalGroupTransferringDtoDetalisData = [];

    this.allStudents = []; // custom by Mohamed ElSohagy
    this.allStudentsData = new EducationalGroupTransferData(); // custom by Mohamed ElSohagy
  }
  fillData(data) {
    this.newEducationalGroupToken = data.newEducationalGroupToken ?? "";
    this.educationalGroupTransferringDtoDetalisData =
      data.educationalGroupTransferringDtoDetalisData ?? [];
  }
  getDTO() {
    let obj = {
      userAuthorizeToken: this.userAuthorizeToken,
      newEducationalGroupToken: this.newEducationalGroupToken,
      educationalGroupTransferringDtoDetalisData: [],
    };

    if (this.allStudents && this.allStudents.length > 0) {
      for (const token in this.allStudents) {
        let itemDTO = { ...this.allStudentsData };
        itemDTO.educationalGroupStudentToken = this.allStudents[token];

        obj.educationalGroupTransferringDtoDetalisData.push(itemDTO);
      }
    }

    return obj;
  }
}
