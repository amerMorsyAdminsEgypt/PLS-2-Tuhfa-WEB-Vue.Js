import GeneralModel from "./../../../general/GeneralModel";
import Certificate from "./Certificate";
import CertificatesFilter from "./CertificatesFilter";

export default class Certificates extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.certificatesData = [];
    this.certificate = new Certificate();
    this.filterData = new CertificatesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.certificatesData = data.certificatesData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
