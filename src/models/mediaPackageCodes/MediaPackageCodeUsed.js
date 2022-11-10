import UserInfoData from "./../users/UserInfoData";
import EducationalCategoryInfoData from "./../countedServices/EducationalCategoryInfoData";
import EducationalGroupInfoData from "./../educational/educationalGroups/EducationalGroupInfoData";

export default class MediaPackageCodeUsed {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.codeUsedInDataTime = "";
    this.codeUsedInDataTimeCustomized = "";
    this.codeUsedInData = "";
    this.codeUsedInTime = "";
    this.userStudentInfoData = new UserInfoData();
    this.joinInEducationalCategoryInfoData = new EducationalCategoryInfoData();
    this.joinInEeducationalGroupInfoData = new EducationalGroupInfoData();
  }
  fillData(data) {
    if (data) {
      this.codeUsedInDataTime = data.codeUsedInDataTime ?? "";
      this.codeUsedInDataTimeCustomized =
        data.codeUsedInDataTimeCustomized ?? "";
      this.codeUsedInData = data.codeUsedInData ?? "";
      this.codeUsedInTime = data.codeUsedInTime ?? "";
      this.userStudentInfoData.fillData(data.userStudentInfoData);
      this.joinInEducationalCategoryInfoData.fillData(
        data.joinInEducationalCategoryInfoData
      );
      this.joinInEeducationalGroupInfoData.fillData(
        data.joinInEeducationalGroupInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
