import ActivationStatistics from "./../../models/general/ActivationStatistics";
import PlacesStatistics from "./PlacesStatistics";
import Place from "./Place";
import PlacesFilter from "./PlacesFilter";

export default class Places {
  constructor(modelName) {
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.placesStatistics = new PlacesStatistics();
    this.placesData = [];
    this.place = new Place();
    this.filterData = new PlacesFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort || [];
      this.activationStatistics.fillData(data.activationStatistics);
      this.placesStatistics.fillData(data.placesStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.placesData = data.placesData || [];
    } else {
      this.setInitialValue();
    }
  }
}
