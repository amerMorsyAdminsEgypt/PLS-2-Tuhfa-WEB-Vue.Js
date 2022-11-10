import defaultImg from "@/assets/images/places.svg";

export default class EducationalGroupPlace {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.countTimes = "";
    this.placeToken = "";
    this.fullCode = "";
    this.placeImagePath = "";
    this.placeNameCurrent = "";
    this.placeAddressCurrent = "";
    this.placePhone1WithCC = "";
    this.placePhone1WhatsAppStatus = "";
    this.placePhone2WithCC = "";
    this.placePhone2WhatsAppStatus = "";
    this.placeLatitude = "";
    this.placelongitude = "";
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.countTimes = data.countTimes ?? "";
      this.placeToken = data.placeToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.placeImagePath = data.placeImagePath ?? "";
      this.placeNameCurrent = data.placeNameCurrent ?? "";
      this.placeAddressCurrent = data.placeAddressCurrent ?? "";
      this.placePhone1WithCC = data.placePhone1WithCC ?? "";
      this.placePhone1WhatsAppStatus = data.placePhone1WhatsAppStatus ?? "";
      this.placePhone2WithCC = data.placePhone2WithCC ?? "";
      this.placePhone2WhatsAppStatus = data.placePhone2WhatsAppStatus ?? "";
      this.placeLatitude = data.placeLatitude ?? "";
      this.placelongitude = data.placelongitude ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.systemComponentNameCurrent = data.systemComponentNameCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
