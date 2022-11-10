import BaseEntityModel from "./../../general/BaseEntityModel";
import CommunicationTypeInfoData from "./../../settings/settingsOthers/communicationTypes/CommunicationTypeInfoData";
import SysteamInterestData from "./../userSysteamInterests/SysteamInterestData";
import OtherInterestData from "./../userOtherInterests/OtherInterestData";
import defaultImg from "@/assets/images/followInterests.svg";

export default class FollowInterest extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.followInterestToken = "";
    this.followInterestNumber = 0;
    this.followInterestNameCurrent = "";
    this.followInterestDescriptionCurrent = "";
    this.followInterestDescriptionAr = "";
    this.followInterestDescriptionEn = "";
    this.followInterestDescriptionUnd = "";
    this.followInterestNotes = "";
    this.userToken = "";
    this.replyStatusTypeToken = "";
    this.replyStatusTypeNameCurrent = "";
    this.followInterestImageIsDefault = false;
    this.followInterestImagePath = "";
    this.followInterestImageSizeBytes = "";
    this.followInterestImageSizeTextCurrent = "";
    this.communicationTypeToken = "";
    this.communicationTypeInfoData = new CommunicationTypeInfoData();
    this.systeamInterestsData = [];
    this.otherInterestsData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.followInterestToken = data.followInterestToken ?? "";
      this.followInterestNumber = data.followInterestNumber ?? 0;
      this.followInterestNameCurrent = data.followInterestNameCurrent ?? "";
      this.followInterestDescriptionCurrent =
        data.followInterestDescriptionCurrent ?? "";
      this.followInterestDescriptionAr = data.followInterestDescriptionAr ?? "";
      this.followInterestDescriptionEn = data.followInterestDescriptionEn ?? "";
      this.followInterestDescriptionUnd =
        data.followInterestDescriptionUnd ?? "";
      this.followInterestNotes = data.followInterestNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.replyStatusTypeToken = data.replyStatusTypeToken ?? "";
      this.replyStatusTypeNameCurrent = data.replyStatusTypeNameCurrent ?? "";
      this.followInterestImageIsDefault =
        data.followInterestImageIsDefault ?? false;
      this.followInterestImagePath = data.followInterestImagePath ?? "";
      this.followInterestImageSizeBytes =
        data.followInterestImageSizeBytes ?? "";
      this.followInterestImageSizeTextCurrent =
        data.followInterestImageSizeTextCurrent ?? "";
      this.communicationTypeToken = data.communicationTypeToken ?? "";
      this.communicationTypeInfoData.fillData(data.communicationTypeInfoData);
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
