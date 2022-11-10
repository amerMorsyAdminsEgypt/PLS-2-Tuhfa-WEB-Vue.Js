import {
  checkPrivilege,
  getLanguage,
  getDeviceName,
  getBrowserName,
} from "./../../utils/functions";
import {
  ESTABLISHMENT_TOKEN,
  USER_PLATFORM_SESSION_VERSION_NUMBER,
  DEFAULT_PAGES,
  STATUS,
} from "./../../utils/constants";
import UsersPrivilegeData from "./../../models/modulePrivileges/UsersPrivilegeData";

import axios from "axios";
import store from "./../../store";
import i18n from "./../../i18n";

export default class UserLogin {
  //#region UserLogin
  USER_PLATFORM_SESSION = {
    userPlatFormSessionVersionNumber: USER_PLATFORM_SESSION_VERSION_NUMBER,
    userPlatFormSessionLocalIP: "",
    userPlatFormSessionGlobalIP: "",
    userPlatFormSessionAddress: "",
    userPlatFormSessionLat: "",
    userPlatFormSessionLong: "",
    userPlatFormToken: "PFT-3",
    userFirebaseToken: "userFirebaseToken",
  };
  USER_DEVICE = {
    userDeviceUniqueCode: "WEB",
    userDeviceId: "",
    userDeviceName: "Unkonwn",
    userDeviceCompany: "",
    userDeviceOS: "",
    userDeviceVersionOS: getBrowserName() + " " + getDeviceName(),
    userDeviceEMUI: "",
    userDeviceRam: "",
    userDeviceProcessor: "",
    userDeviceDisplay: "",
    userDeviceDescription: "",
    userDeviceNotes: "",
  };
  USER_APP_SETTING = {
    languageToken: getLanguage(),
    themeToken: "",
    decimalFormatToken: "",
    timeZoneToken: "Egypt Standard Time",
    dateFormatToken: "dddd, dd MMMM yyyy",
    timeFormatToken: "hh:mm:ss tt",
    currencyToken: "EGP",
    printCodeTypeToken: "",
    startDayOfWeekToken: "",
    startMonthOfYear: 0,
    startDayOfMonth: 0,
    backAfterAddStatus: true,
    backAfterEditStatus: true,
    receiveNotificationStatus: true,
    customSettings: "",
  };
  //#endregion UserLogin

  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.user = "";
    this.userPassword = "";
    this.establishmentToken = ESTABLISHMENT_TOKEN;
    this.userPlatformSessionData = this.USER_PLATFORM_SESSION;
    this.userDeviceData = this.USER_DEVICE;
    this.userAppSettingData = this.USER_APP_SETTING;
  }
  fillData(data) {
    this.language = data.language;
    this.user = data.user;
    this.userPassword = data.userPassword;
    this.establishmentToken = data.establishmentToken;
    this.userPlatformSessionData = data.userPlatformSessionData;
    this.userDeviceData = data.userDeviceData;
    this.userAppSettingData = data.userAppSettingData;
  }

  async login() {
    let response = await axios.post(`/api/UsersAuthentication/UserLogin`, this);
    return response;
  }

  saveUserData(apiAppData) {
    let userHomePage = DEFAULT_PAGES.notLoggedIn;

    const userPersonalDataObject = {
      userEmail: apiAppData.userData.userEmail,
      userImagePath: apiAppData.userData.userImagePath,
      userName: apiAppData.userData.userName,
      userNameAr: apiAppData.userData.userNameAr,
      userNameCurrent: apiAppData.userData.userNameCurrent,
      userNameEn: apiAppData.userData.userNameEn,
      userNameUnd: apiAppData.userData.userNameUnd,
      userPassword: apiAppData.userData.userPassword,
      userPhone: apiAppData.userData.userPhone,
      userPhoneCountryCode: apiAppData.userData.userPhoneCountryCode,
      userPhoneCountryCodeName: apiAppData.userData.userPhoneCountryCodeName,
      userPhoneWithCC: apiAppData.userData.userPhoneWithCC,
      // establishmentRoleData: apiAppData.userData.establishmentRoleData,
      userToken: apiAppData.userData.userToken,
      userActivityTypeToken: apiAppData.userData.userActivityTypeToken,
      userTypeNameAr: apiAppData.userData.userTypeNameAr,
      userTypeNameCurrent: apiAppData.userData.userTypeNameCurrent,
      userTypeNameEn: apiAppData.userData.userTypeNameEn,
      userTypeNameUnd: apiAppData.userData.userTypeNameUnd,
      userTypeToken: apiAppData.userData.userTypeToken,
      activationTypeToken: apiAppData.userData.activationTypeToken,
    };

    let response = {
      status: STATUS.ERROR,
      msg: i18n.t("sorryYouDoNotHaveThisPermission"),
    };

    let privileges = new UsersPrivilegeData();
    // console.log(apiAppData.userData.establishmentRoleData.modulePrivilegeData);
    privileges.fillData(
      apiAppData.userData.establishmentRoleData.modulePrivilegeData
    );

    // #region userHomePage
    if (checkPrivilege(false, apiAppData.userData.userTypeToken)) {
      userHomePage = DEFAULT_PAGES.loggedIn;
    } else if (privileges.EducationalJoiningApplication.view) {
      userHomePage = "EducationalJoiningApplications";
    } else if (privileges.EducationalCategory.view) {
      userHomePage = "EducationalCategories";
    } else if (privileges.SystemComponentsHierarchyEducationalActivity.view) {
      userHomePage = "SystemComponentsHierarchyEducationalCategory";
    } else if (privileges.SystemComponentEducationalActivity.view) {
      userHomePage = "SystemComponentEducationalCategory";
    } else if (privileges.EducationalGroup.view) {
      userHomePage = "EducationalGroups";
    } else if (privileges.EducationalScheduleTime.view) {
      userHomePage = "EducationalScheduleTimes";
    } else if (privileges.EducationalGroupStudent.view) {
      userHomePage = "EducationalGroupStudents";
    } else if (privileges.EducationalGroupTransfer.view) {
      userHomePage = "EducationalGroupTransfers";
    } else if (privileges.SimpleExamModel.view) {
      userHomePage = "SimpleExamModels";
    } else if (privileges.GroupScheduleExam.view) {
      userHomePage = "GroupScheduleExams";
    } else if (privileges.StudentScheduleExamTime.view) {
      userHomePage = "StudentScheduleExamTimes";
    } else if (privileges.Student.view) {
      userHomePage = "Students";
    } else if (privileges.StudentEstablishmentsRole.view) {
      userHomePage = "StudentEstablishmentsRole";
    } else if (privileges.StudentValidSetting.view) {
      userHomePage = "StudentValidSetting";
    } else if (privileges.StudentLoginCode.view) {
      userHomePage = "StudentLoginCode";
    } else if (privileges.PlaceStudent.view) {
      userHomePage = "PlaceStudents";
    } else if (privileges.Supplier.view) {
      userHomePage = "Suppliers";
    } else if (privileges.SupplierEstablishmentsRole.view) {
      userHomePage = "SupplierEstablishmentsRole";
    } else if (privileges.SupplierValidSetting.view) {
      userHomePage = "SupplierValidSetting";
    } else if (privileges.SupplierLoginCode.view) {
      userHomePage = "SupplierLoginCode";
    } else if (privileges.PlaceSupplier.view) {
      userHomePage = "PlaceSuppliers";
    } else if (privileges.Parent.view) {
      userHomePage = "Parents";
    } else if (privileges.ParentEstablishmentsRole.view) {
      userHomePage = "ParentEstablishmentsRole";
    } else if (privileges.ParentValidSetting.view) {
      userHomePage = "ParentValidSetting";
    } else if (privileges.ParentLoginCode.view) {
      userHomePage = "ParentLoginCode";
    } else if (privileges.PlaceParent.view) {
      userHomePage = "PlaceParents";
    } else if (privileges.Client.view) {
      userHomePage = "Clients";
    } else if (privileges.ClientEstablishmentsRole.view) {
      userHomePage = "ClientEstablishmentsRole";
    } else if (privileges.ClientValidSetting.view) {
      userHomePage = "ClientValidSetting";
    } else if (privileges.ClientLoginCode.view) {
      userHomePage = "ClientLoginCode";
    } else if (privileges.PlaceClient.view) {
      userHomePage = "PlaceClients";
    } else if (privileges.Employee.view) {
      userHomePage = "Employees";
    } else if (privileges.EmployeeEstablishmentsRole.view) {
      userHomePage = "EmployeeEstablishmentsRole";
    } else if (privileges.EmployeeValidSetting.view) {
      userHomePage = "EmployeeValidSetting";
    } else if (privileges.EmployeeLoginCode.view) {
      userHomePage = "EmployeeLoginCode";
    } else if (privileges.PlaceEmployee.view) {
      userHomePage = "PlaceEmployees";
    } else if (privileges.MasterAdmin.view) {
      userHomePage = "MasterAdmin";
    } else if (privileges.MasterAdminEstablishmentsRole.view) {
      userHomePage = "MasterAdminEstablishmentsRole";
    } else if (privileges.MasterAdminValidSetting.view) {
      userHomePage = "MasterAdminValidSetting";
    } else if (privileges.MasterAdminLoginCode.view) {
      userHomePage = "MasterAdminLoginCode";
    } else if (privileges.PlaceMasterAdmin.view) {
      userHomePage = "PlaceMasterAdmin";
    } else if (privileges.Service.view) {
      userHomePage = "Services";
    } else if (privileges.ServiceType.view) {
      userHomePage = "ServiceTypes";
    } else if (privileges.CountedService.view) {
      userHomePage = "CountedServices";
    } else if (privileges.CountedServiceType.view) {
      userHomePage = "CountedServiceTypes";
    } else if (
      privileges.PriceQuotation.view_WorkProgress ||
      privileges.PriceQuotation.view_WaitingForQuotes ||
      privileges.PriceQuotation.view_WaitingForCustomerAccept ||
      privileges.PriceQuotation.view_RejectedQuotesFormCustomer ||
      privileges.PriceQuotation.view_AcceptQuotesFormCustomer
    ) {
      userHomePage = "PriceQuotations1";
    } else if (
      privileges.PriceQuotation.view_InJobOrder ||
      privileges.PriceQuotation.view_FinishJobOrderNotCustomerReceive ||
      privileges.PriceQuotation.view_FinishJobOrderCustomerReceive ||
      privileges.PriceQuotation.view_Canceled
    ) {
      userHomePage = "PriceQuotations2";
    } else if (
      privileges.PriceQuotationDetails.view_PriceQuotationDetails_NewlyWanted ||
      privileges.PriceQuotationDetails.view_PriceQuotationDetails_WorkProgres ||
      privileges.PriceQuotationDetails
        .view_PriceQuotationDetails_ReviewedByCustomer ||
      privileges.PriceQuotationDetails
        .view_PriceQuotationDetails_RejectedByCustomer ||
      privileges.PriceQuotationDetails
        .view_PriceQuotationDetails_WaitingForQuotes ||
      privileges.PriceQuotationDetails
        .view_PriceQuotationDetails_CanceledbyCustomer
    ) {
      userHomePage = "PriceQuotationDetails";
    } else if (
      privileges.PriceQuotationJobOrder
        .view_PriceQuotationJobOrder_NewlyWanted ||
      privileges.PriceQuotationJobOrder
        .view_PriceQuotationJobOrder_WorkProgres ||
      privileges.PriceQuotationJobOrder
        .view_PriceQuotationJobOrder_FinishNotCustomerReceived ||
      privileges.PriceQuotationJobOrder
        .view_PriceQuotationJobOrder_FinishCustomerReceived ||
      privileges.PriceQuotationJobOrder.view_PriceQuotationJobOrder_Canceled
    ) {
      userHomePage = "PriceQuotationJobOrders";
    } else if (privileges.Complaint.view) {
      userHomePage = "Complaints";
    } else if (privileges.Reminder.view) {
      userHomePage = "Reminders";
    } else if (privileges.Account.view) {
      userHomePage = "Accounts";
    } else if (privileges.AccountTransaction.view) {
      userHomePage = "AccountTransactions";
    } else if (privileges.Debt.view) {
      userHomePage = "Debts";
    } else if (privileges.Installment.view) {
      userHomePage = "Installments";
    } else if (privileges.Expenses.view) {
      userHomePage = "Expenses";
    } else if (privileges.ExpensesType.view) {
      userHomePage = "ExpensesTypes";
    } else if (privileges.Revenues.view) {
      userHomePage = "Revenues";
    } else if (privileges.RevenuesType.view) {
      userHomePage = "RevenuesTypes";
    } else if (
      privileges.CountedServiceTransaction.countedServiceTransactionViewBuy ||
      privileges.CountedServiceTransaction.countedServiceTransactionViewSell ||
      privileges.CountedServiceTransaction.countedServiceTransactionViewRefund
    ) {
      userHomePage = "CountedServiceTransactions";
    } else if (privileges.InstallmentPayment.view) {
      userHomePage = "InstallmentPayments";
    } else if (privileges.ServiceEntitlement.view) {
      userHomePage = "ServiceEntitlements";
    } else if (privileges.News.view) {
      userHomePage = "Newss";
    } else if (privileges.EmployeePayrollSetting.view) {
      userHomePage = "EmployeePayrollSettings";
    } else if (privileges.Place.view) {
      userHomePage = "Places";
    } else if (privileges.SystemComponentPlace.view) {
      userHomePage = "SystemComponentPlace";
    } else if (privileges.SystemComponentsHierarchyPlace.view) {
      userHomePage = "SystemComponentsHierarchyPlace";
    } else if (
      privileges.KnownMethod.viewReport ||
      privileges.Religion.viewReport ||
      privileges.InstallmentSchedule.viewReport ||
      privileges.Qualification.viewReport ||
      privileges.EducationalJoiningApplication.viewReport ||
      privileges.GroupScheduleExam.viewReport ||
      privileges.Complaint.viewReport ||
      privileges.StudentScheduleExamTime.viewReport ||
      privileges.EducationalScheduleTime.viewReport ||
      privileges.AccountTransaction.viewReport
    ) {
      userHomePage = "Reports";
    } else if (
      privileges.Qualification.view ||
      privileges.Religion.view ||
      privileges.MilitaryStatusType.view ||
      privileges.BloodType.view ||
      privileges.Certificate.view ||
      privileges.SocialStatuse.view ||
      privileges.Bank.view ||
      privileges.KnownMethod.view ||
      privileges.InsuranceCompany.view ||
      privileges.Color.view ||
      privileges.PriorityType.view ||
      privileges.ComplaintType.view ||
      privileges.NewsCategory.view ||
      privileges.ComplaintSector.view ||
      privileges.ReminderPlan.view ||
      privileges.PaymentMethod.view ||
      privileges.GradingPlan.view ||
      privileges.Country.view ||
      privileges.GeneralJob.view ||
      privileges.RelativeRelationType.view ||
      privileges.ClassificationDegree.view ||
      privileges.PersonalCardType.view ||
      privileges.InstallmentBatchType.view ||
      privileges.ScientificDegree.view ||
      privileges.GeographicalDistribution.view ||
      privileges.SystemComponentGeographicalDistribution.view ||
      privileges.SystemComponentsHierarchyGeographicalDistribution.view ||
      privileges.JobGrade.view ||
      privileges.SystemComponentsHierarchyJobGrade.view ||
      privileges.SystemComponentJobGrade.view ||
      privileges.InjuryType.view ||
      privileges.OperationType.view ||
      privileges.BodyPart.view ||
      privileges.SystemComponentsHierarchyBodyPart.view ||
      privileges.SystemComponentBodyPart.view
    ) {
      userHomePage = "SettingsOthers";
    } else {
      userHomePage = DEFAULT_PAGES.notLoggedIn;
    }

    // #endregion userHomePage

    // setUserHomePage
    store.dispatch("setUserHomePage", userHomePage);

    if (userHomePage != DEFAULT_PAGES.notLoggedIn) {
      let data = {
        userAuthorizeToken: apiAppData.userAuthorizeToken,
        userPersonalDataObject,
        constantsListsData: apiAppData.constantsListsData,
        usersPrivilegeData: privileges,
      };

      // login
      store.dispatch("loginUser", data);

      response.status = STATUS.SUCCESS;
      response.msg = i18n.t("successOperation");
    }
    return response;
  }
}
