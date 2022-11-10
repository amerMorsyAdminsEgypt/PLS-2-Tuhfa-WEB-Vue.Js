import UserInfoData from "./../../users/UserInfoData";

export default class LastPriceQuotationHistoryWorkInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.quotationDetailsHistoryWorkToken = "";
    this.fullCode = "";
    this.priceQuotationDetailsToken = "";
    this.creationDateTime = "";
    this.creationDateTimeCustomized = "";
    this.creationDate = "";
    this.creationTime = "";
    this.createdByUserToken = "";
    this.userCreatedData = new UserInfoData();
    this.quotationDetailsHistoryWorkNotes = "";
    this.quotationDetailsHistoryWorkTypeToken = "";
    this.quotationDetailsHistoryWorkTypeNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.quotationDetailsHistoryWorkToken =
        data.quotationDetailsHistoryWorkToken ?? "";
      this.fullCode = data.fullCode ?? "";
      this.priceQuotationDetailsToken = data.priceQuotationDetailsToken ?? "";
      this.creationDateTime = data.creationDateTime ?? "";
      this.creationDateTimeCustomized = data.creationDateTimeCustomized ?? "";
      this.creationDate = data.creationDate ?? "";
      this.creationTime = data.creationTime ?? "";
      this.createdByUserToken = data.createdByUserToken ?? "";
      this.userCreatedData.fillData(data.userCreatedData);
      this.quotationDetailsHistoryWorkNotes =
        data.quotationDetailsHistoryWorkNotes ?? "";
      this.quotationDetailsHistoryWorkTypeToken =
        data.quotationDetailsHistoryWorkTypeToken ?? "";
      this.quotationDetailsHistoryWorkTypeNameCurrent =
        data.quotationDetailsHistoryWorkTypeNameCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
