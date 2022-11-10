import { getUserAuthorizeToken } from "./../../../utils/functions";
import defaultImg from "@/assets/images/sendToClient.svg";

export default class ResendPriceQuotationToClientModel {
  icon = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userAuthorizeToken = getUserAuthorizeToken();
    this.priceQuotationHistoryDtoItemList = [];
  }
  fillData(data) {
    if (data) {
      this.priceQuotationHistoryDtoItemList = [];
      if (
        data.priceQuotationHistoryDtoItemList != null &&
        data.priceQuotationHistoryDtoItemList.length > 0
      ) {
        this.priceQuotationHistoryDtoItemList =
          data.priceQuotationHistoryDtoItemList.map((element) => {
            return {
              priceQuotationToken: element.priceQuotationToken,
            };
          });
      }
    } else {
      this.setInitialValue();
    }
  }
}
