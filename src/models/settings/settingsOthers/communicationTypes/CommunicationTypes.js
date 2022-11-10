import GeneralModel from "./../../../general/GeneralModel";
import CommunicationType from "./CommunicationType";
import CommunicationTypesFilter from "./CommunicationTypesFilter";

export default class CommunicationTypes extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.communicationTypesData = [];
    this.communicationType = new CommunicationType();
    this.filterData = new CommunicationTypesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.communicationTypesData = data.communicationTypesData || [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
