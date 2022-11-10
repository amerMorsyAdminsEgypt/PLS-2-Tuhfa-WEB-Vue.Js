import { fullPathFileFromServer } from "./functions";
import store from "./../store";
import i18n from "./../i18n";
import { STATUS } from "./constants";
import { ACTIVATION_TYPE, PLACE_TYPE_TOKENS } from "./constantLists";
const ACTIVATION_TYPE_TOKENS = ACTIVATION_TYPE.Active;

//#region Users
import Users from "./../models/users/Users";
import apiUser from "./../api/user";

export const getUsersDialog = async (params) => {
  let modelName = params.modelName || "";
  let users = new Users(modelName);
  users.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    users.filterData.userTypeToken = params.userTypeToken || "";
    users.filterData.userActivityTypeToken = params.userActivityTypeToken ?? "";
    users.filterData.educationalGroupToken = params.educationalGroupToken ?? "";

    const response = await apiUser.getDialog(users.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            users.user.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: users.user.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: users.user.defaultImg,
    });
  }
  return options;
};

export const getUsersDialogCustomized = async (params) => {
  let modelName = params.modelName || "";
  let users = new Users(modelName);
  users.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let error = null;
  let options = [];
  try {
    users.filterData.userTypeToken = params.userTypeToken || "";
    users.filterData.notInPlaceToken = params.notInPlaceToken ?? "";

    const response = await apiUser.getAll(users.filterData);
    const itemsData = response.data.usersData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["userToken"],
          userNameCurrent: itemsData[item]["userNameCurrent"],
          phone: itemsData[item]["userPhoneWithCC"],
          fullCode: itemsData[item]["fullCode"],
          userName: itemsData[item]["userName"],
          image: fullPathFileFromServer(
            itemsData[item]["userImagePath"],
            users.user.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      error = response.data.msg;
    }
  } catch (e) {
    error = i18n.t("errorCatch");
  }
  return [options, error];
};
//#endregion Users

//#region EducationalCategories
import EducationalCategories from "./../models/educational/educationalCategories/EducationalCategories";
import apiEducationalCategories from "./../api/educational/educationalCategories";

export const getEducationalCategoriesDialog = async (params = {}) => {
  let educationalCategories = new EducationalCategories();
  educationalCategories.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    educationalCategories.filterData.educationalCategoryToken =
      params.educationalCategoryToken || "";
    educationalCategories.filterData.gradingPlanToken =
      params.gradingPlanToken || "";
    educationalCategories.filterData.parentEducationalCategoryToken =
      params.parentEducationalCategoryToken || "";
    educationalCategories.filterData.systemComponentToken =
      params.systemComponentToken || "";
    educationalCategories.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken || "";
    educationalCategories.filterData.gradingPlanDataInclude =
      params.gradingPlanDataInclude || false;
    educationalCategories.filterData.systemComponentDataInclude =
      params.systemComponentDataInclude || false;
    educationalCategories.filterData.systemComponentsHierarchyDataInclude =
      params.systemComponentsHierarchyDataInclude || false;
    educationalCategories.filterData.parentEducationalCategoryDataInclude =
      params.parentEducationalCategoryDataInclude || false;
    //#endregion Filter

    const response = await apiEducationalCategories.getDialog(
      educationalCategories.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalCategories.educationalCategory.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalCategories.educationalCategory.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalCategories.educationalCategory.defaultImg,
    });
  }
  return options;
};
//#endregion EducationalCategories

//#region EducationalGroups
import EducationalGroups from "./../models/educational/educationalGroups/EducationalGroups";
import apiEducationalGroups from "./../api/educational/educationalGroups";

export const getEducationalGroupsDialog = async (params = {}) => {
  let educationalGroups = new EducationalGroups();
  educationalGroups.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  educationalGroups.filterData.educationalCategoryToken =
    params.educationalCategoryToken ?? "";
  educationalGroups.filterData.studentUserToken = params.studentUserToken ?? "";
  educationalGroups.filterData.educationalGroupTerminationTypeToken =
    params.educationalGroupTerminationTypeToken ?? "";
  let options = [];
  try {
    const response = await apiEducationalGroups.getDialog(
      educationalGroups.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalGroups.educationalGroup.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalGroups.educationalGroup.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalGroups.educationalGroup.defaultImg,
    });
  }
  return options;
};
export const getEducationalGroupsDialogCustomized = async (params = {}) => {
  let educationalGroups = new EducationalGroups();
  educationalGroups.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalGroups.filterData.paginationStatus = false;
    educationalGroups.filterData.educationalCategoryInfoDataInclude = true;

    educationalGroups.filterData.educationalGroupToken =
      params.educationalGroupToken || "";

    educationalGroups.filterData.educationalGroupTerminationTypeToken =
      params.educationalGroupTerminationTypeToken ?? "";
    educationalGroups.filterData.educationalGroupClosedStateTypeToken =
      params.educationalGroupClosedStateTypeToken ?? "";

    const response = await apiEducationalGroups.getAll(
      educationalGroups.filterData
    );
    const itemsData = response.data.educationalGroupsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["educationalGroupToken"],
          text: itemsData[item]["educationalGroupNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["educationalGroupImagePath"],
            educationalGroups.educationalGroup.defaultImg
          ),
          educationalCategoryToken:
            itemsData[item]["educationalCategoryData"][
              "educationalCategoryToken"
            ],
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalGroups.educationalGroup.defaultImg,
        educationalCategoryToken: "",
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalGroups.educationalGroup.defaultImg,
      educationalCategoryToken: "",
    });
  }
  return options;
};
//#endregion EducationalGroups

//#region EducationalGroupUsers

//#region Students
import EducationalGroupStudents from "./../models/educational/educationalGroupStudents/EducationalGroupStudents";
import apiEducationalGroupStudent from "./../api/educational/educationalGroupStudents";

export const getEducationalGroupStudentsDialog = async (
  params = {},
  errorStatus = false
) => {
  let educationalGroupStudents = new EducationalGroupStudents();
  educationalGroupStudents.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  let error = null;
  try {
    educationalGroupStudents.filterData.paginationStatus = false;
    educationalGroupStudents.filterData.studentUserInfoDateInclude = true;

    educationalGroupStudents.filterData.educationalGroupToken =
      params.educationalGroupToken || "";

    const response = await apiEducationalGroupStudent.getAll(
      educationalGroupStudents.filterData
    );
    const itemsData = response.data.educationalGroupStudentsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["studentUserInfoDate"]
            ? itemsData[item]["studentUserInfoDate"]["userToken"]
            : "",
          text: itemsData[item]["studentUserInfoDate"]
            ? itemsData[item]["studentUserInfoDate"]["userNameCurrent"]
            : "",
          image: fullPathFileFromServer(
            itemsData[item]["studentUserInfoDate"]
              ? itemsData[item]["studentUserInfoDate"]["userImagePath"]
              : "",
            educationalGroupStudents.educationalGroupStudent.defaultImg
          ),

          educationalGroupStudentToken:
            itemsData[item]["educationalGroupStudentToken"],
          userNameCurrent: itemsData[item]["studentUserInfoDate"]
            ? itemsData[item]["studentUserInfoDate"]["userNameCurrent"]
            : "",
          userFullCode: itemsData[item]["studentUserInfoDate"]
            ? itemsData[item]["studentUserInfoDate"]["fullCode"]
            : "",

          subscriptionTypeNameCurrent:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionTypeNameCurrent"]
              : "",
          subscriptionRequestSessionsNumber:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionRequestSessionsNumber"]
              : "",
          subscriptionRemaningSessionsNumberCount:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionRemaningSessionsNumberCount"]
              : "",
          subscriptionFromDate:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionFromDate"]
              : "",
          subscriptionFromTime:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionFromTime"]
              : "",
          subscriptionToDate:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionToDate"]
              : "",
          subscriptionToTime:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["subscriptionToTime"]
              : "",
          canAttendaceStatus:
            itemsData[item]["educationalJoiningApplicationInfoDate"] &&
            itemsData[item]["educationalJoiningApplicationInfoDate"][
              "activeSubscriptionData"
            ]
              ? itemsData[item]["educationalJoiningApplicationInfoDate"][
                  "activeSubscriptionData"
                ]["canAttendaceStatus"]
              : false,
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      if (errorStatus) {
        error = response.data.msg;
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: educationalGroupStudents.educationalGroupStudent.defaultImg,
        });
      }
    }
  } catch (e) {
    if (errorStatus) {
      error = i18n.t("errorCatch");
    } else {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: educationalGroupStudents.educationalGroupStudent.defaultImg,
      });
    }
  }
  if (errorStatus) {
    return [options, error];
  } else {
    return options;
  }
};
//#endregion Students

