//#region Links
export const LINK_TARGETS = {
  default: "_blank",
  newTab: "_blank",
  currentTab: "_self",
};
//#endregion Links

// #region USERS
const USER_TYPE_TOKEN_SIMPOL = "UTT_";
export const USER_TYPE = {
  AdminsEgypt: USER_TYPE_TOKEN_SIMPOL + "12300", // AdminsEgypt أدمنز إيجيبت
  MasterAdmin: USER_TYPE_TOKEN_SIMPOL + "12400", // MasterAdmin مالك النظام
  Employee: USER_TYPE_TOKEN_SIMPOL + "12500", // Employee موظف
  Student: USER_TYPE_TOKEN_SIMPOL + "12800", // Student طالب
  VechileOwner: USER_TYPE_TOKEN_SIMPOL + "12900", // VechileOwner مالك المركبة
  Client: USER_TYPE_TOKEN_SIMPOL + "12600", // Client عميل
  Supplier: USER_TYPE_TOKEN_SIMPOL + "13000", // Supplier مورد
  Parent: USER_TYPE_TOKEN_SIMPOL + "13200", // Parent ولي أمر
  Sales: USER_TYPE_TOKEN_SIMPOL + "13100", // Sales بائع
};
// #endregion USERS

// #region USERSACTIVITYTYPE
const USER_ACTIVITY_TYPE_TOKEN_SIMPOL = "UATT-";
export const USER_ACTIVITY_TYPE_TOKEN = {
  Lecturer: USER_ACTIVITY_TYPE_TOKEN_SIMPOL + "1",
};
// #endregion USERSACTIVITYTYPE

// #region SHAREDMEDIA
const SHARED_MEDIA_TYPE_TOKEN_SIMPOL = "SharedMediaType_";
export const SHARED_MEDIA_TYPE = {
  Genral: SHARED_MEDIA_TYPE_TOKEN_SIMPOL + "1",
  EducationalCategory: SHARED_MEDIA_TYPE_TOKEN_SIMPOL + "EducationalCategory",
  EducationalGroup: SHARED_MEDIA_TYPE_TOKEN_SIMPOL + "EducationalGroup",
};
// #endregion SHAREDMEDIA

// #region CODEUDE
const CODE_UDE_TYPE_TOKEN_SIMPOL = "CodeUsedType-";
export const CODE_UDE_TYPE = {
  Used: CODE_UDE_TYPE_TOKEN_SIMPOL + "1",
  NotUsed: CODE_UDE_TYPE_TOKEN_SIMPOL + "2",
};
// #endregion CODEUDE

// #region ActivationType
const ACTIVATION_TYPE_TOKEN_SIMPOL = "AST-";
export const ACTIVATION_TYPE = {
  default: ACTIVATION_TYPE_TOKEN_SIMPOL + "17400",
  Active: ACTIVATION_TYPE_TOKEN_SIMPOL + "17400",
  Archived: ACTIVATION_TYPE_TOKEN_SIMPOL + "17500",
  Blocked: ACTIVATION_TYPE_TOKEN_SIMPOL + "17600",
};
// #endregion ActivationType

// #region SystemType
const SYSTEM_TYPE_TOKEN_SIMPOL = "STTS-";
export const SYSTEM_TYPE = {
  Place: SYSTEM_TYPE_TOKEN_SIMPOL + "1",
  EducationalActivity: SYSTEM_TYPE_TOKEN_SIMPOL + "2",
  GeographicalDistribution: SYSTEM_TYPE_TOKEN_SIMPOL + "3",
  JobGrade: SYSTEM_TYPE_TOKEN_SIMPOL + "4",
  StoreItem: SYSTEM_TYPE_TOKEN_SIMPOL + "5",
  BodyPart: SYSTEM_TYPE_TOKEN_SIMPOL + "7",
};
// #endregion SystemType

// #region ComplaintStatusType
const COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL = "CST-";
export const COMPLAINT_STATUS_TYPE = {
  OpenAndWaitForReplyFromTechnicalSupport:
    COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL + "1",
  OpenAndWaitForReplyFromComplainingPerson:
    COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL + "2",
  Closed: COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL + "3",
};
// #endregion ComplaintStatusType

