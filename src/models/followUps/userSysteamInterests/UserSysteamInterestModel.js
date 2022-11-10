import { getUserAuthorizeToken } from "./../../../utils/functions";
import SysteamInterestData from "./SysteamInterestData";
import defaultImg from "@/assets/images/UserSysteamOtherInterests.svg";

export default class UserSysteamInterestModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.userToken = "";
    this.userSysteamInterestsData = [];
  }
  fillData(data) {
    if (data) {
      this.userToken = data.userToken ?? "";
      this.userSysteamInterestsData = [];

      if (
        data.userSysteamInterestsData != null &&
        data.userSysteamInterestsData.length > 0
      ) {
        this.userSysteamInterestsData = data.userSysteamInterestsData.map(
          (element) => {
            return new SysteamInterestData(element);
          }
        );
      }
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