//#region Employees
// import UserActiveSettingInfoData from "./../models/settings/settingsOthers/employeePayrollSettings/UserActiveSettingInfoData";
import EducationalGroupEmployees from "./../models/educational/educationalGroupEmployees/EducationalGroupEmployees";
import apiEducationalGroupEmployee from "./../api/educational/educationalGroupEmployees";

export const getEducationalGroupEmployeesDialog = async (
  params = {},
  errorStatus = false
) => {
  let educationalGroupEmployees = new EducationalGroupEmployees();
  educationalGroupEmployees.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  let error = null;
  try {
    educationalGroupEmployees.filterData.paginationStatus = false;

    educationalGroupEmployees.filterData.educationalGroupToken =
      params.educationalGroupToken || "";

    const response = await apiEducationalGroupEmployee.getAll(
      educationalGroupEmployees.filterData
    );
    const itemsData = response.data.educationalGroupEmployees;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["userToken"],
          userActiveSettingInfoData:
            itemsData[item]["userActiveSettingInfoData"] ?? null,
          text: itemsData[item]["userNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["userImagePath"],
            educationalGroupEmployees.educationalGroupEmployee.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      if (errorStatus) {
        error = response.data.msg;
      } else {
        options.push({
          value: "",
          userActiveSettingInfoData: null,
          text: response.data.msg,
          image: educationalGroupEmployees.educationalGroupEmployee.defaultImg,
        });
      }
    }
  } catch (e) {
    if (errorStatus) {
      error = i18n.t("errorCatch");
    } else {
      options.push({
        value: "",
        userActiveSettingInfoData: null,
        text: i18n.t("errorCatch"),
        image: educationalGroupEmployees.educationalGroupEmployee.defaultImg,
      });
    }
  }
  if (errorStatus) {
    return [options, error];
  } else {
    return options;
  }
};
//#endregion Employees

//#endregion EducationalGroupUsers

//#region EducationalScheduleTimes
import EducationalScheduleTimes from "./../models/educational/educationalScheduleTimes/EducationalScheduleTimes";
import apiEducationalScheduleTimes from "./../api/educational/educationalScheduleTimes";

export const getEducationalScheduleTimesDialog = async (params = {}) => {
  let educationalScheduleTimes = new EducationalScheduleTimes();
  educationalScheduleTimes.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalScheduleTimes.filterData.educationalGroupTokens =
      params.educationalGroupTokens || "";

    const response = await apiEducationalScheduleTimes.getDialog(
      educationalScheduleTimes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalScheduleTimes.educationalScheduleTime.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalScheduleTimes.educationalScheduleTime.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalScheduleTimes.educationalScheduleTime.defaultImg,
    });
  }
  return options;
};

export const getEducationalScheduleTimesDialogCustomized = async (
  params = {}
) => {
  let educationalScheduleTimes = new EducationalScheduleTimes();
  educationalScheduleTimes.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalScheduleTimes.filterData.paginationStatus = false;
    educationalScheduleTimes.filterData.educationalGroupTokens =
      params.educationalGroupTokens || "";
    educationalScheduleTimes.filterData.employeesDataInclude =
      params.employeesDataInclude || false;
    educationalScheduleTimes.filterData.studentsDataInclude =
      params.studentsDataInclude || false;

    //#region EducationalScheduleTimesReportFilter
    // educationalScheduleTimes.filterData.educationalGroupToken =
    //   params.educationalGroupToken || "";
    educationalScheduleTimes.filterData.employeeTokens =
      params.employeeTokens || "";
    educationalScheduleTimes.filterData.studentTokens =
      params.studentTokens || "";
    educationalScheduleTimes.filterData.placeTokens = params.placeTokens || "";
    educationalScheduleTimes.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken || "";
    educationalScheduleTimes.filterData.systemComponentToken =
      params.systemComponentToken || "";
    educationalScheduleTimes.filterData.educationalCategoryToken =
      params.educationalCategoryToken || "";
    educationalScheduleTimes.filterData.textSearch = params.textSearch || "";
    educationalScheduleTimes.filterData.dateTimeFromStartSearch =
      params.dateTimeFromStartSearch || "";
    educationalScheduleTimes.filterData.dateTimeFromEndSearch =
      params.dateTimeFromEndSearch || "";
    educationalScheduleTimes.filterData.dateTimeToStartSearch =
      params.dateTimeToStartSearch || "";
    educationalScheduleTimes.filterData.dateTimeToEndSearch =
      params.dateTimeToEndSearch || "";

    //#endregion EducationalScheduleTimesReportFilter

    const response = await apiEducationalScheduleTimes.getAll(
      educationalScheduleTimes.filterData
    );
    const itemsData = response.data.educationalScheduleTimesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["educationalScheduleTimeToken"],
          text: itemsData[item]["educationalScheduleTimeNameCurrent"],
          employeesData: itemsData[item]["employeesData"],
          studentsData: itemsData[item]["studentsData"],
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        employeesData: [],
        studentsData: [],
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      employeesData: [],
      studentsData: [],
    });
  }
  return options;
};
//#endregion EducationalScheduleTimes

//#region EducationalJoiningApplications
import EducationalJoiningApplications from "./../models/educational/educationalJoiningApplications/EducationalJoiningApplications";
import apiEducationalJoiningApplications from "./../api/educational/educationalJoiningApplications";

export const getEducationalJoiningApplicationsDialog = async (params = {}) => {
  let educationalJoiningApplications = new EducationalJoiningApplications();
  educationalJoiningApplications.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalJoiningApplications.filterData.educationalCategoryInfoDataInclude = true;
    educationalJoiningApplications.filterData.approvalUserInfoDataInclude = true;

    educationalJoiningApplications.filterData.educationalGroupToken =
      params.educationalGroupToken || "";
    educationalJoiningApplications.filterData.educationalCategoryToken =
      params.educationalCategoryToken || "";
    educationalJoiningApplications.filterData.approvalTypeToken =
      params.approvalTypeToken || "";
    educationalJoiningApplications.filterData.relatedTypeToken =
      params.relatedTypeToken || "";
    educationalJoiningApplications.filterData.userStudentToken =
      params.userStudentToken ?? "";

    const response = await apiEducationalJoiningApplications.getDialog(
      educationalJoiningApplications.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalJoiningApplications.educationalJoiningApplication
              .defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image:
          educationalJoiningApplications.educationalJoiningApplication
            .defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image:
        educationalJoiningApplications.educationalJoiningApplication.defaultImg,
    });
  }
  return options;
};
export const getEducationalJoiningApplicationsDialogCustomized = async (
  params = {}
) => {
  let educationalJoiningApplications = new EducationalJoiningApplications();
  educationalJoiningApplications.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;

  let error = null;
  let options = [];
  try {
    educationalJoiningApplications.filterData.paginationStatus = false;
    educationalJoiningApplications.filterData.educationalCategoryInfoDataInclude = true;
    educationalJoiningApplications.filterData.userStudentInfoDataInclude = true;

    educationalJoiningApplications.filterData.educationalGroupToken =
      params.educationalGroupToken || "";
    educationalJoiningApplications.filterData.educationalCategoryToken =
      params.educationalCategoryToken || "";
    educationalJoiningApplications.filterData.approvalTypeToken =
      params.approvalTypeToken || "";
    educationalJoiningApplications.filterData.relatedTypeToken =
      params.relatedTypeToken || "";

    const response = await apiEducationalJoiningApplications.getAll(
      educationalJoiningApplications.filterData
    );
    const itemsData = response.data.educationalJoiningApplicationsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["educationalJoiningApplicationToken"],
          text: itemsData[item]["educationalJoiningApplicationNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["userStudentInfoData"]
              ? itemsData[item]["userStudentInfoData"]["userImagePath"]
              : "",
            educationalJoiningApplications.educationalJoiningApplication
              .defaultImg
          ),
          fullCode: itemsData[item]["fullCode"],
          userNameCurrent: itemsData[item]["userStudentInfoData"]
            ? itemsData[item]["userStudentInfoData"]["userNameCurrent"]
            : "",
          userFullCode: itemsData[item]["userStudentInfoData"]
            ? itemsData[item]["userStudentInfoData"]["fullCode"]
            : "",
          educationalCategoryNameCurrent: itemsData[item][
            "educationalCategoryData"
          ]
            ? itemsData[item]["educationalCategoryData"][
                "educationalCategoryNameCurrent"
              ]
            : "",
          subscriptionTypeNameCurrent: itemsData[item]["activeSubscriptionData"]
            ? itemsData[item]["activeSubscriptionData"][
                "subscriptionTypeNameCurrent"
              ]
            : "",
          subscriptionRequestSessionsNumber: itemsData[item][
            "activeSubscriptionData"
          ]
            ? itemsData[item]["activeSubscriptionData"][
                "subscriptionRequestSessionsNumber"
              ]
            : "",
          subscriptionRemaningSessionsNumberCount: itemsData[item][
            "activeSubscriptionData"
          ]
            ? itemsData[item]["activeSubscriptionData"][
                "subscriptionRemaningSessionsNumberCount"
              ]
            : "",
          subscriptionFromDate: itemsData[item]["activeSubscriptionData"]
            ? itemsData[item]["activeSubscriptionData"]["subscriptionFromDate"]
            : "",
          subscriptionFromTime: itemsData[item]["activeSubscriptionData"]
            ? itemsData[item]["activeSubscriptionData"]["subscriptionFromTime"]
            : "",
          subscriptionToDate: itemsData[item]["activeSubscriptionData"]
            ? itemsData[item]["activeSubscriptionData"]["subscriptionToDate"]
            : "",
          subscriptionToTime: itemsData[item]["activeSubscriptionData"]
            ? itemsData[item]["activeSubscriptionData"]["subscriptionToTime"]
            : "",
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      error = response.data.msg;
    }
  } catch (e) {
    error = i18n.t("errorCatch");
  }
  return [options, error];
};
//#endregion EducationalJoiningApplications

