import { getUserAuthorizeToken } from "./../../../utils/functions";
import OtherInterestData from "./OtherInterestData";
import defaultImg from "@/assets/images/UserSysteamOtherInterests.svg";

export default class UserOtherInterestModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.userToken = "";
    this.userOtherInterestsData = [];
  }
  fillData(data) {
    if (data) {
      this.userToken = data.userToken ?? "";
      this.userOtherInterestsData = [];

      if (
        data.userOtherInterestsData != null &&
        data.userOtherInterestsData.length > 0
      ) {
        this.userOtherInterestsData = data.userOtherInterestsData.map(
          (element) => {
            return new OtherInterestData(element);
          }
        );
      }
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
