import UserInfoData from "./../../general/UserCreatedData";
import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";
import EducationalPeriodInfoData from "./../educationalPeriods/EducationalPeriod";
import PriceList from "./../../settings/settingsOthers/priceLists/PriceList";

export default class EducationalJoiningApplicationInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalJoiningApplicationToken = "";
    this.fullCode = "";
    this.educationalJoiningApplicationNameCurrent = "";
    this.educationalJoiningApplicationDescriptionCurrent = "";
    this.educationalJoiningApplicationImageIsDefault = "";
    this.educationalJoiningApplicationImagePath = "";
    this.educationalJoiningApplicationImageSizeBytes = "";
    this.educationalJoiningApplicationImageSizeTextCurrent = "";
    this.enrollmentTypeToken = "";
    this.enrollmentTypeNameCurrent = "";
    this.approvalTypeToken = "";
    this.approvalTypeNameCurrent = "";
    this.subscriptionTypeToken = "";
    this.subscriptionTypeNameCurrent = "";
    this.approvalUserInfoData = new UserInfoData();
    this.userStudentInfoData = new UserInfoData();
    this.educationalCategoryData = new EducationalCategoryInfoData();
    this.educationalPeriodInfoData = new EducationalPeriodInfoData();
    this.priceListInfoData = new PriceList();
  }
  fillEducationalJoiningApplicationInfoData(data) {
    if (data) {
      this.educationalJoiningApplicationToken =
        data.educationalJoiningApplicationToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.educationalJoiningApplicationNameCurrent =
        data.educationalJoiningApplicationNameCurrent ?? "";
      this.educationalJoiningApplicationDescriptionCurrent =
        data.educationalJoiningApplicationDescriptionCurrent ?? "";
      this.educationalJoiningApplicationImageIsDefault =
        data.educationalJoiningApplicationImageIsDefault ?? "";
      this.educationalJoiningApplicationImagePath =
        data.educationalJoiningApplicationImagePath ?? "";
      this.educationalJoiningApplicationImageSizeBytes =
        data.educationalJoiningApplicationImageSizeBytes ?? "";
      this.educationalJoiningApplicationImageSizeTextCurrent =
        data.educationalJoiningApplicationImageSizeTextCurrent ?? "";
      this.enrollmentTypeToken = data.enrollmentTypeToken ?? "";
      this.enrollmentTypeNameCurrent = data.enrollmentTypeNameCurrent ?? "";
      this.approvalTypeToken = data.approvalTypeToken ?? "";
      this.approvalTypeNameCurrent = data.approvalTypeNameCurrent ?? "";
      this.subscriptionTypeToken = data.subscriptionTypeToken ?? "";
      this.subscriptionTypeNameCurrent = data.subscriptionTypeNameCurrent ?? "";
      this.approvalUserInfoData.fillDataUserCreatedData(
        data.approvalUserInfoData
      );
      this.userStudentInfoData.fillDataUserCreatedData(
        data.userStudentInfoData
      );
      this.educationalCategoryData.fillData(data.educationalCategoryData);
      this.educationalPeriodInfoData.fillData(data.educationalPeriodInfoData);
      this.priceListInfoData.fillData(data.priceListInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
