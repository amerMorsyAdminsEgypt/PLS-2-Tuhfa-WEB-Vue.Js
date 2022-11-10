import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/accounts.svg";
import UserInfoData from "./../../general/UserCreatedData";
import EducationalJoiningApplicationInfoData from "./../../educational/educationalJoiningApplications/EducationalJoiningApplicationInfoData";

export default class Debt extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.debtToken = "";
    this.debtTitleCurrent = "";
    this.debtTypeToken = "";
    this.debtTypeNameCurrent = "";
    this.schedulingStatusTypeToken = "";
    this.schedulingStatusTypeNameCurrent = "";
    this.debtMoney = "";
    this.debtMoneyWithCurrency = "";
    this.debtMoneyText = "";
    this.paidMoney = "";
    this.paidMoneyWithCurrency = "";
    this.paidMoneyText = "";
    this.remainderMoney = "";
    this.remainderMoneyWithCurrency = "";
    this.remainderMoneyText = "";
    this.finishPercentage = "";
    this.finishPercentageText = "";
    this.userToken = "";
    this.educationalJoiningApplicationToken = "";
    this.userInfoData = new UserInfoData();
    this.educationalJoiningApplicationInfoData =
      new EducationalJoiningApplicationInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.debtToken = data.debtToken ?? "";
      this.debtTitleCurrent = data.debtTitleCurrent ?? "";
      this.debtTypeToken = data.debtTypeToken ?? "";
      this.debtTypeNameCurrent = data.debtTypeNameCurrent ?? "";
      this.schedulingStatusTypeToken = data.schedulingStatusTypeToken ?? "";
      this.schedulingStatusTypeNameCurrent =
        data.schedulingStatusTypeNameCurrent ?? "";
      this.debtMoney = data.debtMoney ?? "";
      this.debtMoneyWithCurrency = data.debtMoneyWithCurrency ?? "";
      this.debtMoneyText = data.debtMoneyText ?? "";
      this.paidMoney = data.paidMoney ?? "";
      this.paidMoneyWithCurrency = data.paidMoneyWithCurrency ?? "";
      this.paidMoneyText = data.paidMoneyText ?? "";
      this.remainderMoney = data.remainderMoney ?? "";
      this.remainderMoneyWithCurrency = data.remainderMoneyWithCurrency ?? "";
      this.remainderMoneyText = data.remainderMoneyText ?? "";
      this.finishPercentage = data.finishPercentage ?? "";
      this.finishPercentageText = data.finishPercentageText ?? "";
      this.userToken = data.userToken ?? "";
      this.educationalJoiningApplicationToken =
        data.educationalJoiningApplicationToken ?? "";
      this.userInfoData.fillDataUserCreatedData(data.userInfoData);
      this.educationalJoiningApplicationInfoData.fillData(
        data.educationalJoiningApplicationInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}