// #region StorageSpace
const StorageSpace = "StorageSpace_";
export const STORAGE_SPACE_TYPE = {
  AdminsEgypt: StorageSpace + USER_TYPE.AdminsEgypt,
  MasterAdmin: StorageSpace + USER_TYPE.MasterAdmin,
  Employee: StorageSpace + USER_TYPE.Employee,
  Student: StorageSpace + USER_TYPE.Student,
  Supplier: StorageSpace + USER_TYPE.Supplier,
  Parent: StorageSpace + USER_TYPE.Parent,
  Client: StorageSpace + USER_TYPE.Client,
  VechileOwner: StorageSpace + USER_TYPE.VechileOwner,

  PlaceAdminsEgypt: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.AdminsEgypt,
  PlaceMasterAdmin: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.MasterAdmin,
  PlaceEmployee: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Employee,
  PlaceStudent: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Student,
  PlaceSupplier: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Supplier,
  PlaceParent: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Parent,
  PlaceClient: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Client,
  PlaceVechileOwner: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.VechileOwner,
  PlaceOther: StorageSpace + SYSTEM_TYPE.Place,
  // PlaceSales: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Sales,

  EducationalCategory: StorageSpace + SYSTEM_TYPE.EducationalActivity,
  TransportationVechile: StorageSpace + "Vechile",
  Account: StorageSpace + "Account",
  StoreItem: StorageSpace + "StoreItem",
  EducationalGroup: StorageSpace + "EducationalGroup",
};

const StorageSpaceMedia_SIMPOL = "StorageSpaceMediaType_";
export const STORAGE_SPACE_Media_TYPE = {
  AdminsEgypt: StorageSpaceMedia_SIMPOL + USER_TYPE.AdminsEgypt,
  MasterAdmin: StorageSpaceMedia_SIMPOL + USER_TYPE.MasterAdmin,
  Employee: StorageSpaceMedia_SIMPOL + USER_TYPE.Employee,
  Student: StorageSpaceMedia_SIMPOL + USER_TYPE.Student,
  Supplier: StorageSpaceMedia_SIMPOL + USER_TYPE.Supplier,
  Parent: StorageSpaceMedia_SIMPOL + USER_TYPE.Parent,
  Client: StorageSpaceMedia_SIMPOL + USER_TYPE.Client,
  VechileOwner: StorageSpaceMedia_SIMPOL + USER_TYPE.VechileOwner,

  PlaceAdminsEgypt:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.AdminsEgypt,
  PlaceMasterAdmin:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.MasterAdmin,
  PlaceEmployee:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.Employee,
  PlaceStudent:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.Student,
  PlaceVechileOwner:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.VechileOwner,
  PlaceClient: StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.Client,
  PlaceSupplier:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.Supplier,
  // PlaceSales: StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.Sales,
  PlaceParent: StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place + USER_TYPE.Parent,
  PlaceOther: StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.Place,

  EducationalCategory:
    StorageSpaceMedia_SIMPOL + SYSTEM_TYPE.EducationalActivity,
  TransportationVechile: StorageSpaceMedia_SIMPOL + "Vechile",
  Account: StorageSpaceMedia_SIMPOL + "Account",
  StoreItem: StorageSpaceMedia_SIMPOL + "StoreItem",
  EducationalGroup: StorageSpaceMedia_SIMPOL + "EducationalGroup",
};
// #endregion StorageSpace

// #region ReminderPlan
const DURATION_TYPE_TOKEN_SIMPOL = "DTT-";
export const DURATION_TYPE_TOKENS = {
  BeforeTime: DURATION_TYPE_TOKEN_SIMPOL + "1",
  AfterTime: DURATION_TYPE_TOKEN_SIMPOL + "2",
};

const PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL = "PST-";
export const PRIORITY_SCOPE_TYPE_TOKENS = {
  Complaints: PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL + "1",
  FollowUps: PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL + "2",
  Reminders: PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL + "3",
};
// #endregion ReminderPlan