//#region EducationalPeriods
import EducationalPeriods from "./../models/educational/educationalPeriods/EducationalPeriods";
import apiEducationalPeriods from "./../api/educational/educationalPeriods";

export const getEducationalPeriodsDialog = async () => {
  let educationalPeriods = new EducationalPeriods();
  educationalPeriods.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiEducationalPeriods.getDialog(
      educationalPeriods.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalPeriods.educationalPeriod.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalPeriods.educationalPeriod.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalPeriods.educationalPeriod.defaultImg,
    });
  }
  return options;
};

//#endregion EducationalPeriods

//#region SimpleExamModels
import SimpleExamModels from "./../models/educational/simpleExamModels/SimpleExamModels";
import apiSimpleExamModels from "./../api/educational/simpleExamModels";

export const getSimpleExamModelsDialog = async () => {
  let simpleExamModels = new SimpleExamModels();
  simpleExamModels.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiSimpleExamModels.getDialog(
      simpleExamModels.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            simpleExamModels.simpleExamModel.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: simpleExamModels.simpleExamModel.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: simpleExamModels.simpleExamModel.defaultImg,
    });
  }
  return options;
};
//#endregion SimpleExamModels

//#region GroupScheduleExams
import GroupScheduleExams from "./../models/educational/groupScheduleExams/GroupScheduleExams";
import apiGroupScheduleExams from "./../api/educational/groupScheduleExams";

export const getGroupScheduleExamsDialog = async (params = {}) => {
  let groupScheduleExams = new GroupScheduleExams();
  groupScheduleExams.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    groupScheduleExams.filterData.educationalGroupToken =
      params.educationalGroupToken || "";

    const response = await apiGroupScheduleExams.getDialog(
      groupScheduleExams.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            groupScheduleExams.groupScheduleExam.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: groupScheduleExams.groupScheduleExam.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: groupScheduleExams.groupScheduleExam.defaultImg,
    });
  }
  return options;
};
//#endregion GroupScheduleExams

//#region Places
import Places from "./../models/places/Places";
import apiPlace from "./../api/place";

export const getPlacesDialog = async (params = {}) => {
  let modelName = "";
  switch (params.placeTypeToken) {
    case PLACE_TYPE_TOKENS.MasterAdmin:
      modelName = "placeMasterAdmins";
      break;
    case PLACE_TYPE_TOKENS.Employee:
      modelName = "placeEmployees";
      break;
    case PLACE_TYPE_TOKENS.Student:
      modelName = "placeStudents";
      break;
    case PLACE_TYPE_TOKENS.Client:
      modelName = "placeClients";
      break;
    case PLACE_TYPE_TOKENS.Supplier:
      modelName = "placeSuppliers";
      break;
    case PLACE_TYPE_TOKENS.Parent:
      modelName = "placeParents";
      break;
    case PLACE_TYPE_TOKENS.Other:
      modelName = "placeOthers";
      break;
  }

  let places = new Places(modelName);
  places.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    places.filterData.placeTypeToken = params.placeTypeToken;
    const response = await apiPlace.getDialog(places.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            places.place.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: places.place.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: places.place.defaultImg,
    });
  }
  return options;
};

export const getPlacesDialogCustomized = async (params) => {
  let modelName = params.modelName || "";
  let places = new Places(modelName);
  places.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let error = null;
  let options = [];
  try {
    places.filterData.placeTypeToken = params.placeTypeToken || "";
    places.filterData.notWithUserToken = params.notWithUserToken ?? "";

    const response = await apiPlace.getAll(places.filterData);
    const itemsData = response.data.placesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["placeToken"],
          placeNameCurrent: itemsData[item]["placeNameCurrent"],
          phone: itemsData[item]["placePhoneWithCC"],
          fullCode: itemsData[item]["fullCode"],
          image: fullPathFileFromServer(
            itemsData[item]["placeImagePath"],
            places.place.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      error = response.data.msg;
    }
  } catch (e) {
    error = i18n.t("errorCatch");
  }
  return [options, error];
};
//#endregion Places

//#region EducationalGroupPlaces
import EducationalGroupPlaces from "./../models/educational/educationalGroupPlaces/EducationalGroupPlaces";
import apiEducationalGroupPlace from "./../api/educational/educationalGroupPlaces";

export const getEducationalGroupPlacesDialog = async (params = {}) => {
  let educationalGroupPlaces = new EducationalGroupPlaces();
  educationalGroupPlaces.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalGroupPlaces.filterData.paginationStatus = false;

    educationalGroupPlaces.filterData.educationalGroupToken =
      params.educationalGroupToken || "";

    const response = await apiEducationalGroupPlace.getAll(
      educationalGroupPlaces.filterData
    );
    const itemsData = response.data.educationalGroupPlaces;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["placeToken"],
          text: itemsData[item]["placeNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["placeImagePath"],
            educationalGroupPlaces.educationalGroupPlace.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalGroupPlaces.educationalGroupPlace.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalGroupPlaces.educationalGroupPlace.defaultImg,
    });
  }
  return options;
};
//#endregion EducationalGroupPlaces

//#region SystemComponents
import SystemComponents from "./../models/systemConfiguration/systemComponents/SystemComponents";
import apiSystemComponent from "./../api/systemComponent";

export const getSystemComponentsDialog = async (params) => {
  let modelName = params.modelName ?? "";
  let systemComponents = new SystemComponents(modelName);
  systemComponents.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    systemComponents.filterData.systemTypeToken = params.systemTypeToken ?? "";

    const response = await apiSystemComponent.getDialog(
      systemComponents.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            systemComponents.systemComponent.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: systemComponents.systemComponent.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: systemComponents.systemComponent.defaultImg,
    });
  }
  return options;
};
//#endregion SystemComponents

//#region Services
import Services from "./../models/services/Services";
import apiService from "./../api/service";

export const getServicesDialog = async () => {
  let services = new Services();
  services.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiService.getDialog(services.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            services.service.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: services.service.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: services.service.defaultImg,
    });
  }
  return options;
};
//#endregion Services

//#region CountedServices
import CountedServices from "./../models/countedServices/CountedServices";
import apiCountedService from "./../api/countedService";

export const getCountedServicesDialog = async () => {
  let countedServices = new CountedServices();
  countedServices.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiCountedService.getDialog(
      countedServices.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            countedServices.countedService.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: countedServices.countedService.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: countedServices.countedService.defaultImg,
    });
  }
  return options;
};
//#endregion CountedServices

//#region StorageSpaces
import StorageSpaces from "./../models/storageSpaces/StorageSpaces";
import apiStorageSpace from "./../api/storageSpace";

