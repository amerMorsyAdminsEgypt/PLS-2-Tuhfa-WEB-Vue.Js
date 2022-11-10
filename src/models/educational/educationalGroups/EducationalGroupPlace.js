// import PlaceInfoData from "./../../places/PlaceInfoData";
// import EducationalGroupTime from "./EducationalGroupTime";

export default class EducationalGroupPlace {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.placeTypeToken = "";
    this.placeToken = "";
    // this.placeInfoData = new PlaceInfoData();
    this.educationalGroupTimesData = [];
    // this.educationalGroupTimesData = [new EducationalGroupTime()];
  }
  fillData(data) {
    if (data) {
      this.placeTypeToken = data.placeInfoData.placeTypeToken || "";
      this.placeToken = data.placeToken || "";
      // this.placeInfoData.fillData(data.placeInfoData);
      this.educationalGroupTimesData = data.educationalGroupTimesData || [];
    } else {
      this.setInitialValue();
    }
  }
}
