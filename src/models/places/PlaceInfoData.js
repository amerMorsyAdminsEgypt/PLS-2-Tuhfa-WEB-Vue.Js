export default class PlaceInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.placeToken = "";
    this.fullCode = "";
    this.placeImagePath = "";
    this.placeNameCurrent = "";
    this.placeAddressCurrent = "";
    this.placePhone1WithCC = "";
    this.placePhone1WhatsAppStatus = false;
    this.placePhone2WithCC = "";
    this.placePhone2WhatsAppStatus = false;
    this.placeLatitude = "";
    this.placelongitude = "";
    this.placeTypeToken = "";
    this.placeTypeNameCurrent = "";
    this.systemComponentToken = "";
    this.systemComponentNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.placeToken = data.placeToken || "";
      this.fullCode = data.fullCode || "";
      this.placeImagePath = data.placeImagePath || "";
      this.placeNameCurrent = data.placeNameCurrent || "";
      this.placeAddressCurrent = data.placeAddressCurrent || "";
      this.placePhone1WithCC = data.placePhone1WithCC || "";
      this.placePhone1WhatsAppStatus = data.placePhone1WhatsAppStatus || false;
      this.placePhone2WithCC = data.placePhone2WithCC || "";
      this.placePhone2WhatsAppStatus = data.placePhone2WhatsAppStatus || false;
      this.placeLatitude = data.placeLatitude || "";
      this.placelongitude = data.placelongitude || "";
      this.placeTypeToken = data.placeTypeToken || "";
      this.placeTypeNameCurrent = data.placeTypeNameCurrent || "";
      this.systemComponentToken = data.systemComponentToken || "";
      this.systemComponentNameCurrent = data.systemComponentNameCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