export const getStorageSpacesDialog = async (params) => {
  let storageSpaces = new StorageSpaces();
  storageSpaces.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    let modelName = params.modelName || "";
    let storageSpaceTypeToken = params.storageSpaceTypeToken || "";
    let mainToken = params.mainToken || "";
    storageSpaces.filterData.activationTypeTokens =
      store.getters.generalSetting[modelName].activationTypeTokens;
    storageSpaces.filterData.storageSpaceTypeToken = storageSpaceTypeToken;
    storageSpaces.filterData.mainToken = mainToken;

    const response = await apiStorageSpace.getDialog(storageSpaces.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            storageSpaces.storageSpace.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: storageSpaces.storageSpace.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: storageSpaces.storageSpace.defaultImg,
    });
  }
  return options;
};
//#endregion StorageSpaces

//#region PriorityTypes
import PriorityTypes from "./../models/settings/settingsOthers/priorityTypes/PriorityTypes";
import apiPriorityType from "./../api/settings/settingsOthers/priorityTypes";

export const getPriorityTypesDialog = async (params = "") => {
  let priorityTypes = new PriorityTypes();
  priorityTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  if (params) {
    priorityTypes.filterData.priorityScopeTypeToken =
      params.priorityScopeTypeToken || "";
  }

  let options = [];
  try {
    const response = await apiPriorityType.getDialog(priorityTypes.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            priorityTypes.priorityType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: priorityTypes.priorityType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: priorityTypes.priorityType.defaultImg,
    });
  }
  return options;
};
//#endregion PriorityTypes

//#region ComplaintTypes
import ComplaintTypes from "./../models/settings/settingsOthers/complaintTypes/ComplaintTypes";
import apiComplaintType from "./../api/settings/settingsOthers/complaintTypes";

export const getComplaintTypesDialog = async () => {
  let complaintTypes = new ComplaintTypes();
  complaintTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiComplaintType.getDialog(
      complaintTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            complaintTypes.complaintType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: complaintTypes.complaintType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: complaintTypes.complaintType.defaultImg,
    });
  }
  return options;
};
//#endregion ComplaintTypes

//#region ComplaintSectors
import ComplaintSectors from "./../models/settings/settingsOthers/complaintSectors/ComplaintSectors";
import apiComplaintSector from "./../api/settings/settingsOthers/complaintSectors";

export const getComplaintSectorsDialog = async () => {
  let complaintSectors = new ComplaintSectors();
  complaintSectors.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiComplaintSector.getDialog(
      complaintSectors.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            complaintSectors.complaintSector.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: complaintSectors.complaintSector.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: complaintSectors.complaintSector.defaultImg,
    });
  }
  return options;
};
//#endregion PrioritySectors

//#region ExpensesTypes
import ExpensesTypes from "./../models/settings/settingsOthers/expensesTypes/ExpensesTypes";
import apiExpensesType from "./../api/settings/settingsOthers/expensesTypes";

export const getExpensesTypesDialog = async () => {
  let expensesTypes = new ExpensesTypes();
  expensesTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiExpensesType.getDialog(expensesTypes.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            expensesTypes.expensesType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: expensesTypes.expensesType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: expensesTypes.expensesType.defaultImg,
    });
  }
  return options;
};

export const getExpensesTypesDialogFromAll = async () => {
  let expensesTypes = new ExpensesTypes();
  expensesTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let hasPromiseOptions = false;
  let options = [];
  try {
    const response = await apiExpensesType.getAll(expensesTypes.filterData);
    if (response.data.status == STATUS.SUCCESS) {
      const apiData = response.data.expensesTypesData;
      let promiseOptions = getExpensesTypesPromiseOptionsFromApiData(apiData);
      hasPromiseOptions = true;
      options = promiseOptions;
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        price: "",
        value: "",
        text: response.data.msg,
        image: expensesTypes.expensesType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      price: "",
      value: "",
      text: i18n.t("errorCatch"),
      image: expensesTypes.expensesType.defaultImg,
    });
  }
  let result = {
    hasPromiseOptions,
    options,
  };
  return result;
};

const getExpensesTypesPromiseOptionsFromApiData = async (apiData) => {
  let model = new ExpensesTypes().expensesType;
  let options = [];
  apiData.forEach((item) => {
    options.push({
      price: item.expensesTypeDefaultPrice,
      value: item.expensesTypeToken,
      text: item.expensesTypeNameCurrent,
      image: fullPathFileFromServer(
        item.expensesTypeImagePath,
        model.defaultImg
      ),
    });
  });
  return options;
};

//#endregion ExpensesTypes

//#region Expenses
import Expenses from "./../models/finance/expenses/Expenses";
import apiExpense from "./../api/finance/expenses";

export const getExpensesDialog = async (params = {}) => {
  let expenses = new Expenses();
  expenses.filterData.activatioTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    expenses.filterData.expensesTypeToken = params.expensesTypeToken || "";

    const response = await apiExpense.getAll(expenses.filterData);
    const itemsData = response.data.expensesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["expensesToken"],
          text: `${i18n.t("code")} ${itemsData[item]["fullCode"]}-${i18n.t(
            "general.value"
          )} ${itemsData[item]["expensesMoneyWithCurrency"]}`,
          image: fullPathFileFromServer(
            itemsData[item]["expensesImagePath"],
            expenses.expense.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: expenses.expense.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: expenses.expense.defaultImg,
    });
  }
  return options;
};

//#endregion Expenses

//#region RevenuesTypes
import RevenuesTypes from "./../models/settings/settingsOthers/revenuesTypes/RevenuesTypes";
import apiRevenuesType from "./../api/settings/settingsOthers/revenuesTypes";

export const getRevenuesTypesDialog = async () => {
  let revenuesTypes = new RevenuesTypes();
  revenuesTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiRevenuesType.getDialog(revenuesTypes.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            revenuesTypes.revenuesType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: revenuesTypes.revenuesType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: revenuesTypes.revenuesType.defaultImg,
    });
  }
  return options;
};

export const getRevenuesTypesDialogFromAll = async () => {
  let revenuesTypes = new RevenuesTypes();
  revenuesTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let hasPromiseOptions = false;
  let options = [];
  try {
    const response = await apiRevenuesType.getAll(revenuesTypes.filterData);
    if (response.data.status == STATUS.SUCCESS) {
      const apiData = response.data.revenuesTypesData;
      let promiseOptions = getRevenuesTypesPromiseOptionsFromApiData(apiData);
      hasPromiseOptions = true;
      options = promiseOptions;
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        price: "",
        value: "",
        text: response.data.msg,
        image: revenuesTypes.revenuesType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      price: "",
      value: "",
      text: i18n.t("errorCatch"),
      image: revenuesTypes.revenuesType.defaultImg,
    });
  }
  let result = {
    hasPromiseOptions,
    options,
  };
  return result;
};

const getRevenuesTypesPromiseOptionsFromApiData = async (apiData) => {
  let model = new RevenuesTypes().revenuesType;
  let options = [];
  apiData.forEach((item) => {
    options.push({
      price: item.revenuesTypeDefaultPrice,
      value: item.revenuesTypeToken,
      text: item.revenuesTypeNameCurrent,
      image: fullPathFileFromServer(
        item.revenuesTypeImagePath,
        model.defaultImg
      ),
    });
  });
  return options;
};
//#endregion RevenuesTypes

//#region Revenues
import Revenues from "./../models/finance/revenues/Revenues";
import apiRevenue from "./../api/finance/revenues";

export const getRevenuesDialog = async (params = {}) => {
  let revenues = new Revenues();
  revenues.filterData.activatioTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    revenues.filterData.revenuesTypeToken = params.revenuesTypeToken || "";
    const response = await apiRevenue.getAll(revenues.filterData);
    const itemsData = response.data.revenuesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["revenuesToken"],
          text: `${i18n.t("code")} ${itemsData[item]["fullCode"]}-${i18n.t(
            "general.value"
          )} ${itemsData[item]["revenuesMoneyWithCurrency"]}`,
          image: fullPathFileFromServer(
            itemsData[item]["revenuesImagePath"],
            revenues.revenue.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: revenues.revenue.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: revenues.revenue.defaultImg,
    });
  }
  return options;
};

//#endregion Revenues

//#region PaymentMethods
import PaymentMethods from "./../models/settings/settingsOthers/paymentMethods/PaymentMethods";
import apiPaymentMethod from "./../api/settings/settingsOthers/paymentMethods";