// #region Finance
const REFUND_TYPE_TOKEN_SIMPOL = "RTTS-";
export const REFUND_TYPE_TOKENS = {
  Refunded: REFUND_TYPE_TOKEN_SIMPOL + "1",
  NotRefunded: REFUND_TYPE_TOKEN_SIMPOL + "2",
};
const COUNTED_SERVICE_TRANSACTION_TYPE_SIMPOL = "CSTT-";
export const COUNTED_SERVICE_TRANSACTION_TYPES = {
  Buy: COUNTED_SERVICE_TRANSACTION_TYPE_SIMPOL + "1",
  Sell: COUNTED_SERVICE_TRANSACTION_TYPE_SIMPOL + "2",
};
// #endregion Finance

// #region InterestFollowUp
const FOLLOW_UP_TYPE_TOKEN_SIMPOL = "FTTS-";
export const FOLLOW_UP_TYPE_TOKENS = {
  EducationalCategoryInterest: FOLLOW_UP_TYPE_TOKEN_SIMPOL + "1",
  EducationalCategoryOtherInterest: FOLLOW_UP_TYPE_TOKEN_SIMPOL + "2",
};
// #endregion InterestFollowUp

// #region EducationalRatings
const EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL = "ERTT-";
export const EDUCATIONAL_RATING_TYPE_TOKENS = {
  EducationalCategory: EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL + "1",
  EducationalGroup: EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL + "2",
  EducationalScheduleTime: EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL + "3",
};
// #endregion EducationalRatings

// #region StudentScheduleExamTimes
const EXAM_SUBMIT_STATUS_TYPE_TOKEN_SIMPOL = "EXAM_SUBMIT_STATUS-";
export const EXAM_SUBMIT_STATUS_TYPE = {
  Unknown: EXAM_SUBMIT_STATUS_TYPE_TOKEN_SIMPOL + "1",
  Submit: EXAM_SUBMIT_STATUS_TYPE_TOKEN_SIMPOL + "2",
};
// #endregion StudentScheduleExamTimes

const ATTENDANCE_TYPE_SIMPOL = "ATTS-";
export const ATTENDANCE_TYPE = {
  Attendance: ATTENDANCE_TYPE_SIMPOL + "1",
  Absence: ATTENDANCE_TYPE_SIMPOL + "2",
  Unknown: ATTENDANCE_TYPE_SIMPOL + "3",
};

const SUBSCRIPTION_TYPE_TOKEN_SIMPOL = "SUBSCRIPTION-";
export const SUBSCRIPTION_TYPE_TOKENS = {
  Package: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "1",
  Session: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "2",
  Hour: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "3",
  Duration: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "4",
};

const APPROVAL_TYPE_TOKEN_SIMPOL = "APPROVAL-";
export const APPROVAL_TYPE_TOKENS = {
  UnderReview: APPROVAL_TYPE_TOKEN_SIMPOL + "1",
  Accepted: APPROVAL_TYPE_TOKEN_SIMPOL + "2",
  Rejected: APPROVAL_TYPE_TOKEN_SIMPOL + "3",
};

const RELATED_WITH_GROUP_TYPE_TOKEN_SIMPOL = "RELATED_WITH_GROUP-";
export const RELATED_TYPE_TOKENS = {
  Related: RELATED_WITH_GROUP_TYPE_TOKEN_SIMPOL + "1",
  NotRelated: RELATED_WITH_GROUP_TYPE_TOKEN_SIMPOL + "2",
};

const CANCLE_TYPE_TOKEN_SIMPOL = "CANCLE-";
export const CANCEL_TYPE_TOKENS = {
  Canceled: CANCLE_TYPE_TOKEN_SIMPOL + "1",
  NotCanceled: CANCLE_TYPE_TOKEN_SIMPOL + "2",
};

const SCHEDULE_STATUS_TYPE_TOKEN_SIMPOL = "SCHEDULE-";
export const SCHEDULING_STATUS_TOKENS = {
  IsHaveSchedule: SCHEDULE_STATUS_TYPE_TOKEN_SIMPOL + "1",
  NotHaveSchedule: SCHEDULE_STATUS_TYPE_TOKEN_SIMPOL + "2",
};

const WORK_TYPE_TOKEN_SIMPOL = "WOR-";
export const WORK_TYPE_TOKENS = {
  Work: WORK_TYPE_TOKEN_SIMPOL + "1",
  Holiday: WORK_TYPE_TOKEN_SIMPOL + "2",
  Unknown: WORK_TYPE_TOKEN_SIMPOL + "2",
};

const AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL = "AUTHNT-";
export const AUTHENTICATION_LOGIN_TYPE_TOKENS = {
  Option_1: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "1", // Login from one device and device installation is required
  Option_2: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "2", //Login from one device on the platform, and device installation is not required
  Option_3: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "3", //Login from one device on the platform, with the requirement to install the device
  Option_4: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "4", //Multable PlatForm Multable Device
};

const CODE_IN_LOGIN_TYPE_TOKEN_SIMPOL = "CODE_LOGIN-";
export const CODE_IN_LOGIN_TYPE_TOKENS = {
  DeviceGenerated: CODE_IN_LOGIN_TYPE_TOKEN_SIMPOL + "1",
  SystemGenerated: CODE_IN_LOGIN_TYPE_TOKEN_SIMPOL + "2",
};

const PLACE_ACTIVITY_TYPE_TOKEN_SIMPOL = "PLCAE_ACTIVITY-";
export const PLACE_ACTIVITY_TYPE_TOKENS = {
  Individual: PLACE_ACTIVITY_TYPE_TOKEN_SIMPOL + "1",
  Governmental: PLACE_ACTIVITY_TYPE_TOKEN_SIMPOL + "2",
  Special: PLACE_ACTIVITY_TYPE_TOKEN_SIMPOL + "3",
  Other: PLACE_ACTIVITY_TYPE_TOKEN_SIMPOL + "4",
};

const PLACE_TYPE_TOKEN_SIMPOL = "PLCT-";
export const PLACE_TYPE_TOKENS = {
  AdminsEgypt: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.AdminsEgypt,
  MasterAdmin: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.MasterAdmin,
  Employee: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Employee,
  Student: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Student,
  Supplier: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Supplier,
  Parent: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Parent,
  Client: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Client,
  VechileOwner: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.VechileOwner,
  Sales: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Sales,
  Other: PLACE_TYPE_TOKEN_SIMPOL + "333",
};

const PROPERTY_FIELD_TYPE_SIMPOL = "PROPERTY_FIELD-";
export const PROPERTY_FIELD_TYPES = {
  Text: PROPERTY_FIELD_TYPE_SIMPOL + "1",
  Number: PROPERTY_FIELD_TYPE_SIMPOL + "2",
  Integer: PROPERTY_FIELD_TYPE_SIMPOL + "3",
  Percentage: PROPERTY_FIELD_TYPE_SIMPOL + "4",
  Decimal: PROPERTY_FIELD_TYPE_SIMPOL + "5",
  DateTime: PROPERTY_FIELD_TYPE_SIMPOL + "6",
  Date: PROPERTY_FIELD_TYPE_SIMPOL + "7",
  Time: PROPERTY_FIELD_TYPE_SIMPOL + "8",
  Email: PROPERTY_FIELD_TYPE_SIMPOL + "9",
  Link: PROPERTY_FIELD_TYPE_SIMPOL + "10",
  Logical: PROPERTY_FIELD_TYPE_SIMPOL + "11",
  DropDownList: PROPERTY_FIELD_TYPE_SIMPOL + "12",
};

const PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL =
  "PriceQuotationHistoryWorkType-";
export const PRICE_QUOTATION_HISTORY_WORK_TYPES = {
  WorkProgress: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "1",
  WaitingForQuotes: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "2",
  WaitingForCustomerAccept: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "3",
  RejectedQuotesFormCustomer: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "4",
  AcceptQuotesFormCustomer: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "5",
  InJobOrder: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "6",
  FinishJobOrderNotCustomerReceive:
    PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "7",
  FinishJobOrderCustomerReceive: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "8",
  Canceled: PRICE_QUOTATION_HISTORY_WORK_TYPE_SIMPOL + "9",
};

const QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL =
  "QuotationDetailsHistoryWorkType-";
export const QUOTATION_DETAILS_HISTORY_WORK_TYPES = {
  NewlyWanted: QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL + "1",
  WorkProgres: QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL + "2",
  ReviewedByCustomer: QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL + "3",
  RejectedByCustomer: QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL + "4",
  WaitingForQuotes: QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL + "5",
  CanceledbyCustomer: QUOTATION_DETAILS_HISTORY_WORK_TYPE_SIMPOL + "9",
};
const JOB_ORDER_HISTORY_WORK_TYPE_SIMPOL =
  "PriceQuotationJobOrderHistoryWorkType-";
