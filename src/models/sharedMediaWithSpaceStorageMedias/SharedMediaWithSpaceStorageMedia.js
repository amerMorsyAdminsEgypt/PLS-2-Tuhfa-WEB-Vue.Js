import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/folder.svg";
import icon from "@/assets/images/share-icon.svg";
import StorageSpaceData from "./../storageSpaces/StorageSpaceData";
import SharedMedia from "./../sharedMedias/SharedMedia";

export default class SharedMediaWithSpaceStorageMedia extends BaseEntityModel {
  icon = icon;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.sharedMediaWithSpaceStorageMediaToken = "";
    this.storageSpaceToken = "";
    this.storageSpaceData = new StorageSpaceData();
    this.sharedMediaToken = "";
    this.sharedMediaData = new SharedMedia();
    // add fields added by me
    this.sharedMediaTokens = [];
    this.storageSpaceTokensCategory = [];
    this.storageSpaceTokensGroup = [];
    this.storageSpaceTokens = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.sharedMediaWithSpaceStorageMediaToken =
        data.sharedMediaWithSpaceStorageMediaToken ?? "";
      this.storageSpaceToken = data.storageSpaceToken ?? "";
      this.storageSpaceData.fillData(data.storageSpaceData);
      this.sharedMediaToken = data.sharedMediaToken ?? "";
      this.sharedMediaData.fillData(data.sharedMediaData);
      // add fields
      this.sharedMediaTokens = data.sharedMediaTokens ?? [];
      this.storageSpaceTokensCategory = data.storageSpaceTokensCategory ?? [];
      this.storageSpaceTokensGroup = data.storageSpaceTokensGroup ?? [];
      this.storageSpaceTokens = [
        ...data.storageSpaceTokensCategory,
        ...data.storageSpaceTokensGroup,
      ];
    } else {
      this.setInitialValue();
    }
  }
}
