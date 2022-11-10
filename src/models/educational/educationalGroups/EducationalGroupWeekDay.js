// import EducationalGroupPlace from "./EducationalGroupPlace";

export default class EducationalGroupWeekDay {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.dayToken = "";
    this.dayNameCurrent = "";
    this.dayWorkTypeToken = "";
    this.dayWorkTypeNameCurrent = "";
    this.educationalGroupPlacesData = [];
    // this.educationalGroupPlacesData = [new EducationalGroupPlace()];
  }
  fillData(data) {
    if (data) {
      this.dayToken = data.dayToken || "";
      this.dayNameCurrent = data.dayNameCurrent || "";
      this.dayWorkTypeToken = data.dayWorkTypeToken || "";
      this.dayWorkTypeNameCurrent = data.dayWorkTypeNameCurrent || "";
      this.educationalGroupPlacesData = data.educationalGroupPlacesData || [];
      // this.fillEucationalGroupPlacesData(data.educationalGroupPlacesData);
    } else {
      this.setInitialValue();
    }
  }
  // fillEucationalGroupPlacesData(data) {
  //   if (data) {
  //     this.educationalGroupPlacesData = data.map(function (item) {
  //       let placeTypeToken = item.placeInfoData.placeTypeToken;
  //       return { ...item, placeTypeToken: placeTypeToken };
  //     });
  //   } else {
  //     this.educationalGroupPlacesData = [];
  //   }
  // }
}
