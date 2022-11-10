import BaseFilterReport from "./../../general/BaseFilterReport";
import { FILTER_REPORT_TYPES } from "./../../../utils/constants";

export default class EducationalScheduleTimesFilterReport extends BaseFilterReport {
  constructor(filterReportType = FILTER_REPORT_TYPES.Default) {
    super();
    this.filterReportType = filterReportType;
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseFilterReport();
    switch (this.filterReportType) {
      case FILTER_REPORT_TYPES.Group:
      default:
        this.educationalGroupToken = ""; //parent
        this.employeeTokens = []; //child
        this.studentUserToken = ""; //child
        this.placeTokens = []; //child
        break;
      case FILTER_REPORT_TYPES.Place:
        this.systemComponentHierarchyTokenPlace = "";
        this.systemComponentTokenPlace = "";
        this.placeTypeToken = "";
        this.placeToken = "";
        this.employeeTokens = [];
        this.studentUserToken = "";
        break;
      case FILTER_REPORT_TYPES.Employee:
        this.employeeUserToken = "";
        this.educationalGroupTokens = [];
        this.placeTokens = [];
        break;
      case FILTER_REPORT_TYPES.Student:
        this.studentUserToken = "";
        this.employeeTokens = [];
        this.educationalGroupTokens = [];
        this.placeTokens = [];
        break;
      case FILTER_REPORT_TYPES.Attendance:
        this.educationalScheduleTimeToken = ""; //master
        this.educationalGroupToken = ""; //parent
        this.employeeTokens = []; //child
        this.studentTokens = []; //child
        this.placeTokens = []; //child
        break;
    }
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseFilterReport(data);
      switch (this.filterReportType) {
        case FILTER_REPORT_TYPES.Group:
        default:
          this.educationalGroupToken = data.educationalGroupToken ?? ""; //parent
          this.employeeTokens = data.employeeTokens ?? []; //child
          this.studentUserToken = data.studentUserToken ?? ""; //child
          this.placeTokens = data.placeTokens ?? []; //child
          break;
        case FILTER_REPORT_TYPES.Place:
          this.placeTypeToken = data.placeTypeToken ?? "";
          this.placeToken = data.placeToken ?? "";
          this.systemComponentHierarchyTokenPlace =
            data.systemComponentHierarchyTokenPlace ?? "";
          this.systemComponentTokenPlace = data.systemComponentTokenPlace ?? "";
          this.systemComponentHierarchyToken =
            data.systemComponentHierarchyToken ?? "";
          this.systemComponentToken = data.systemComponentToken ?? "";
          this.employeeTokens = data.employeeTokens ?? [];
          this.studentUserToken = data.studentUserToken ?? "";
          break;
        case FILTER_REPORT_TYPES.Employee:
          this.employeeUserToken = data.employeeUserToken ?? "";
          this.educationalGroupTokens = data.educationalGroupTokens ?? [];
          this.placeTokens = data.placeTokens ?? [];
          break;
        case FILTER_REPORT_TYPES.Student:
          this.studentUserToken = data.studentUserToken ?? "";
          this.employeeTokens = data.employeeTokens ?? [];
          this.educationalGroupTokens = data.educationalGroupTokens ?? [];
          this.placeTokens = data.placeTokens ?? [];
          break;
        case FILTER_REPORT_TYPES.Attendance:
          this.educationalScheduleTimeToken =
            data.educationalScheduleTimeToken ?? ""; //master
          this.educationalGroupToken = data.educationalGroupToken ?? ""; //parent
          this.employeeTokens = data.employeeTokens ?? []; //child
          this.studentTokens = data.studentTokens ?? []; //child
          this.placeTokens = data.placeTokens ?? []; //child
          break;
      }
    } else {
      this.setInitialValue();
    }
  }
}
