import { getUserAuthorizeToken } from "./../../../utils/functions";
import QuotationPriceHistoryDtoItem from "./QuotationPriceHistoryDtoItem";
import defaultImg from "@/assets/images/QuotationPriceHistories.svg";

export default class QuotationPriceHistoryModel {
  icon = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.quotationPriceHistoryDtoItemList = [];
  }
  fillData(data) {
    if (data) {
      this.quotationPriceHistoryDtoItemList = [];

      if (
        data.quotationPriceHistoryDtoItemList != null &&
        data.quotationPriceHistoryDtoItemList.length > 0
      ) {
        this.quotationPriceHistoryDtoItemList =
          data.quotationPriceHistoryDtoItemList.map((element) => {
            return new QuotationPriceHistoryDtoItem(element);
          });
      }
    } else {
      this.setInitialValue();
    }
  }
}
