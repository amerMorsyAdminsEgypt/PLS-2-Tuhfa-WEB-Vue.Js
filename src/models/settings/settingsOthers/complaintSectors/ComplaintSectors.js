import GeneralModel from "./../../../general/GeneralModel";
import ComplaintSector from "./ComplaintSector";
import ComplaintSectorsFilter from "./ComplaintSectorsFilter";

export default class ComplaintSectors extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.complaintSectorsData = [];
    this.complaintSector = new ComplaintSector();
    this.filterData = new ComplaintSectorsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.complaintSectorsData = data.complaintSectorsData || [];
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
