import GeneralModel from "./../../general/GeneralModel";
import UserPersonalCard from "./UserPersonalCard";
import UserPersonalCardsFilter from "./UserPersonalCardsFilter";
import defaultImg from "@/assets/images/UserPersonalCards.svg";

export default class UserPersonalCards extends GeneralModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.userPersonalCardsData = [];
    this.userPersonalCard = new UserPersonalCard();
    this.filterData = new UserPersonalCardsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.userPersonalCardsData = data.userPersonalCardsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