export const JOB_ORDER_HISTORY_WORK_TYPES = {
  NewlyWanted: JOB_ORDER_HISTORY_WORK_TYPE_SIMPOL + "1",
  WorkProgres: JOB_ORDER_HISTORY_WORK_TYPE_SIMPOL + "2",
  FinishNotCustomerReceived: JOB_ORDER_HISTORY_WORK_TYPE_SIMPOL + "3",
  FinishCustomerReceived: JOB_ORDER_HISTORY_WORK_TYPE_SIMPOL + "4",
  Canceled: JOB_ORDER_HISTORY_WORK_TYPE_SIMPOL + "5",
};

const FEES_TYPE_SIMPOL = "FTT-";
export const FEES_TYPES = {
  Default: FEES_TYPE_SIMPOL + "1",
  Increase: FEES_TYPE_SIMPOL + "2",
  Deduct: FEES_TYPE_SIMPOL + "3",
};

const CLOSED_STATE_TYPE_SIMPOL = "CLST-";
export const CLOSED_STATE_TYPES = {
  Closed: CLOSED_STATE_TYPE_SIMPOL + "1",
  Open: CLOSED_STATE_TYPE_SIMPOL + "2",
};

const TERMINATION_TYPE_SIMPOL = "TTT-";
export const TERMINATION_TYPES = {
  Finished: TERMINATION_TYPE_SIMPOL + "1",
  NotFinished: TERMINATION_TYPE_SIMPOL + "2",
};

const INTEREST_TYPE_SIMPOL = "OITT-";
export const INTEREST_TYPES = {
  Place: INTEREST_TYPE_SIMPOL + "1",
  EducationalCategory: INTEREST_TYPE_SIMPOL + "2",
  Service: INTEREST_TYPE_SIMPOL + "3",
  Competition: INTEREST_TYPE_SIMPOL + "4",
  EducationalGroup: INTEREST_TYPE_SIMPOL + "5",
};

const SALARY_CALCULATION_TYPE_TOKEN_SIMPOL = "SCTT-";
export const SALARY_CALCULATION_TYPES = {
  Hour: SALARY_CALCULATION_TYPE_TOKEN_SIMPOL + "1",
  Session: SALARY_CALCULATION_TYPE_TOKEN_SIMPOL + "2",
  Client: SALARY_CALCULATION_TYPE_TOKEN_SIMPOL + "3",
  CostByHour: SALARY_CALCULATION_TYPE_TOKEN_SIMPOL + "4",
  NotCounting: SALARY_CALCULATION_TYPE_TOKEN_SIMPOL + "5",
};
const SALARY_CALCULATION_CASE_TYPE_TOKEN_SIMPOL = "SCCT-";
export const SALARY_CALCULATION_CASE_TYPES = {
  EmployeeAttendance: SALARY_CALCULATION_CASE_TYPE_TOKEN_SIMPOL + "1",
  EmployeeAttendanceAndAbsence: SALARY_CALCULATION_CASE_TYPE_TOKEN_SIMPOL + "2",
  ClientAttendance: SALARY_CALCULATION_CASE_TYPE_TOKEN_SIMPOL + "3",
  ClientAttendanceAndAbsence: SALARY_CALCULATION_CASE_TYPE_TOKEN_SIMPOL + "4",
};
const CALCULATION_TYPE_TOKEN_SIMPOL = "CTTS-";
export const CALCULATION_TYPES = {
  EmployeeAttendance: CALCULATION_TYPE_TOKEN_SIMPOL + "1",
  EmployeeAttendanceAndAbsence: CALCULATION_TYPE_TOKEN_SIMPOL + "2",
};

//#region CUSTOM_TREE
export const CUSTOM_TREE_ACTION_TYPE = {
  link: "link",
  bottomSheet: "bottomSheet",
  modal: "modal",
  other: "other",
};
//#endregion CUSTOM_TREE

