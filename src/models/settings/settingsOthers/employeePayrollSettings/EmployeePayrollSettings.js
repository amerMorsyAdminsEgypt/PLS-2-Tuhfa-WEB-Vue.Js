import GeneralModel from "./../../../general/GeneralModel";
import EmployeePayrollSettingModel from "./EmployeePayrollSettingModel";
import EmployeePayrollSetting from "./EmployeePayrollSetting";
import EmployeePayrollSettingsFilter from "./EmployeePayrollSettingsFilter";

export default class EmployeePayrollSettings extends GeneralModel {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.employeePayrollSettingsData = [];
    this.employeePayrollSettingModel = new EmployeePayrollSettingModel();
    this.employeePayrollSetting = new EmployeePayrollSetting();
    this.filterData = new EmployeePayrollSettingsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.employeePayrollSettingsData = data.employeePayrollSettingsData || [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}
