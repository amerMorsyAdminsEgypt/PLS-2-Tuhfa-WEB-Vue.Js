import BaseEntityModel from "./../../general/BaseEntityModel";
import User from "./../../users/User";
import OperationType from "./../../settings/settingsOthers/operationTypes/OperationType";
import BodyPart from "./../../settings/settingsOthers/bodyParts/BodyPart";
import defaultImg from "@/assets/images/UserOperations.svg";

export default class UserOperation extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userOperationToken = "";
    this.userOperationNameCurrent = "";
    this.userOperationNameEn = "";
    this.userOperationNameAr = "";
    this.userOperationNameUnd = "";
    this.userOperationDescriptionCurrent = "";
    this.userOperationDescriptionAr = "";
    this.userOperationDescriptionEn = "";
    this.userOperationDescriptionUnd = "";
    this.operationDateTime = "";
    this.operationDateTimeCustomized = "";
    this.operationDate = "";
    this.operationTime = "";
    this.userOperationImagePath = "";
    this.userOperationImageIsDefault = false;
    this.userOperationImageSizeBytes = 0;
    this.userOperationImageSizeTextCurrent = "";
    this.userOperationImageSizeTextAr = "";
    this.userOperationImageSizeTextEn = "";
    this.userOperationImageSizeTextUnd = "";
    this.userOperationNotes = "";
    this.userToken = "";
    this.operationTypeToken = "";
    this.bodyPartToken = "";
    this.userData = new User();
    this.operationTypeData = new OperationType();
    this.bodyPartData = new BodyPart();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userOperationToken = data.userOperationToken ?? "";
      this.userOperationNameCurrent = data.userOperationNameCurrent ?? "";
      this.userOperationNameEn = data.userOperationNameEn ?? "";
      this.userOperationNameAr = data.userOperationNameAr ?? "";
      this.userOperationNameUnd = data.userOperationNameUnd ?? "";
      this.userOperationDescriptionCurrent =
        data.userOperationDescriptionCurrent ?? "";
      this.userOperationDescriptionAr = data.userOperationDescriptionAr ?? "";
      this.userOperationDescriptionEn = data.userOperationDescriptionEn ?? "";
      this.userOperationDescriptionUnd = data.userOperationDescriptionUnd ?? "";
      this.operationDateTime = data.operationDateTime ?? "";
      this.operationDateTimeCustomized = data.operationDateTimeCustomized ?? "";
      this.operationDate = data.operationDate ?? "";
      this.operationTime = data.operationTime ?? "";
      this.userOperationImagePath = data.userOperationImagePath ?? "";
      this.userOperationImageIsDefault =
        data.userOperationImageIsDefault ?? false;
      this.userOperationImageSizeBytes = data.userOperationImageSizeBytes ?? 0;
      this.userOperationImageSizeTextCurrent =
        data.userOperationImageSizeTextCurrent ?? "";
      this.userOperationImageSizeTextAr =
        data.userOperationImageSizeTextAr ?? "";
      this.userOperationImageSizeTextEn =
        data.userOperationImageSizeTextEn ?? "";
      this.userOperationImageSizeTextUnd =
        data.userOperationImageSizeTextUnd ?? "";
      this.userOperationNotes = data.userOperationNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.operationTypeToken = data.operationTypeToken ?? "";
      this.bodyPartToken = data.bodyPartToken ?? "";
      this.userData.fillData(data.userData);
      this.operationTypeData.fillData(data.operationTypeData);
      this.bodyPartData.fillData(data.bodyPartData);
    } else {
      this.setInitialValue();
    }
  }
}