export const getPaymentMethodsDialog = async () => {
  let paymentMethods = new PaymentMethods();
  paymentMethods.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiPaymentMethod.getDialog(
      paymentMethods.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            paymentMethods.paymentMethod.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: paymentMethods.paymentMethod.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: paymentMethods.paymentMethod.defaultImg,
    });
  }
  return options;
};
//#endregion PaymentMethods

//#region GeographicalDistributions
import GeographicalDistributions from "./../models/settings/settingsOthers/geographicalDistributions/GeographicalDistributions";
import apiGeographicalDistribution from "./../api/settings/settingsOthers/geographicalDistributions";

export const getGeographicalDistributionsDialog = async (params = {}) => {
  let geographicalDistributions = new GeographicalDistributions();
  geographicalDistributions.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    geographicalDistributions.filterData.systemComponentToken =
      params.systemComponentToken ?? "";
    geographicalDistributions.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken ?? "";
    geographicalDistributions.filterData.parentGeographicalDistributionToken =
      params.parentGeographicalDistributionToken ?? "";
    //#endregion Filter

    const response = await apiGeographicalDistribution.getDialog(
      geographicalDistributions.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            geographicalDistributions.geographicalDistribution.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: geographicalDistributions.geographicalDistribution.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: geographicalDistributions.geographicalDistribution.defaultImg,
    });
  }
  return options;
};
//#endregion GeographicalDistributions

//#region MilitaryStatusTypes
import MilitaryStatusTypes from "./../models/settings/settingsOthers/militaryStatusTypes/MilitaryStatusTypes";
import apiMilitaryStatusType from "./../api/settings/settingsOthers/militaryStatusTypes";

export const getMilitaryStatusTypesDialog = async () => {
  let militaryStatusTypes = new MilitaryStatusTypes();
  militaryStatusTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiMilitaryStatusType.getDialog(
      militaryStatusTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            militaryStatusTypes.militaryStatusType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: militaryStatusTypes.militaryStatusType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: militaryStatusTypes.militaryStatusType.defaultImg,
    });
  }
  return options;
};
//#endregion MilitaryStatusTypes

//#region SocialStatuses
import SocialStatuses from "./../models/settings/settingsOthers/socialStatuses/SocialStatuses";
import apiSocialStatuse from "./../api/settings/settingsOthers/socialStatuses";

export const getSocialStatusesDialog = async () => {
  let socialStatuses = new SocialStatuses();
  socialStatuses.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiSocialStatuse.getDialog(
      socialStatuses.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            socialStatuses.socialStatuse.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: socialStatuses.socialStatuse.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: socialStatuses.socialStatuse.defaultImg,
    });
  }
  return options;
};
//#endregion SocialStatuses

//#region Banks
import Banks from "./../models/settings/settingsOthers/banks/Banks";
import apiBank from "./../api/settings/settingsOthers/banks";

export const getBanksDialog = async () => {
  let banks = new Banks();
  banks.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiBank.getDialog(banks.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            banks.bank.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: banks.bank.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: banks.bank.defaultImg,
    });
  }
  return options;
};
//#endregion Banks

//#region KnownMethods
import KnownMethods from "./../models/settings/settingsOthers/knownMethods/KnownMethods";
import apiKnownMethod from "./../api/settings/settingsOthers/knownMethods";

export const getKnownMethodsDialog = async () => {
  let knownMethods = new KnownMethods();
  knownMethods.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiKnownMethod.getDialog(knownMethods.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            knownMethods.knownMethod.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: knownMethods.knownMethod.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: knownMethods.knownMethod.defaultImg,
    });
  }
  return options;
};
//#endregion KnownMethods

//#region Qualifications
import Qualifications from "./../models/settings/settingsOthers/qualifications/Qualifications";
import apiQualification from "./../api/settings/settingsOthers/qualifications";

export const getQualificationsDialog = async (params = {}) => {
  let qualifications = new Qualifications();
  qualifications.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    qualifications.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiQualification.getDialog(
      qualifications.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            qualifications.qualification.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: qualifications.qualification.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: qualifications.qualification.defaultImg,
    });
  }
  return options;
};
//#endregion Qualifications

//#region EducationalStages
import EducationalStages from "./../models/settings/settingsOthers/educationalStages/EducationalStages";
import apiEducationalStage from "./../api/settings/settingsOthers/educationalStages";

export const getEducationalStagesDialog = async (params = {}) => {
  let educationalStages = new EducationalStages();
  educationalStages.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    educationalStages.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiEducationalStage.getDialog(
      educationalStages.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalStages.educationalStage.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalStages.educationalStage.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalStages.educationalStage.defaultImg,
    });
  }
  return options;
};
//#endregion EducationalStages

//#region Specialties
import Specialties from "./../models/settings/settingsOthers/specialties/Specialties";
import apiSpecialty from "./../api/settings/settingsOthers/specialties";

export const getSpecialtiesDialog = async (params = {}) => {
  let specialties = new Specialties();
  specialties.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    specialties.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiSpecialty.getDialog(specialties.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            specialties.specialty.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: specialties.specialty.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: specialties.specialty.defaultImg,
    });
  }
  return options;
};
//#endregion Specialties

//#region InjuryTypes
import InjuryTypes from "./../models/settings/settingsOthers/injuryTypes/InjuryTypes";
import apiInjuryType from "./../api/settings/settingsOthers/injuryTypes";

export const getInjuryTypesDialog = async (params = {}) => {
  let injuryTypes = new InjuryTypes();
  injuryTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    injuryTypes.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiInjuryType.getDialog(injuryTypes.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            injuryTypes.injuryType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: injuryTypes.injuryType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: injuryTypes.injuryType.defaultImg,
    });
  }
  return options;
};
//#endregion InjuryTypes

//#region OperationTypes
import OperationTypes from "./../models/settings/settingsOthers/operationTypes/OperationTypes";
import apiOperationType from "./../api/settings/settingsOthers/operationTypes";

export const getOperationTypesDialog = async (params = {}) => {
  let operationTypes = new OperationTypes();
  operationTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    operationTypes.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiOperationType.getDialog(
      operationTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            operationTypes.operationType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: operationTypes.operationType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: operationTypes.operationType.defaultImg,
    });
  }
  return options;
};
//#endregion OperationTypes

//#region Certificates
import Certificates from "./../models/settings/settingsOthers/certificates/Certificates";
import apiCertificate from "./../api/settings/settingsOthers/certificates";

export const getCertificatesDialog = async (params = {}) => {
  let certificates = new Certificates();
  certificates.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    certificates.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiCertificate.getDialog(certificates.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            certificates.certificate.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: certificates.certificate.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: certificates.certificate.defaultImg,
    });
  }
  return options;
};
//#endregion Certificates

//#region Religions
import Religions from "./../models/settings/settingsOthers/religions/Religions";
import apiReligion from "./../api/settings/settingsOthers/religions";

export const getReligionsDialog = async () => {
  let religions = new Religions();
  religions.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiReligion.getDialog(religions.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            religions.religion.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: religions.religion.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: religions.religion.defaultImg,
    });
  }
  return options;
};
//#endregion Religions

//#region ReportTemplates
import defaultImgReportTemplates from "@/assets/images/ReportTemplates.svg";
import apiReportTemplates from "./../api/settings/settingsOthers/reportTemplates";

export const getReportTemplatesDialog = async () => {
  let filterData = { activationTypeTokens: ACTIVATION_TYPE_TOKENS };
  let options = [];
  try {
    const response = await apiReportTemplates.getDialog(filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            defaultImgReportTemplates
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: defaultImgReportTemplates,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: defaultImgReportTemplates,
    });
  }
  return options;
};
//#endregion ReportTemplates

//#region InstallmentBatchTypes
import InstallmentBatchTypes from "./../models/settings/settingsOthers/installmentBatchTypes/InstallmentBatchTypes";
import apiInstallmentBatchType from "./../api/settings/settingsOthers/installmentBatchTypes";

export const getInstallmentBatchTypesDialog = async () => {
  let installmentBatchTypes = new InstallmentBatchTypes();
  installmentBatchTypes.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiInstallmentBatchType.getDialog(
      installmentBatchTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            installmentBatchTypes.installmentBatchType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: installmentBatchTypes.installmentBatchType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: installmentBatchTypes.installmentBatchType.defaultImg,
    });
  }
  return options;
};
//#endregion InstallmentBatchTypes

