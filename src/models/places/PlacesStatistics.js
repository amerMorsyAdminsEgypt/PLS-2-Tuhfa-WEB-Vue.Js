import ActivationStatistics from "./../../models/general/ActivationStatistics";

export default class PlacesStatistics extends ActivationStatistics {
  constructor() {
    super();
    this.setPlacesStatisticsInitialValue();
  }
  setPlacesStatisticsInitialValue() {
    this.setInitialValue();
    this.totalPlaceAdminsEgyptCount = 0;
    this.placeAdminsEgyptPercentage = 0;
    this.placeAdminsEgyptPercentageText = "";
    this.totalPlaceMasterAdminCount = 0;
    this.placeMasterAdminPercentage = 0;
    this.placeMasterAdminPercentageText = "";
    this.totalPlaceEmployeeCount = 0;
    this.placeEmployeePercentage = 0;
    this.placeEmployeePercentageText = "";
    this.totalPlaceStudentCount = 0;
    this.placeStudentPercentage = 0;
    this.placeStudentPercentageText = "";
    this.totalPlaceSupplierCount = 0;
    this.placeSupplierPercentage = 0;
    this.placeSupplierPercentageText = "";
    this.totalPlaceParentCount = 0;
    this.placeParentPercentage = 0;
    this.placeParentPercentageText = "";
    this.totalPlaceClientCount = 0;
    this.placeClientPercentage = 0;
    this.placeClientPercentageText = "";
    this.totalPlaceVechileOwnerCount = 0;
    this.placeVechileOwnerPercentage = 0;
    this.placeVechileOwnerPercentageText = "";
    this.totalPlaceClientCount = 0;
    this.placeClientPercentage = 0;
    this.placeClientPercentageText = "";
    this.totalPlaceSupplierCount = 0;
    this.placeSupplierPercentage = 0;
    this.placeSupplierPercentageText = "";
    this.totalPlaceParentCount = 0;
    this.placeParentPercentage = 0;
    this.placeParentPercentageText = "";
    this.totalPlaceClientCount = 0;
    this.placeClientPercentage = 0;
    this.placeClientPercentageText = "";
    this.totalPlaceOtherCount = 0;
    this.placeOtherPercentage = 0;
    this.placeOtherPercentageText = "";
  }
  fillPlacesStatisticsData(data) {
    if (data) {
      this.fillData(data);
      this.totalPlaceAdminsEgyptCount = data.totalPlaceAdminsEgyptCount ?? 0;
      this.placeAdminsEgyptPercentage = data.placeAdminsEgyptPercentage ?? 0;
      this.placeAdminsEgyptPercentageText =
        data.placeAdminsEgyptPercentageText ?? "";
      this.totalPlaceMasterAdminCount = data.totalPlaceMasterAdminCount ?? 0;
      this.placeMasterAdminPercentage = data.placeMasterAdminPercentage ?? 0;
      this.placeMasterAdminPercentageText =
        data.placeMasterAdminPercentageText ?? "";
      this.totalPlaceEmployeeCount = data.totalPlaceEmployeeCount ?? 0;
      this.placeEmployeePercentage = data.placeEmployeePercentage ?? 0;
      this.placeEmployeePercentageText = data.placeEmployeePercentageText ?? "";
      this.totalPlaceStudentCount = data.totalPlaceStudentCount ?? 0;
      this.placeStudentPercentage = data.placeStudentPercentage ?? 0;
      this.placeStudentPercentageText = data.placeStudentPercentageText ?? "";
      this.totalPlaceSupplierCount = data.totalPlaceSupplierCount ?? 0;
      this.placeSupplierPercentage = data.placeSupplierPercentage ?? 0;
      this.placeSupplierPercentageText = data.placeSupplierPercentageText ?? "";
      this.totalPlaceParentCount = data.totalPlaceParentCount ?? 0;
      this.placeParentPercentage = data.placeParentPercentage ?? 0;
      this.placeParentPercentageText = data.placeParentPercentageText ?? "";
      this.totalPlaceClientCount = data.totalPlaceClientCount ?? 0;
      this.placeClientPercentage = data.placeClientPercentage ?? 0;
      this.placeClientPercentageText = data.placeClientPercentageText ?? "";
      this.totalPlaceVechileOwnerCount = data.totalPlaceVechileOwnerCount ?? 0;
      this.placeVechileOwnerPercentage = data.placeVechileOwnerPercentage ?? 0;
      this.placeVechileOwnerPercentageText =
        data.placeVechileOwnerPercentageText ?? "";
      this.totalPlaceClientCount = data.totalPlaceClientCount ?? 0;
      this.placeClientPercentage = data.placeClientPercentage ?? 0;
      this.placeClientPercentageText = data.placeClientPercentageText ?? "";
      this.totalPlaceSupplierCount = data.totalPlaceSupplierCount ?? 0;
      this.placeSupplierPercentage = data.placeSupplierPercentage ?? 0;
      this.placeSupplierPercentageText = data.placeSupplierPercentageText ?? "";
      this.totalPlaceParentCount = data.totalPlaceParentCount ?? 0;
      this.placeParentPercentage = data.placeParentPercentage ?? 0;
      this.placeParentPercentageText = data.placeParentPercentageText ?? "";
      this.totalPlaceClientCount = data.totalPlaceClientCount ?? 0;
      this.placeClientPercentage = data.placeClientPercentage ?? 0;
      this.placeClientPercentageText = data.placeClientPercentageText ?? "";
      this.totalPlaceOtherCount = data.totalPlaceOtherCount ?? 0;
      this.placeOtherPercentage = data.placeOtherPercentage ?? 0;
      this.placeOtherPercentageText = data.placeOtherPercentageText ?? "";
    } else {
      this.setPlacesStatisticsInitialValue();
    }
  }
}
