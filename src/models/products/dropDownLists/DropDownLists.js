import GeneralModel from "./../../general/GeneralModel";
import DropDownList from "./DropDownList";
import DropDownListsFilter from "./DropDownListsFilter";

export default class DropDownLists extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.dropDownListsData = [];
    this.dropDownList = new DropDownList();
    this.filterData = new DropDownListsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.dropDownListsData = data.dropDownListsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