//#region EstablishmentRoles
import EstablishmentRoles from "./../models/settings/establishmentRoles/EstablishmentRoles";
import apiEstablishmentRole from "./../api/settings/establishmentRole";
import { USER_TYPE } from "./../utils/constantLists";

export const getEstablishmentRolesDialog = async (modelName) => {
  let establishmentRoles = new EstablishmentRoles(modelName);
  establishmentRoles.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region filter
    let userTypeToken = "";
    switch (modelName) {
      case "adminsEgyptEstablishmentsRole":
        userTypeToken = USER_TYPE.AdminsEgypt;
        break;
      case "masterAdminEstablishmentsRole":
        userTypeToken = USER_TYPE.MasterAdmin;
        break;
      case "employeeEstablishmentsRole":
        userTypeToken = USER_TYPE.Employee;
        break;
      case "studentEstablishmentsRole":
        userTypeToken = USER_TYPE.Student;
        break;
      case "supplierEstablishmentsRole":
        userTypeToken = USER_TYPE.Supplier;
        break;
      case "parentEstablishmentsRole":
        userTypeToken = USER_TYPE.Parent;
        break;
      case "clientEstablishmentsRole":
        userTypeToken = USER_TYPE.Client;
        break;
    }

    establishmentRoles.filterData.userTypeToken = userTypeToken;

    //#endregion filter
    const response = await apiEstablishmentRole.getDialog(
      establishmentRoles.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            establishmentRoles.establishmentRole.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: establishmentRoles.establishmentRole.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: establishmentRoles.establishmentRole.defaultImg,
    });
  }
  return options;
};
//#endregion EstablishmentRoles

//#region PersonalCardTypes
import PersonalCardTypes from "./../models/settings/settingsOthers/personalCardTypes/PersonalCardTypes";
import apiPersonalCardType from "./../api/settings/settingsOthers/personalCardTypes";

export const getPersonalCardTypesDialog = async () => {
  let personalCardTypes = new PersonalCardTypes();
  personalCardTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiPersonalCardType.getDialog(
      personalCardTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            personalCardTypes.personalCardType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: personalCardTypes.personalCardType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: personalCardTypes.personalCardType.defaultImg,
    });
  }
  return options;
};
//#endregion PersonalCardTypes

//#region JobGrades
import JobGrades from "./../models/settings/settingsOthers/jobGrades/JobGrades";
import apiJobGrade from "./../api/settings/settingsOthers/jobGrades";

export const getJobGradesDialog = async (params = {}) => {
  let jobGrades = new JobGrades();
  jobGrades.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    jobGrades.filterData.systemComponentToken =
      params.systemComponentToken ?? "";
    jobGrades.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken ?? "";
    jobGrades.filterData.parentJobGradeToken = params.parentJobGradeToken ?? "";

    jobGrades.filterData.getOnlyParentJobGrades =
      params.getOnlyParentJobGrades ?? false;
    jobGrades.filterData.getOnlyChildJobGrades =
      params.getOnlyChildJobGrades ?? false;
    jobGrades.filterData.systemComponentDataInclude =
      params.systemComponentDataInclude ?? false;
    jobGrades.filterData.systemComponentsHierarchyDataInclude =
      params.systemComponentsHierarchyDataInclude ?? false;
    jobGrades.filterData.parentJobGradeDataInclude =
      params.parentJobGradeDataInclude ?? false;
    //#endregion Filter

    const response = await apiJobGrade.getDialog(jobGrades.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            jobGrades.jobGrade.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: jobGrades.jobGrade.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: jobGrades.jobGrade.defaultImg,
    });
  }
  return options;
};
//#endregion JobGrades

//#region GeneralJobs
import GeneralJobs from "./../models/settings/settingsOthers/generalJobs/GeneralJobs";
import apiGeneralJob from "./../api/settings/settingsOthers/generalJobs";

export const getGeneralJobsDialog = async () => {
  let generalJobs = new GeneralJobs();
  generalJobs.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiGeneralJob.getDialog(generalJobs.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            generalJobs.generalJob.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: generalJobs.generalJob.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: generalJobs.generalJob.defaultImg,
    });
  }
  return options;
};
//#endregion GeneralJobs

//#region InsuranceCompanies
import InsuranceCompanies from "./../models/settings/settingsOthers/insuranceCompanies/InsuranceCompanies";
import apiInsuranceCompany from "./../api/settings/settingsOthers/insuranceCompanies";

export const getInsuranceCompaniesDialog = async () => {
  let insuranceCompanies = new InsuranceCompanies();
  insuranceCompanies.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiInsuranceCompany.getDialog(
      insuranceCompanies.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            insuranceCompanies.insuranceCompany.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: insuranceCompanies.insuranceCompany.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: insuranceCompanies.insuranceCompany.defaultImg,
    });
  }
  return options;
};
//#endregion InsuranceCompanies

//#region Countries
import Countries from "./../models/settings/settingsOthers/countries/Countries";
import apiCountry from "./../api/settings/settingsOthers/countries";

export const getCountriesDialog = async () => {
  let countries = new Countries();
  countries.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiCountry.getDialog(countries.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            countries.country.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: countries.country.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: countries.country.defaultImg,
    });
  }
  return options;
};
//#endregion Countries

//#region DropDownLists
import DropDownLists from "./../models/products/dropDownLists/DropDownLists";
import apiDropDownList from "./../api/products/dropDownLists";

export const getDropDownListsDialog = async () => {
  let dropDownLists = new DropDownLists();
  dropDownLists.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiDropDownList.getDialog(dropDownLists.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            dropDownLists.dropDownList.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: dropDownLists.dropDownList.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: dropDownLists.dropDownList.defaultImg,
    });
  }
  return options;
};
//#endregion DropDownLists

//#region PriceQuotations
import PriceQuotations from "./../models/products/priceQuotations/PriceQuotations";
import apiPriceQuotation from "./../api/products/priceQuotations";

export const getPriceQuotationsDialogCustomized = async (params = {}) => {
  let priceQuotations = new PriceQuotations();
  let options = [];
  try {
    priceQuotations.filterData.paginationStatus = false;
    priceQuotations.filterData.priceQuotationHistoryWorkTypeToken =
      params.priceQuotationHistoryWorkTypeToken;

    const response = await apiPriceQuotation.getAll(priceQuotations.filterData);
    const itemsData = response.data.priceQuotationsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["priceQuotationToken"],
          text: `${i18n.t("general.code")}: ${itemsData[item]["fullCode"]}`,
          image: fullPathFileFromServer(
            itemsData[item]["priceQuotationImagePath"],
            priceQuotations.priceQuotation.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: priceQuotations.priceQuotation.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: priceQuotations.priceQuotation.defaultImg,
    });
  }
  return options;
};
//#endregion PriceQuotations

//#region ClassificationDegrees
import ClassificationDegrees from "./../models/settings/settingsOthers/classificationDegrees/ClassificationDegrees";
import apiClassificationDegree from "./../api/settings/settingsOthers/classificationDegrees";

export const getClassificationDegreesDialog = async (params = {}) => {
  let classificationDegrees = new ClassificationDegrees();
  classificationDegrees.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    classificationDegrees.filterData.userToken = params.userToken ?? "";
    //#endregion Filter
    const response = await apiClassificationDegree.getDialog(
      classificationDegrees.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            classificationDegrees.classificationDegree.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: classificationDegrees.classificationDegree.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: classificationDegrees.classificationDegree.defaultImg,
    });
  }
  return options;
};
//#endregion ClassificationDegrees

//#region ScientificDegrees
import ScientificDegrees from "./../models/settings/settingsOthers/scientificDegrees/ScientificDegrees";
import apiScientificDegree from "./../api/settings/settingsOthers/scientificDegrees";

export const getScientificDegreesDialog = async () => {
  let scientificDegrees = new ScientificDegrees();
  scientificDegrees.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiScientificDegree.getDialog(
      scientificDegrees.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            scientificDegrees.scientificDegree.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: scientificDegrees.scientificDegree.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: scientificDegrees.scientificDegree.defaultImg,
    });
  }
  return options;
};
//#endregion ScientificDegrees

//#region RelativeRelationTypes
import RelativeRelationTypes from "./../models/settings/settingsOthers/relativeRelationTypes/RelativeRelationTypes";
import apiRelativeRelationType from "./../api/settings/settingsOthers/relativeRelationTypes";

