import defaultImg from "@/assets/images/placeUsers.svg";
import BaseEntityModel from "./../general/BaseEntityModel";
import PlaceInfoData from "./../countedServices/PlaceInfoData";
import UserInfoData from "./../general/UserCreatedData";

export default class PlaceUser extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();

    this.placeUserToken = "";
    this.userTypeNameCurrent = "";
    this.placeToken = "";
    this.usersTokensList = [];
    this.userToken = "";
    this.placesTokensList = [];
    this.placeInfoData = new PlaceInfoData();
    this.userInfoData = new UserInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.placeUserToken = data.placeUserToken ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.placeToken = data.placeToken ?? "";
      this.userToken = data.userToken ?? "";
      this.placeInfoData.fillData(data.placeInfoData);
      this.userInfoData.fillDataUserCreatedData(data.userInfoData);
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
