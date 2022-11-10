export default class EducationalGroupTransferData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.educationalGroupStudentToken = "";
    this.transferDateTime = "";
    this.transferAmountValue = 0;
    this.reasonForTransferAr = "";
    this.reasonForTransferEn = "";
    this.reasonForTransferUnd = "";
    this.notes = "";
  }
  fillData(data) {
    this.educationalGroupStudentToken = data.educationalGroupStudentToken ?? "";
    this.transferDateTime = data.transferDateTime ?? "";
    this.transferAmountValue = data.transferAmountValue ?? 0;
    this.reasonForTransferAr = data.reasonForTransferAr ?? "";
    this.reasonForTransferEn = data.reasonForTransferEn ?? "";
    this.reasonForTransferUnd = data.reasonForTransferUnd ?? "";
    this.notes = data.notes ?? "";
  }
}