export const getRelativeRelationTypesDialog = async () => {
  let relativeRelationTypes = new RelativeRelationTypes();
  relativeRelationTypes.filterData.activationTypeTokens =
    ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiRelativeRelationType.getDialog(
      relativeRelationTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            relativeRelationTypes.relativeRelationType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: relativeRelationTypes.relativeRelationType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: relativeRelationTypes.relativeRelationType.defaultImg,
    });
  }
  return options;
};
//#endregion RelativeRelationTypes

//#region GradingPlans
import GradingPlans from "./../models/settings/settingsOthers/gradingPlans/GradingPlans";
import apiGradingPlan from "./../api/settings/settingsOthers/gradingPlans";

export const getGradingPlansDialog = async () => {
  let gradingPlans = new GradingPlans();
  gradingPlans.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiGradingPlan.getDialog(gradingPlans.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            gradingPlans.gradingPlan.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: gradingPlans.gradingPlan.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: gradingPlans.gradingPlan.defaultImg,
    });
  }
  return options;
};
//#endregion GradingPlans

//#region PriceLists
import PriceLists from "./../models/settings/settingsOthers/priceLists/PriceLists";
import apiPriceList from "./../api/settings/settingsOthers/priceLists";

export const getPriceListsDialog = async () => {
  let priceLists = new PriceLists();
  priceLists.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiPriceList.getDialog(priceLists.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            priceLists.priceList.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: priceLists.priceList.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: priceLists.priceList.defaultImg,
    });
  }
  return options;
};
//#endregion PriceLists

//#region ServiceTypes
import ServiceTypes from "./../models/settings/settingsOthers/serviceTypes/ServiceTypes";
import apiServiceType from "./../api/settings/settingsOthers/serviceTypes";

export const getServiceTypesDialog = async () => {
  let serviceTypes = new ServiceTypes();
  serviceTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiServiceType.getDialog(serviceTypes.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            serviceTypes.serviceType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: serviceTypes.serviceType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: serviceTypes.serviceType.defaultImg,
    });
  }
  return options;
};
//#endregion ServiceTypes

//#region CountedServiceTypes
import CountedServiceTypes from "./../models/settings/settingsOthers/countedServiceTypes/CountedServiceTypes";
import apiCountedServiceType from "./../api/settings/settingsOthers/countedServiceTypes";

export const getCountedServiceTypesDialog = async () => {
  let countedServiceTypes = new CountedServiceTypes();
  countedServiceTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiCountedServiceType.getDialog(
      countedServiceTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            countedServiceTypes.countedServiceType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: countedServiceTypes.countedServiceType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: countedServiceTypes.countedServiceType.defaultImg,
    });
  }
  return options;
};
//#endregion CountedServiceTypes

//#region NewsCategories
import NewsCategories from "./../models/settings/settingsOthers/newsCategories/NewsCategories";
import apiNewsCategory from "./../api/settings/settingsOthers/newsCategories";

export const getNewsCategoriesDialog = async () => {
  let newsCategories = new NewsCategories();
  newsCategories.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiNewsCategory.getDialog(newsCategories.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            newsCategories.newsCategory.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: newsCategories.newsCategory.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: newsCategories.newsCategory.defaultImg,
    });
  }
  return options;
};
//#endregion NewsCategories

//#region Accounts
import Accounts from "./../models/finance/accounts/Accounts";
import apiAccount from "./../api/finance/accounts";

export const getAccountsDialog = async () => {
  let accounts = new Accounts();
  accounts.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiAccount.getDialog(accounts.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            accounts.account.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: accounts.account.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: accounts.account.defaultImg,
    });
  }
  return options;
};
//#endregion Accounts

//#region AccountTransactions
import AccountTransactions from "./../models/finance/accountTransactions/AccountTransactions";
import apiAccountTransaction from "./../api/finance/accountTransactions";

export const getAccountTransactionsDialog = async (params = {}) => {
  let accountTransactions = new AccountTransactions();
  accountTransactions.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    let filterData = {};
    if (params) {
      filterData = params;
    } else {
      filterData = accountTransactions.filterData;
    }
    const response = await apiAccountTransaction.getAll(filterData);

    const itemsData = response.data.accountTransactionsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["accountTransactionToken"],
          text: itemsData[item]["accountTransactionNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["accountTransactionImagePath"],
            accountTransactions.accountTransaction.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: accountTransactions.accountTransaction.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: accountTransactions.accountTransaction.defaultImg,
    });
  }
  return options;
};
//#endregion AccountTransactions

//#region Interests
import Interests from "./../models/followUps/interests/Interests";
import apiInterest from "./../api/followUps/interests";

export const getInterestsDialog = async () => {
  let interests = new Interests();
  interests.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiInterest.getDialog(interests.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            interests.interest.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: interests.interest.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: interests.account.defaultImg,
    });
  }
  return options;
};

import UserSysteamInterests from "./../models/followUps/userSysteamInterests/UserSysteamInterests";
import apiUserSysteamInterests from "./../api/followUps/userSysteamInterests";
export const getUserSysteamInterestsDialogCustomized = async (params = {}) => {
  let userSysteamInterests = new UserSysteamInterests();
  userSysteamInterests.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    userSysteamInterests.filterData.paginationStatus = false;
    userSysteamInterests.filterData.userToken = params.userToken || "";

    const response = await apiUserSysteamInterests.getAll(
      userSysteamInterests.filterData
    );
    const itemsData = response.data.userSysteamInterestsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["userSysteamInterestToken"],
          text: `${i18n.t("general.code")}: ${
            itemsData[item]["fullCode"]
          } - ${i18n.t("ConstantsListSelect.InterestTypesName")}: ${
            itemsData[item]["interestTypeNameCurrent"]
          } - ${i18n.t("description")}: ${
            itemsData[item]["systeamInterestDescriptionCurrent"]
          }`,
          userSysteamInterestToken: itemsData[item]["userSysteamInterestToken"],
          interestTypeToken: itemsData[item]["interestTypeToken"],
          interestStatusToken: itemsData[item]["interestStatusToken"],
          systeamInterestDescriptionAr:
            itemsData[item]["systeamInterestDescriptionAr"],
          systeamInterestDescriptionEn:
            itemsData[item]["systeamInterestDescriptionEn"],
          systeamInterestDescriptionUnd:
            itemsData[item]["systeamInterestDescriptionUnd"],
          systeamInterestNotes: itemsData[item]["systeamInterestNotes"],
          systeamInterestDateTimeFrom:
            itemsData[item]["systeamInterestDateTimeFrom"],
          systeamInterestDateTimeTo:
            itemsData[item]["systeamInterestDateTimeTo"],
          placeToken: itemsData[item]["placeToken"],
          educationalCategoryToken: itemsData[item]["educationalCategoryToken"],
          serviceToken: itemsData[item]["serviceToken"],
          competitionToken: itemsData[item]["competitionToken"],
          educationalGroupToken: itemsData[item]["educationalGroupToken"],
          priorityTypeToken: itemsData[item]["priorityTypeToken"],
          placeTypeToken: itemsData[item]["placeInfoData"]
            ? itemsData[item]["placeInfoData"]["placeTypeToken"]
            : "",
          educationalCategorySystemComponentHierarchyToken: itemsData[item][
            "educationalCategoryInfoData"
          ]
            ? itemsData[item]["educationalCategoryInfoData"][
                "systemComponentHierarchyToken"
              ]
            : "",
          educationalCategorySystemComponentToken: itemsData[item][
            "educationalCategoryInfoData"
          ]
            ? itemsData[item]["educationalCategoryInfoData"][
                "systemComponentToken"
              ]
            : "",
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: userSysteamInterests.userSysteamInterest.defaultImg,
        educationalCategoryToken: "",
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: userSysteamInterests.userSysteamInterest.defaultImg,
      educationalCategoryToken: "",
    });
  }
  return options;
};

