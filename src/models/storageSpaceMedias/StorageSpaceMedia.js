import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/media.svg";

export default class StorageSpaceMedia extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.storageSpaceMediaToken = "";
    this.storageSpaceMediaNameCurrent = "";
    this.storageSpaceMediaNameEn = "";
    this.storageSpaceMediaNameAr = "";
    this.storageSpaceMediaNameUnd = "";
    this.storageSpaceMediaTypeToken = "";
    this.storageSpaceMediaTypeNameCurrent = "";
    this.storageSpaceMediaFileTypeToken = "";
    this.storageSpaceMediaFileTypeNameCurrent = "";
    this.storageSpaceMediaFileName = "";
    this.storageSpaceMediaFileShowStatusTypeToken = "";
    this.storageSpaceMediaFileShowStatusTypeNameCurrent = "";
    this.storageSpaceMediaFileShowStatusTypeNameAr = "";
    this.storageSpaceMediaFileShowStatusTypeNameEn = "";
    this.storageSpaceMediaFileShowStatusTypeNameUnd = "";
    this.storageSpaceMediaDescriptionCurrent = "";
    this.storageSpaceMediaDescriptionAr = "";
    this.storageSpaceMediaDescriptionEn = "";
    this.storageSpaceMediaDescriptionUnd = "";
    this.storageSpaceMediaFilePath = "";
    this.storageSpaceMediaFileIsDefault = false;
    this.storageSpaceMediaFileSizeBytes = 0;
    this.storageSpaceMediaFileSizeTextCurrent = "";
    this.storageSpaceMediaNotes = "";
    this.storageSpaceToken = "";
    this.storageSpaceData = null;
    this.sharedMediaToken = "";
  }
  fillData(data) {
    this.fillDataBaseEntityModel(data);
    this.mediaFile = "";
    this.storageSpaceMediaToken = data.storageSpaceMediaToken;
    this.storageSpaceMediaNameCurrent = data.storageSpaceMediaNameCurrent;
    this.storageSpaceMediaNameEn = data.storageSpaceMediaNameEn;
    this.storageSpaceMediaNameAr = data.storageSpaceMediaNameAr;
    this.storageSpaceMediaNameUnd = data.storageSpaceMediaNameUnd;
    this.storageSpaceMediaTypeToken = data.storageSpaceMediaTypeToken;
    this.storageSpaceMediaTypeNameCurrent =
      data.storageSpaceMediaTypeNameCurrent;
    this.storageSpaceMediaFileTypeToken = data.storageSpaceMediaFileTypeToken;
    this.storageSpaceMediaFileTypeNameCurrent =
      data.storageSpaceMediaFileTypeNameCurrent;
    this.storageSpaceMediaFileName = data.storageSpaceMediaFileName;
    this.storageSpaceMediaFileShowStatusTypeToken =
      data.storageSpaceMediaFileShowStatusTypeToken;
    this.storageSpaceMediaFileShowStatusTypeNameCurrent =
      data.storageSpaceMediaFileShowStatusTypeNameCurrent;
    this.storageSpaceMediaFileShowStatusTypeNameAr =
      data.storageSpaceMediaFileShowStatusTypeNameAr;
    this.storageSpaceMediaFileShowStatusTypeNameEn =
      data.storageSpaceMediaFileShowStatusTypeNameEn;
    this.storageSpaceMediaFileShowStatusTypeNameUnd =
      data.storageSpaceMediaFileShowStatusTypeNameUnd;
    this.storageSpaceMediaDescriptionCurrent =
      data.storageSpaceMediaDescriptionCurrent;
    this.storageSpaceMediaDescriptionAr = data.storageSpaceMediaDescriptionAr;
    this.storageSpaceMediaDescriptionEn = data.storageSpaceMediaDescriptionEn;
    this.storageSpaceMediaDescriptionUnd = data.storageSpaceMediaDescriptionUnd;
    this.storageSpaceMediaFilePath = data.storageSpaceMediaFilePath;
    this.storageSpaceMediaFileIsDefault = data.storageSpaceMediaFileIsDefault;
    this.storageSpaceMediaFileSizeBytes = data.storageSpaceMediaFileSizeBytes;
    this.storageSpaceMediaFileSizeTextCurrent =
      data.storageSpaceMediaFileSizeTextCurrent;
    this.storageSpaceMediaNotes = data.storageSpaceMediaNotes;
    this.storageSpaceToken = data.storageSpaceToken;
    this.storageSpaceData = data.storageSpaceData;
    this.sharedMediaToken = data.sharedMediaToken;
  }
}
