import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/reminders.svg";

import priorityTypeInfoData from "./../settings/settingsOthers/priorityTypes/PriorityTypeInfoData";

export default class Reminder extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.reminderToken = "";
    this.placeTypeToken = "";
    this.reminderTitleCurrent = "";
    this.reminderTitleAr = "";
    this.reminderTitleEn = "";
    this.reminderTitleUnd = "";
    this.reminderDateTime = "";
    this.reminderDateTimeCustomized = "";
    this.reminderDate = "";
    this.reminderTime = "";
    this.reminderDescriptionCurrent = "";
    this.reminderDescriptionAr = "";
    this.reminderDescriptionEn = "";
    this.reminderDescriptionUnd = "";
    this.terminationTypeToken = "";
    this.terminationTypeNameCurrent = "";
    this.terminationTypeNameAr = "";
    this.terminationTypeNameEn = "";
    this.terminationTypeNameUnd = "";
    this.reminderNotes = "";
    this.reminderImageIsDefault = "";
    this.reminderImagePath = "";
    this.reminderImageSizeBytes = "";
    this.reminderImageSizeTextCurrent = "";
    this.placeInfoData = [];
    this.educationalCategoryInfoData = [];
    this.educationalGroupInfoData = [];
    this.reminderUsersData = [];
    this.priorityTypeInfoDataCurrent = new priorityTypeInfoData();
    this.placesTokensList = [];
    this.educationalCategoriesTokensList = [];
    this.educationalGroupsTokensList = [];
    this.usersTokensList = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.reminderToken = data.reminderToken ?? "";
      this.placeTypeToken = data.placeTypeToken ?? "";
      this.reminderTitleCurrent = data.reminderTitleCurrent ?? "";
      this.reminderTitleAr = data.reminderTitleAr ?? "";
      this.reminderTitleEn = data.reminderTitleEn ?? "";
      this.reminderTitleUnd = data.reminderTitleUnd ?? "";
      this.reminderDateTime = data.reminderDateTime ?? "";
      this.reminderDateTimeCustomized = data.reminderDateTimeCustomized ?? "";
      this.reminderDate = data.reminderDate ?? "";
      this.reminderTime = data.reminderTime ?? "";
      this.reminderDescriptionCurrent = data.reminderDescriptionCurrent ?? "";
      this.reminderDescriptionAr = data.reminderDescriptionAr ?? "";
      this.reminderDescriptionEn = data.reminderDescriptionEn ?? "";
      this.reminderDescriptionUnd = data.reminderDescriptionUnd ?? "";
      this.terminationTypeToken = data.terminationTypeToken ?? "";
      this.terminationTypeNameCurrent = data.terminationTypeNameCurrent ?? "";
      this.terminationTypeNameAr = data.terminationTypeNameAr ?? "";
      this.terminationTypeNameEn = data.terminationTypeNameEn ?? "";
      this.terminationTypeNameUnd = data.terminationTypeNameUnd ?? "";
      this.reminderNotes = data.reminderNotes ?? "";
      this.reminderImageIsDefault = data.reminderImageIsDefault ?? "";
      this.reminderImagePath = data.reminderImagePath ?? "";
      this.reminderImageSizeBytes = data.reminderImageSizeBytes ?? "";
      this.reminderImageSizeTextCurrent =
        data.reminderImageSizeTextCurrent ?? "";
      this.placeInfoData = data.placeInfoData ?? [];
      this.educationalCategoryInfoData = data.educationalCategoryInfoData ?? [];
      this.educationalGroupInfoData = data.educationalGroupInfoData ?? [];
      this.reminderUsersData = data.reminderUsersData ?? [];
      this.priorityTypeInfoDataCurrent.fillPriorityTypeInfoData(
        data.priorityTypeInfoDataCurrent
      );
      // set lists
      this.placesTokensList = data.placeInfoData
        .filter((x) => x)
        .map((x) => x.placeToken);

      this.educationalCategoriesTokensList = data.educationalCategoryInfoData
        .filter((x) => x)
        .map((x) => x.educationalCategoryToken);

      this.educationalGroupsTokensList = data.educationalGroupInfoData
        .filter((x) => x)
        .map((x) => x.educationalGroupToken);

      this.usersTokensList = data.reminderUsersData
        .filter((x) => x)
        .map((x) => x.userToken);
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
