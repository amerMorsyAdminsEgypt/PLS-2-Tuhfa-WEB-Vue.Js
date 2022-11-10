import { getUserAuthorizeToken } from "./../../../utils/functions";
import NewUserModel from "./../../users/NewUserModel";
import SysteamInterestData from "./../userSysteamInterests/SysteamInterestData";
import OtherInterestData from "./../userOtherInterests/OtherInterestData";
import defaultImg from "@/assets/images/followInterests.svg";

export default class FollowInterestModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.communicationTypeToken = "";
    this.replyStatusTypeToken = "";
    this.fullCode = "";
    this.followUpByUserTokenStatus = false;
    this.userToken = "";
    this.newUserData = new NewUserModel();
    this.systeamInterestsData = [];
    this.otherInterestsData = [];
  }
  fillData(data) {
    if (data) {
      this.communicationTypeToken = data.communicationTypeToken ?? "";
      this.replyStatusTypeToken = data.replyStatusTypeToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.followUpByUserTokenStatus = data.followUpByUserTokenStatus ?? false;
      this.userToken = data.userToken ?? "";
      // this.newUserData.fillData(data.newUserData);
      this.systeamInterestsData = [];
      this.otherInterestsData = [];

      if (
        data.systeamInterestsData != null &&
        data.systeamInterestsData.length > 0
      ) {
        this.systeamInterestsData = data.systeamInterestsData.map((element) => {
          return new SysteamInterestData(element);
        });
      }
      if (
        data.otherInterestsData != null &&
        data.otherInterestsData.length > 0
      ) {
        this.otherInterestsData = data.otherInterestsData.map((element) => {
          return new OtherInterestData(element);
        });
      }
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
