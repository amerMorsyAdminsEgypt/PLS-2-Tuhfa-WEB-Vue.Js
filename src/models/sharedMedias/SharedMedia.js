import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/folder.svg";
import icon from "@/assets/images/sharedMedias.svg";
import SharedMediaFolderInfoData from "./../sharedMediaFolders/SharedMediaFolderInfoData";

export default class SharedMedia extends BaseEntityModel {
  icon = icon;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.sharedMediaToken = "";
    this.sharedMediaNameCurrent = "";
    this.sharedMediaNameEn = "";
    this.sharedMediaNameAr = "";
    this.sharedMediaNameUnd = "";
    this.sharedMediaFileTypeToken = "";
    this.sharedMediaFileTypeNameCurrent = "";
    this.sharedMediaFileName = "";
    this.sharedMediaDescriptionCurrent = "";
    this.sharedMediaDescriptionAr = "";
    this.sharedMediaDescriptionEn = "";
    this.sharedMediaDescriptionUnd = "";
    this.sharedMediaFilePath = "";
    this.sharedMediaFileIsDefault = false;
    this.sharedMediaFileSizeBytes = 0;
    this.sharedMediaFileSizeTextCurrent = "";
    this.sharedMediaNotes = "";
    this.sharedMediaFolderToken = "";
    this.sharedMediaFolderInfoData = new SharedMediaFolderInfoData();
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.sharedMediaToken = data.sharedMediaToken ?? "";
    this.sharedMediaNameCurrent = data.sharedMediaNameCurrent ?? "";
    this.sharedMediaNameEn = data.sharedMediaNameEn ?? "";
    this.sharedMediaNameAr = data.sharedMediaNameAr ?? "";
    this.sharedMediaNameUnd = data.sharedMediaNameUnd ?? "";
    this.sharedMediaFileTypeToken = data.sharedMediaFileTypeToken ?? "";
    this.sharedMediaFileTypeNameCurrent =
      data.sharedMediaFileTypeNameCurrent ?? "";
    this.sharedMediaFileName = data.sharedMediaFileName ?? "";
    this.sharedMediaDescriptionCurrent =
      data.sharedMediaDescriptionCurrent ?? "";
    this.sharedMediaDescriptionAr = data.sharedMediaDescriptionAr ?? "";
    this.sharedMediaDescriptionEn = data.sharedMediaDescriptionEn ?? "";
    this.sharedMediaDescriptionUnd = data.sharedMediaDescriptionUnd ?? "";
    this.sharedMediaFilePath = data.sharedMediaFilePath ?? "";
    this.sharedMediaFileIsDefault = data.sharedMediaFileIsDefault ?? false;
    this.sharedMediaFileSizeBytes = data.sharedMediaFileSizeBytes ?? 0;
    this.sharedMediaFileSizeTextCurrent =
      data.sharedMediaFileSizeTextCurrent ?? "";
    this.sharedMediaNotes = data.sharedMediaNotes ?? "";
    this.sharedMediaFolderToken = data.sharedMediaFolderToken ?? "";
    this.sharedMediaFolderInfoData.fillData(data.sharedMediaFolderInfoData);
  }
}
