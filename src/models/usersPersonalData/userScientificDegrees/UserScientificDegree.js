import BaseEntityModel from "./../../general/BaseEntityModel";
// import UserModel from "./../../users/UserModel";
import ScientificDegreeData from "./../../settings/settingsOthers/scientificDegrees/ScientificDegree";
import ClassificationDegreeData from "./../../settings/settingsOthers/classificationDegrees/ClassificationDegree";
import defaultImg from "@/assets/images/UserScientificDegrees.svg";

export default class UserScientificDegree extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userScientificDegreeToken = "";
    this.userScientificDegreeNameCurrent = "";
    this.userScientificDegreeNameEn = "";
    this.userScientificDegreeNameAr = "";
    this.userScientificDegreeNameUnd = "";
    this.userScientificDegreeDescriptionCurrent = "";
    this.userScientificDegreeDescriptionAr = "";
    this.userScientificDegreeDescriptionEn = "";
    this.userScientificDegreeDescriptionUnd = "";
    this.userTypeNameCurrent = "";
    this.userTypeToken = "";
    this.joiningDateTime = "";
    this.joiningDateTimeCustomized = "";
    this.joiningDate = "";
    this.joiningTime = "";
    this.obtainingDateTime = "";
    this.obtainingDateTimeCustomized = "";
    this.obtainingDate = "";
    this.obtainingTime = "";
    this.obtainStatus = "";
    this.scientificDegreeDurationCurrent = "";
    this.scientificDegreeDurationEn = "";
    this.scientificDegreeDurationAr = "";
    this.scientificDegreeDurationUnd = "";
    this.userScientificDegreeImagePath = "";
    this.userScientificDegreeImageIsDefault = "";
    this.userScientificDegreeImageSizeBytes = "";
    this.userScientificDegreeImageSizeTextCurrent = "";
    this.userScientificDegreeNotes = "";
    this.userToken = "";
    this.scientificDegreeToken = "";
    this.classificationDegreeToken = "";
    // this.userData = new UserModel();
    this.scientificDegreeData = new ScientificDegreeData();
    this.classificationDegreeData = new ClassificationDegreeData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userScientificDegreeToken = data.userScientificDegreeToken ?? "";
      this.userScientificDegreeNameCurrent =
        data.userScientificDegreeNameCurrent ?? "";
      this.userScientificDegreeNameEn = data.userScientificDegreeNameEn ?? "";
      this.userScientificDegreeNameAr = data.userScientificDegreeNameAr ?? "";
      this.userScientificDegreeNameUnd = data.userScientificDegreeNameUnd ?? "";
      this.userScientificDegreeDescriptionCurrent =
        data.userScientificDegreeDescriptionCurrent ?? "";
      this.userScientificDegreeDescriptionAr =
        data.userScientificDegreeDescriptionAr ?? "";
      this.userScientificDegreeDescriptionEn =
        data.userScientificDegreeDescriptionEn ?? "";
      this.userScientificDegreeDescriptionUnd =
        data.userScientificDegreeDescriptionUnd ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.joiningDateTime = data.joiningDateTime ?? "";
      this.joiningDateTimeCustomized = data.joiningDateTimeCustomized ?? "";
      this.joiningDate = data.joiningDate ?? "";
      this.joiningTime = data.joiningTime ?? "";
      this.obtainingDateTime = data.obtainingDateTime ?? "";
      this.obtainingDateTimeCustomized = data.obtainingDateTimeCustomized ?? "";
      this.obtainingDate = data.obtainingDate ?? "";
      this.obtainingTime = data.obtainingTime ?? "";
      this.obtainStatus = data.obtainStatus ?? "";
      this.scientificDegreeDurationCurrent =
        data.scientificDegreeDurationCurrent ?? "";
      this.scientificDegreeDurationEn = data.scientificDegreeDurationEn ?? "";
      this.scientificDegreeDurationAr = data.scientificDegreeDurationAr ?? "";
      this.scientificDegreeDurationUnd = data.scientificDegreeDurationUnd ?? "";
      this.userScientificDegreeImagePath =
        data.userScientificDegreeImagePath ?? "";
      this.userScientificDegreeImageIsDefault =
        data.userScientificDegreeImageIsDefault ?? "";
      this.userScientificDegreeImageSizeBytes =
        data.userScientificDegreeImageSizeBytes ?? "";
      this.userScientificDegreeImageSizeTextCurrent =
        data.userScientificDegreeImageSizeTextCurrent ?? "";
      this.userScientificDegreeNotes = data.userScientificDegreeNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.scientificDegreeToken = data.scientificDegreeToken ?? "";
      this.classificationDegreeToken = data.classificationDegreeToken ?? "";
      // this.userData.fillData(data.userData);
      this.scientificDegreeData.fillData(data.scientificDegreeData);
      this.classificationDegreeData.fillData(data.classificationDegreeData);
    } else {
      this.setInitialValue();
    }
  }
}
