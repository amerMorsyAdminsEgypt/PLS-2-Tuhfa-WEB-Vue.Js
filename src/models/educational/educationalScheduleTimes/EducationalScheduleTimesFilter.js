import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalScheduleTimesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.educationalScheduleTimes
        .activationTypeTokens || [];
    this.studentUserToken = "";
    this.employeeTokens = [];
    this.educationalGroupTokens = [];
    this.placeTokens = [];
    this.educationalCategoryToken = "";
    this.systemComponentHierarchyToken = "";
    this.systemComponentToken = "";
    this.dateTimeFromStartSearch = "";
    this.dateTimeFromEndSearch = "";
    this.dateTimeToStartSearch = "";
    this.dateTimeToEndSearch = "";
    this.calendarSearchType = "";
    this.calendarYear = "";
    this.calendarMonth = "";
    this.calendarDay = "";
    this.calendarWeek = "";
    this.dateTimeStartSearch = "";
    this.dateTimeEndSearch = "";
    this.placeInfoDataInclude = false;
    this.educationalGroupInfoDataInclude = false;
    this.employeesDataInclude = false;
    this.studentsDataInclude = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.studentUserToken = data.studentUserToken || "";
      this.employeeTokens = data.employeeTokens || [];
      this.educationalGroupTokens = data.educationalGroupTokens || [];
      this.placeTokens = data.placeTokens || [];
      this.educationalCategoryToken = data.educationalCategoryToken || "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken || "";
      this.systemComponentToken = data.systemComponentToken || "";
      this.dateTimeFromStartSearch = data.dateTimeFromStartSearch || "";
      this.dateTimeFromEndSearch = data.dateTimeFromEndSearch || "";
      this.dateTimeToStartSearch = data.dateTimeToStartSearch || "";
      this.dateTimeToEndSearch = data.dateTimeToEndSearch || "";
      this.calendarSearchType = data.calendarSearchType || "";
      this.calendarYear = data.calendarYear || "";
      this.calendarMonth = data.calendarMonth || "";
      this.calendarDay = data.calendarDay || "";
      this.calendarWeek = data.calendarWeek || "";
      this.dateTimeStartSearch = data.dateTimeStartSearch || "";
      this.dateTimeEndSearch = data.dateTimeEndSearch || "";
      this.placeInfoDataInclude = data.placeInfoDataInclude || false;
      this.educationalGroupInfoDataInclude =
        data.educationalGroupInfoDataInclude || false;
      this.employeesDataInclude = data.employeesDataInclude || false;
      this.studentsDataInclude = data.studentsDataInclude || false;
    } else {
      this.setInitialValue();
    }
  }
}
