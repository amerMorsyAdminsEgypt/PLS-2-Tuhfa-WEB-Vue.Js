import defaultImg from "@/assets/images/complaints.svg";

export default class ComplaintInfoData {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.complaintToken = "";
    this.fullCode = "";
    this.complaintTitleCurrent = "";
    this.complaintDescriptionCurrent = "";
    this.complaintNotes = "";
    this.complaintStatusTypeToken = "";
    this.complaintStatusTypeNameCurrent = "";
    this.complaintMediaIsDefault = "";
    this.complaintMediaPath = "";
    this.complaintMediaSizeBytes = "";
    this.complaintMediaSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.complaintToken = data.complaintToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.complaintTitleCurrent = data.complaintTitleCurrent ?? "";
      this.complaintDescriptionCurrent = data.complaintDescriptionCurrent ?? "";
      this.complaintNotes = data.complaintNotes ?? "";
      this.complaintStatusTypeToken = data.complaintStatusTypeToken ?? "";
      this.complaintStatusTypeNameCurrent =
        data.complaintStatusTypeNameCurrent ?? "";
      this.complaintMediaIsDefault = data.complaintMediaIsDefault ?? "";
      this.complaintMediaPath = data.complaintMediaPath ?? "";
      this.complaintMediaSizeBytes = data.complaintMediaSizeBytes ?? "";
      this.complaintMediaSizeTextCurrent =
        data.complaintMediaSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
