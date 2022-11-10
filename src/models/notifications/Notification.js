import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/notifications.svg";

export default class Notification extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.notificationToken = "";
    this.dateTime = "";
    this.dateTimeAgo = "";
    this.titleCurrent = "";
    this.titleAr = "";
    this.titleEn = "";
    this.titleUnd = "";
    this.bodyCurrent = "";
    this.bodyAr = "";
    this.bodyEn = "";
    this.bodyUnd = "";
    this.statusOpen = "";
    this.statusRead = "";
    this.userFireBaseId = "";
    this.userPlatFormToken = "";
    this.itemToken = "";
    this.itemImagePath = "";
    this.pageGoToToken = "";
    this.pageGoToNameAr = "";
    this.pageGoToNameEn = "";
    this.pageGoToNameUnd = "";
    this.userToken = "";
    this.establishmentData = "";
    this.lastUpdateTime = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.notificationToken = data.notificationToken ?? "";
      this.dateTime = data.dateTime ?? "";
      this.dateTimeAgo = data.dateTimeAgo ?? "";
      this.titleCurrent = data.titleCurrent ?? "";
      this.titleAr = data.titleAr ?? "";
      this.titleEn = data.titleEn ?? "";
      this.titleUnd = data.titleUnd ?? "";
      this.bodyCurrent = data.bodyCurrent ?? "";
      this.bodyAr = data.bodyAr ?? "";
      this.bodyEn = data.bodyEn ?? "";
      this.bodyUnd = data.bodyUnd ?? "";
      this.statusOpen = data.statusOpen ?? "";
      this.statusRead = data.statusRead ?? "";
      this.userFireBaseId = data.userFireBaseId ?? "";
      this.userPlatFormToken = data.userPlatFormToken ?? "";
      this.itemToken = data.itemToken ?? "";
      this.itemImagePath = data.itemImagePath ?? "";
      this.pageGoToToken = data.pageGoToToken ?? "";
      this.pageGoToNameAr = data.pageGoToNameAr ?? "";
      this.pageGoToNameEn = data.pageGoToNameEn ?? "";
      this.pageGoToNameUnd = data.pageGoToNameUnd ?? "";
      this.userToken = data.userToken ?? "";
      this.establishmentData = data.establishmentData ?? "";
      this.lastUpdateDateTimeView = data.lastUpdateDateTimeView ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
//#endregion model
