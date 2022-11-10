import defaultImg from "@/assets/images/communicationTypes.svg";

export default class CommunicationTypeInfoData {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.communicationTypeToken = "";
    this.fullCode = "";
    this.communicationTypeNameCurrent = "";
    this.communicationTypeDescriptionCurrent = "";
    this.communicationTypeNotes = "";
    this.communicationTypeImageIsDefault = false;
    this.communicationTypeImagePath = "";
    this.communicationTypeImageSizeBytes = 0;
    this.communicationTypeImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.communicationTypeToken = data.communicationTypeToken || "";
      this.fullCode = data.fullCode || "";
      this.communicationTypeNameCurrent =
        data.communicationTypeNameCurrent || "";
      this.communicationTypeDescriptionCurrent =
        data.communicationTypeDescriptionCurrent || "";
      this.communicationTypeNotes = data.communicationTypeNotes || "";
      this.communicationTypeImageIsDefault =
        data.communicationTypeImageIsDefault || false;
      this.communicationTypeImagePath = data.communicationTypeImagePath || "";
      this.communicationTypeImageSizeBytes =
        data.communicationTypeImageSizeBytes || "";
      this.communicationTypeImageSizeTextCurrent =
        data.communicationTypeImageSizeTextCurrent || "";
    } else {
      this.setInitialValue();
    }
  }
}