const REACT_TYPE_TOKEN_SIMPOL = "RTTS-";
export const REACT_TYPE = {
  Like: REACT_TYPE_TOKEN_SIMPOL + "1",
  DisLike: REACT_TYPE_TOKEN_SIMPOL + "2",
};

export const CERTIFICATE_STATUS_TYPE = {
  Ready: "CertificateStatusType-1",
  Export: "CertificateStatusType-2",
  Deliver: "CertificateStatusType-3",
};

//#region MEDIA
export const MEDIA_TYPE_TOKENS = {
  image: "MTT-1",
  video: "MTT-2",
  audio: "MTT-3",
  pdf: "MTT-4",
  excel: "MTT-5",
  word: "MTT-6",
  powerPoint: "MTT-7",
  other: "MTT-8",
};

export const MEDIA_EXTENSIONS = {
  image: [
    "jpeg",
    "jpg",
    "png",
    "gif",
    "tiff",
    "psd",
    "tiff",
    "eps",
    "ai",
    "aidd",
    "raw",
  ],
  video: [
    "mov",
    "avi",
    "wmv",
    "mp4",
    "m4p",
    "m4v",
    "ogg",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "3gp",
    "flv",
  ],
  audio: ["aif", "cda", "mid", "mp3", "mpa", "ogg", "wav", "wma", "wpl"],
  pdf: ["pdf"],
  excel: ["xlsx", "xlsm", "xlsb", "xltx", "xls"],
  word: ["doc", "docm", "docx"],
  powerPoint: ["ppsx", "ppt", "pptm", "pptx"],
};
//#endregion MEDIA

// #region Notifications
export const PAGE_GO_TO_NAME = {
  // "PGT-4": "Users", //diffrent logic
  "PGT-4": "Students", //this for test
  "PGT-42": "SystemComponents", //diffrent logic
  "PGT-43": "SystemComponentsHierarchies", //diffrent logic

  "PGT-18": "Qualifications",
  "PGT-2": "EstablishmentRoles",
  "PGT-3": "UserValidSettings",
  "PGT-25": "BloodTypes",
  "PGT-26": "MilitaryStatusTypes",
  "PGT-27": "SocialStatuses",
  "PGT-19": "Banks",
  "PGT-28": "Religions", //not exist yet
  "PGT-29": "Currencies", //not exist yet
  "PGT-30": "InsuranceCompanies",
  "PGT-31": "PersonalCardTypes", //not exist yet
  "PGT-32": "UserPersonalCards", //not exist yet
  "PGT-12": "GeneralJobs", //not exist yet
  "PGT-33": "RelativeRelationTypes", //not exist yet
  "PGT-34": "UsersFamily", //not exist yet
  "PGT-21": "Sectors", //not exist yet
  "PGT-35": "Jobs", //not exist yet
  "PGT-36": "ClassificationDegrees", //not exist yet
  "PGT-37": "UserQualifications", //not exist yet
  "PGT-17": "ScientificDegrees", //not exist yet
  "PGT-38": "UserScientificDegrees", //not exist yet
  "PGT-39": "Certificates",
  "PGT-40": "UserTrainingCourses", //not exist yet
  "PGT-41": "UserExperiences", //not exist yet
  "PGT-44": "Places",
  "PGT-45": "NewsCategories",
  "PGT-46": "Newss",
  "PGT-47": "GradingPlans",
  "PGT-48": "NewsGallery", //not exist yet
  "PGT-49": "EducationSystemTypes", //not exist yet
  "PGT-50": "EducationalCategories",
  "PGT-51": "UserFavouriteNews", //not exist yet
  "PGT-52": "EducationalGroups",
  "PGT-53": "ServiceTypes",
  "PGT-54": "Services",
  "PGT-55": "Colors",
  "PGT-56": "Units", //not exist yet
};
// #endregion Notifications

// #region CHARTJS
const CHARTJS_COLORS = ["#00afb9", "#d90429", "#fee440", "#7b2cbf", "#38b000"];
export const CHARTJS = {
  colors: CHARTJS_COLORS,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  chartData: {
    labels: ["label"],
    datasets: [
      {
        label: "label",
        backgroundColor: CHARTJS_COLORS,
        data: [0],
      },
    ],
  },
};
// #endregion CHARTJS