import UserOtherInterests from "./../models/followUps/userOtherInterests/UserOtherInterests";
import apiUserOtherInterests from "./../api/followUps/userOtherInterests";
export const getUserOtherInterestsDialogCustomized = async (params = {}) => {
  let userOtherInterests = new UserOtherInterests();
  userOtherInterests.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    userOtherInterests.filterData.paginationStatus = false;
    userOtherInterests.filterData.userToken = params.userToken || "";

    const response = await apiUserOtherInterests.getAll(
      userOtherInterests.filterData
    );
    const itemsData = response.data.userOtherInterestsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["userOtherInterestToken"],
          text: `${i18n.t("general.code")}: ${
            itemsData[item]["fullCode"]
          } - ${i18n.t("general.name")}: ${
            itemsData[item]["interestTypeNameCurrent"]
          } - ${i18n.t("description")}: ${
            itemsData[item]["otherInterestDescriptionCurrent"]
          }`,
          userOtherInterestToken: itemsData[item]["userOtherInterestToken"],
          interestTypeToken: itemsData[item]["interestTypeToken"],
          interestStatusToken: itemsData[item]["interestStatusToken"],
          otherInterestNameAr: itemsData[item]["otherInterestNameAr"],
          otherInterestNameEn: itemsData[item]["otherInterestNameEn"],
          otherInterestNameUnd: itemsData[item]["otherInterestNameUnd"],
          otherInterestDescriptionAr:
            itemsData[item]["otherInterestDescriptionAr"],
          otherInterestDescriptionEn:
            itemsData[item]["otherInterestDescriptionEn"],
          otherInterestDescriptionUnd:
            itemsData[item]["otherInterestDescriptionUnd"],
          otherInterestNotes: itemsData[item]["otherInterestNotes"],
          otherInterestDateTimeFrom:
            itemsData[item]["otherInterestDateTimeFrom"],
          otherInterestDateTimeTo: itemsData[item]["otherInterestDateTimeTo"],
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: userOtherInterests.userOtherInterest.defaultImg,
        educationalCategoryToken: "",
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: userOtherInterests.userOtherInterest.defaultImg,
      educationalCategoryToken: "",
    });
  }
  return options;
};
//#endregion Interests

//#region CommunicationTypes
import CommunicationTypes from "./../models/settings/settingsOthers/communicationTypes/CommunicationTypes";
import apiCommunicationType from "./../api/settings/settingsOthers/communicationTypes";

export const getCommunicationTypesDialog = async () => {
  let communicationTypes = new CommunicationTypes();
  communicationTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiCommunicationType.getDialog(
      communicationTypes.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            communicationTypes.communicationType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: communicationTypes.communicationType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: communicationTypes.communicationType.defaultImg,
    });
  }
  return options;
};
//#endregion CommunicationTypes

//#region Complaints
import Complaints from "./../models/complaints/complaints/Complaints";
import apiComplaint from "./../api/complaint/complaints";

export const getComplaintsDialog = async (params = {}) => {
  let complaints = new Complaints();
  complaints.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    // filter
    complaints.filterData.complainingPersonUserToken =
      params.complainingPersonUserToken ?? "";

    const response = await apiComplaint.getDialog(complaints.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            complaints.complaint.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: complaints.complaint.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: complaints.complaint.defaultImg,
    });
  }
  return options;
};
//#endregion Complaints

//#region Debts
import Debts from "./../models/joiningApplications/debts/Debts";
import apiDebt from "./../api/joiningApplications/debts";

export const getDebtsDialog = async (params = {}) => {
  let debts = new Debts();
  debts.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    debts.filterData.userToken = params.userToken || "";
    debts.filterData.schedulingStatusTypeToken =
      params.schedulingStatusTypeToken ?? "";

    const response = await apiDebt.getDialog(debts.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            debts.debt.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: debts.debt.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: debts.debt.defaultImg,
    });
  }
  return options;
};
//#endregion Debts

//#region StoreItems
import StoreItems from "./../models/products/storeItems/StoreItems";
import apiStoreItem from "./../api/products/storeItems";

export const getStoreItemsDialog = async (params = {}) => {
  let storeItems = new StoreItems();
  storeItems.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    storeItems.filterData.systemComponentToken =
      params.systemComponentToken ?? "";
    storeItems.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken ?? "";

    const response = await apiStoreItem.getDialog(storeItems.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            storeItems.storeItem.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: storeItems.storeItem.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: storeItems.storeItem.defaultImg,
    });
  }
  return options;
};
//#endregion StoreItems

//#region BodyParts
import BodyParts from "./../models/settings/settingsOthers/bodyParts/BodyParts";
import apiBodyPart from "./../api/settings/settingsOthers/bodyParts";

export const getBodyPartsDialog = async (params = {}) => {
  let bodyParts = new BodyParts();
  bodyParts.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    bodyParts.filterData.systemComponentToken =
      params.systemComponentToken ?? "";
    bodyParts.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken ?? "";

    const response = await apiBodyPart.getDialog(bodyParts.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            bodyParts.bodyPart.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: bodyParts.bodyPart.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: bodyParts.bodyPart.defaultImg,
    });
  }
  return options;
};
//#endregion BodyParts

//#region PropertyTypes
import PropertyTypes from "./../models/products/propertyTypes/PropertyTypes";
import apiPropertyType from "./../api/products/propertyTypes";

export const getPropertyTypesDialog = async (params = {}) => {
  let propertyTypes = new PropertyTypes();
  propertyTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    propertyTypes.filterData.systemComponentToken =
      params.systemComponentToken ?? "";
    propertyTypes.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken ?? "";

    const response = await apiPropertyType.getDialog(propertyTypes.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            propertyTypes.propertyType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: propertyTypes.propertyType.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: propertyTypes.propertyType.defaultImg,
    });
  }
  return options;
};

export const getPropertyTypesDialogCustomized = async (params = {}) => {
  let propertyTypes = new PropertyTypes();
  propertyTypes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;

  let error = null;
  let options = [];

  try {
    propertyTypes.filterData.systemComponentToken =
      params.systemComponentToken ?? "";
    propertyTypes.filterData.systemComponentHierarchyToken =
      params.systemComponentHierarchyToken ?? "";

    const response = await apiPropertyType.getAll(propertyTypes.filterData);
    const itemsData = response.data.propertyTypesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["propertyTypeToken"],
          code: itemsData[item]["fullCode"],
          text: itemsData[item]["propertyTypeNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            propertyTypes.propertyType.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      error = response.data.msg;
    }
  } catch (e) {
    error = i18n.t("errorCatch");
  }
  return [options, error];
};
//#endregion PropertyTypes

//#region SharedMediaFolders
import SharedMediaFolders from "./../models/sharedMediaFolders/SharedMediaFolders";
import apiSharedMediaFolder from "./../api/sharedMediaFolder";

export const getSharedMediaFoldersDialog = async () => {
  let sharedMediaFolders = new SharedMediaFolders();
  sharedMediaFolders.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiSharedMediaFolder.getDialog(
      sharedMediaFolders.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            sharedMediaFolders.sharedMediaFolder.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: sharedMediaFolders.sharedMediaFolder.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: sharedMediaFolders.sharedMediaFolder.defaultImg,
    });
  }

  return options;
};
//#endregion SharedMediaFolders

//#region MediaPackages
import MediaPackages from "./../models/mediaPackages/MediaPackages";
import apiMediaPackage from "./../api/mediaPackage";

export const getMediaPackagesDialog = async () => {
  let mediaPackages = new MediaPackages();
  mediaPackages.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    const response = await apiMediaPackage.getDialog(mediaPackages.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            mediaPackages.mediaPackage.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: mediaPackages.mediaPackage.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: mediaPackages.mediaPackage.defaultImg,
    });
  }

  return options;
};
//#endregion MediaPackages

//#region MediaPackageCodes
import MediaPackageCodes from "./../models/mediaPackageCodes/MediaPackageCodes";
import apiMediaPackageCode from "./../api/mediaPackageCode";

export const getMediaPackageCodesDialogCustomized = async (params = {}) => {
  let mediaPackageCodes = new MediaPackageCodes();
  mediaPackageCodes.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;

  let error = null;
  let options = [];

  try {
    mediaPackageCodes.filterData.mediaPackageToken =
      params.mediaPackageToken ?? "";

    const response = await apiMediaPackageCode.getAll(
      mediaPackageCodes.filterData
    );
    const itemsData = response.data.mediaPackageCodesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["mediaPackageCodeToken"],
          text: `${i18n.t("code")} (${itemsData[item]["mediaPackageCode"]})`,
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            mediaPackageCodes.mediaPackageCode.defaultImg
          ),
        });
      }
    } else if (response.data.status == STATUS.INVALID_TOKEN) {
      store.dispatch("logoutUser", response.data.msg);
    } else {
      error = response.data.msg;
    }
  } catch (e) {
    error = i18n.t("errorCatch");
  }
  return [options, error];
};
//#endregion MediaPackageCodes
