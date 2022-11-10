import { EnumClass } from "./EnumClass";
import { PRICE_QUOTATION_HISTORY_WORK_TYPES } from "./../../utils/constantLists";
const _SystemComponent = "SystemComponent_";
const _SystemComponentsHierarchy = "SystemComponentsHierarchy_";

export const ModulesPrivilege = {
  //SystemComponent
  SystemComponentPlace: _SystemComponent + EnumClass.SystemType.Place,
  SystemComponentEducationalActivity:
    _SystemComponent + EnumClass.SystemType.EducationalActivity,
  SystemComponentGeographicalDistribution:
    EnumClass.SystemType.GeographicalDistribution,
  SystemComponentJobGrade: _SystemComponent + EnumClass.SystemType.JobGrade,
  SystemComponentLevel: _SystemComponent + EnumClass.SystemType.Level,
  SystemComponentBodyPart: _SystemComponent + EnumClass.SystemType.BodyPart,
  SystemComponentStoreItem: _SystemComponent + EnumClass.SystemType.StoreItem,

  //Hierarch,
  SystemComponentsHierarchyPlace:
    _SystemComponentsHierarchy + EnumClass.SystemType.Place,
  SystemComponentsHierarchyEducationalActivity:
    _SystemComponentsHierarchy + EnumClass.SystemType.EducationalActivity,
  SystemComponentsHierarchyGeographicalDistribution:
    _SystemComponentsHierarchy + EnumClass.SystemType.GeographicalDistribution,
  SystemComponentsHierarchyJobGrade:
    _SystemComponentsHierarchy + EnumClass.SystemType.JobGrade,
  SystemComponentsHierarchyLevel:
    _SystemComponentsHierarchy + EnumClass.SystemType.Level,
  SystemComponentsHierarchyBodyPart:
    _SystemComponentsHierarchy + EnumClass.SystemType.BodyPart,
  SystemComponentsHierarchyStoreItem:
    _SystemComponentsHierarchy + EnumClass.SystemType.StoreItem,

  //AdditionalSetting,
  Qualification: "Qualification_",
  EducationalStage: "EducationalStage_",
  EmployeePayrollSetting: "EmployeePayrollSetting_",
  BloodType: "BloodType_",
  MilitaryStatusType: "MilitaryStatusType_",
  SocialStatuse: "SocialStatuse_",
  Specialty: "Specialtie_",
  Bank: "Bank_",
  KnownMethod: "KnownMethod_",
  Religion: "Religion_",
  InsuranceCompany: "InsuranceCompany_",
  Country: "Country_",
  Governorate: "Governorate_",
  City: "City_",
  District: "District_",
  PersonalCardType: "PersonalCardType_",
  GeneralJob: "GeneralJob_",
  RelativeRelationType: "RelativeRelationType_",
  Sector: "Sector_",
  Job: "Job_",
  ClassificationDegree: "ClassificationDegree_",
  ScientificDegree: "ScientificDegree_",
  Certificate: "Certificate_",
  Color: "Color_",
  Unit: "Unit_",
  FuelType: "FuelType_",
  Brand: "Brand_",
  GeographicalDistribution: "GeographicalDistribution_",
  JobGrade: "JobGrade_",
  TaxType: "TaxType_",
  PaymentMethod: "PaymentMethod_",
  InstallmentBatchType: "InstallmentBatchType_",

  UserLoginCode: "UserLoginCode_",

  //*******************Student******************,
  Student: EnumClass.UserType.Student,

  StudentFamily:
    EnumClass.UserType.Student + EnumClass.UsersModules.UsersFamily,
  StudentValidSetting:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserValidSetting,
  StudentQualification:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserQualification,
  StudentScientificDegree:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserScientificDegree,
  StudentTrainingCourse:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserTrainingCourse,
  StudentExperience:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserExperience,
  StudentInjury: EnumClass.UserType.Student + EnumClass.UsersModules.UserInjury,
  StudentOperation:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserOperation,
  StudentPersonalCard:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserPersonalCard,
  StudentEstablishmentsRole:
    EnumClass.UserType.Student + EnumClass.UsersModules.EstablishmentsRoles,

  StudentLoginCode:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserLoginCode,

  //*******************Supplier******************,
  Supplier: EnumClass.UserType.Supplier,

  SupplierFamily:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UsersFamily,
  SupplierValidSetting:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserValidSetting,
  SupplierQualification:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserQualification,
  SupplierScientificDegree:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserScientificDegree,
  SupplierTrainingCourse:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserTrainingCourse,
  SupplierExperience:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserExperience,
  SupplierInjury:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserInjury,
  SupplierOperation:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserOperation,
  SupplierPersonalCard:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserPersonalCard,
  SupplierEstablishmentsRole:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.EstablishmentsRoles,

  SupplierLoginCode:
    EnumClass.UserType.Supplier + EnumClass.UsersModules.UserLoginCode,

  //*******************Parent******************,
  Parent: EnumClass.UserType.Parent,

  ParentFamily: EnumClass.UserType.Parent + EnumClass.UsersModules.UsersFamily,
  ParentValidSetting:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserValidSetting,
  ParentQualification:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserQualification,
  ParentScientificDegree:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserScientificDegree,
  ParentTrainingCourse:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserTrainingCourse,
  ParentExperience:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserExperience,
  ParentInjury: EnumClass.UserType.Parent + EnumClass.UsersModules.UserInjury,
  ParentOperation:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserOperation,
  ParentPersonalCard:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserPersonalCard,
  ParentEstablishmentsRole:
    EnumClass.UserType.Parent + EnumClass.UsersModules.EstablishmentsRoles,

  ParentLoginCode:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserLoginCode,

  //*******************Client******************,
  Client: EnumClass.UserType.Client,

  ClientFamily: EnumClass.UserType.Client + EnumClass.UsersModules.UsersFamily,
  ClientValidSetting:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserValidSetting,
  ClientQualification:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserQualification,
  ClientScientificDegree:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserScientificDegree,
  ClientTrainingCourse:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserTrainingCourse,
  ClientExperience:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserExperience,
  ClientInjury: EnumClass.UserType.Client + EnumClass.UsersModules.UserInjury,
  ClientOperation:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserOperation,
  ClientPersonalCard:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserPersonalCard,
  ClientEstablishmentsRole:
    EnumClass.UserType.Client + EnumClass.UsersModules.EstablishmentsRoles,

  ClientLoginCode:
    EnumClass.UserType.Client + EnumClass.UsersModules.UserLoginCode,

  //*******************Employee******************,
  Employee: EnumClass.UserType.Employee,

  EmployeeFamily:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UsersFamily,
  EmployeeValidSetting:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserValidSetting,
  EmployeeQualification:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserQualification,
  EmployeeScientificDegree:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserScientificDegree,
  EmployeeTrainingCourse:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserTrainingCourse,
  EmployeeExperience:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserExperience,
  EmployeeInjury:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserInjury,
  EmployeeOperation:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserOperation,
  EmployeePersonalCard:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserPersonalCard,
  EmployeeEstablishmentsRole:
    EnumClass.UserType.Employee + EnumClass.UsersModules.EstablishmentsRoles,

  EmployeeLoginCode:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserLoginCode,

  //*******************MasterAdmin******************,
  MasterAdmin: EnumClass.UserType.MasterAdmin,

  MasterAdminFamily:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UsersFamily,
  MasterAdminValidSetting:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserValidSetting,
  MasterAdminQualification:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserQualification,
  MasterAdminScientificDegree:
    EnumClass.UserType.MasterAdmin +
    EnumClass.UsersModules.UserScientificDegree,
  MasterAdminTrainingCourse:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserTrainingCourse,
  MasterAdminExperience:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserExperience,
  MasterAdminInjury:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserInjury,
  MasterAdminOperation:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserOperation,
  MasterAdminPersonalCard:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserPersonalCard,
  MasterAdminEstablishmentsRole:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.EstablishmentsRoles,

  MasterAdminLoginCode:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserLoginCode,

  //*******************AdminsEgypt******************,
  AdminsEgypt: EnumClass.UserType.AdminsEgypt,

  AdminsEgyptFamily:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UsersFamily,
  AdminsEgyptValidSetting:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserValidSetting,
  AdminsEgyptQualification:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserQualification,
  AdminsEgyptScientificDegree:
    EnumClass.UserType.AdminsEgypt +
    EnumClass.UsersModules.UserScientificDegree,
  AdminsEgyptTrainingCourse:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserTrainingCourse,
  AdminsEgyptExperience:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserExperience,
  AdminsEgyptInjury:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserInjury,
  AdminsEgyptOperation:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserOperation,
  AdminsEgyptPersonalCard:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserPersonalCard,
  AdminsEgyptEstablishmentsRole:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.EstablishmentsRoles,

  //*******************VechileOwner******************,
  VechileOwner: EnumClass.UserType.VechileOwner,

  VechileOwnerFamily:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UsersFamily,
  VechileOwnerValidSetting:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserValidSetting,
  VechileOwnerQualification:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserQualification,
  VechileOwnerScientificDegree:
    EnumClass.UserType.VechileOwner +
    EnumClass.UsersModules.UserScientificDegree,
  VechileOwnerTrainingCourse:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserTrainingCourse,
  VechileOwnerExperience:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserExperience,
  VechileOwnerInjury:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserInjury,
  VechileOwnerOperation:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserOperation,
  VechileOwnerPersonalCard:
    EnumClass.UserType.VechileOwner + EnumClass.UsersModules.UserPersonalCard,

  StorageSpaceAdminsEgypt: EnumClass.StorageSpaceType.AdminsEgypt,
  StorageSpaceMasterAdmin: EnumClass.StorageSpaceType.MasterAdmin,
  StorageSpaceEmployee: EnumClass.StorageSpaceType.Employee,

  StorageSpaceStudent: EnumClass.StorageSpaceType.Student,
  StorageSpaceSupplier: EnumClass.StorageSpaceType.Supplier,
  StorageSpaceParent: EnumClass.StorageSpaceType.Parent,
  StorageSpaceClient: EnumClass.StorageSpaceType.Client,

  StorageSpaceVechileOwner: EnumClass.StorageSpaceType.VechileOwner,
  StorageSpacePlace: EnumClass.StorageSpaceType.Place,
  StorageSpaceEducationalCategory:
    EnumClass.StorageSpaceType.EducationalCategory,
  StorageSpaceVechile: EnumClass.StorageSpaceType.Vechile,
  StorageSpaceAccount: EnumClass.StorageSpaceType.Account,
  StorageSpaceStoreItem: EnumClass.StorageSpaceType.StoreItem,
  StorageSpaceEducationalGroup: EnumClass.StorageSpaceType.EducationalGroup,

  StorageSpaceMediaAdminsEgypt: EnumClass.StorageSpaceMediaType.AdminsEgypt,
  StorageSpaceMediaMasterAdmin: EnumClass.StorageSpaceMediaType.MasterAdmin,
  StorageSpaceMediaEmployee: EnumClass.StorageSpaceMediaType.Employee,

  StorageSpaceMediaStudent: EnumClass.StorageSpaceMediaType.Student,
  StorageSpaceMediaSupplier: EnumClass.StorageSpaceMediaType.Supplier,
  StorageSpaceMediaParent: EnumClass.StorageSpaceMediaType.Parent,
  StorageSpaceMediaClient: EnumClass.StorageSpaceMediaType.Client,

  StorageSpaceMediaVechileOwner: EnumClass.StorageSpaceMediaType.VechileOwner,
  StorageSpaceMediaPlace: EnumClass.StorageSpaceMediaType.Place,
  StorageSpaceMediaEducationalCategory:
    EnumClass.StorageSpaceMediaType.EducationalCategory,
  StorageSpaceMediaVechile: EnumClass.StorageSpaceMediaType.Vechile,
  StorageSpaceMediaAccount: EnumClass.StorageSpaceMediaType.Account,
  StorageSpaceMediaStoreItem: EnumClass.StorageSpaceMediaType.StoreItem,
  StorageSpaceMediaEducationalGroup:
    EnumClass.StorageSpaceMediaType.EducationalGroup,

  Place: "Place_",

  //New,
  NewsCategory: "NewsCategory_",

  News: "News_",
  NewsGallery: "NewsGallery_",
  UserFavouriteNews: "UserFavouriteNews_",

  //EducationalCategor,
  EducationalCategory: "EducationalCategory_",

  EducationSystemType: "EducationSystemType_",
  GradingPlan: "GradingPlan_",
  EducationalGroup: "EducationalGroup_",

  //#region Products
  StoreItem: "StoreItem_",
  DropDownList: "DropDownList_",
  PropertyType: "PropertyType_",
  PriceQuotation: "PriceQuotation_",
  QuotationPriceHistory: "QuotationPriceHistory_",
  PriceQuotationDetails: "PriceQuotationDetails_",
  QuotationDetailsHistoryWorks: "QuotationDetailsHistoryWorks_",
  PriceQuotationAffiliateOperation: "PriceQuotationAffiliateOperation_",
  PriceQuotationJobOrder: "PriceQuotationJobOrder_",
  //#endregion Products

  //Servic,
  ServiceType: "ServiceType_",
  CountedServiceType: "CategoryType_",

  Service: "Service_",
  CountedService: "Category_",

  //Financ,
  AccountInformation: "AccountInformation_",

  Account: "Account_",

  //Transportatio,
  TransportationType: "TransportationType_",

  Vechile: "Vechile_",
  VechileLicense: "VechileLicense_",
  VechileRental: "VechileRental_",
  VechileShape: "VechileShape_",
  UserValidSetting: "UserValidSetting_",
  CommunicationType: "CommunicationType_",
  ComplaintType: "ComplaintType_",
  VechicleItinerary: "VechicleItinerary_",
  FollowUpType: "FollowUpType_",
  PriorityType: "PriorityType_",
  ComplaintSector: "ComplaintSector_",
  ComplaintFollowUp: "ComplaintFollowUp_",
  EducationalPeriod: "EducationalPeriod_",
  EducationalSchedule: "EducationalSchedule_",
  ReminderPlan: "ReminderPlan_",
  Reminder: "Reminder_",
  SharedMediaFolder: "SharedMediaFolder_",
  SharedMedia: "SharedMedia_",
  MediaPackage: "MediaPackage_",
  MediaPackageCode: "MediaPackageCode_",
  EducationalScheduleTime: "EducationalScheduleTime_",
  ExamModel: "ExamModel_",
  EstablishmentPackage: "EstablishmentPackage_",
  EducationalJoiningApplication: "EducationalJoiningApplication_",
  ExamModelParagraph: "ExamModelParagraph_",
  ExamModelParagraphQuestion: "ExamModelParagraphQuestion_",
  ExpensesType: "ExpensesType_",
  RevenuesType: "RevenuesType_",
  PriceList: "PriceList_",
  Interest: "Interest_",
  InterestFollowUp: "InterestFollowUp_",
  FollowInterest: "FollowInterest_",
  UserOtherInterest: "UserOtherInterests_",
  UserSysteamInterest: "UserSysteamInterests_",
  SimpleExamModel: "SimpleExamModel_",
  GroupScheduleExam: "GroupScheduleExam_",
  EducationalCertificate: "EducationalCertificate_",
  Discussion: "Discussion_",
  DiscussionComment: "DiscussionComment_",
  DiscussionCommentReact: "DiscussionCommentReact_",
  Club: "Club_",
  InjuryType: "InjuryType_",
  OperationType: "OperationType_",
  Level: "Level_",
  BodyPart: "BodyPart_",
  UserInjury: "UserInjury_",
  CompetitionType: "CompetitionType_",
  UserOperation: "UserOperation_",
  Competition: "Competition_",
  CompetitionAppointment: "CompetitionAppointment_",
  CompetitionSubscription: "CompetitionSubscription_",
  UserBalance: "UserBalance_",
  UserBalanceTransaction: "UserBalanceTransaction_",
  // custom
  Notification: "Notification_",
  AccountTransaction: "AccountTransaction_",
  CountedServiceTransaction: "CategoriesTransactions_",
  Expenses: "Expenses_",
  Revenues: "Revenues_",
  ServiceEntitlement: "ServiceEntitlement_",
  Complaint: "Complaint_",
  InstallmentPayment: "InstallmentPayment_",
  Debt: "Debt_",
  EducationalGroupAttendance: "EducationalGroupAttendance_",
  StudentScheduleExamTime: "StudentScheduleExamTime_",
  Installment: "Installment_",
  InstallmentSchedule: "InstallmentSchedule_",
  EducationalGroupStudent: "EducationalGroupStudent_",
  EducationalGroupTransfer: "EducationalGroupTransferring_",
  JoiningApplicationSubscription: "JoiningApplicationSubscription_",

  //#region Places
  PlaceUser: "PlaceUser_",

  SharedMediaWithSpaceStorageMedia: "SharedMediaWithSpaceStorageMedia_",

  PlaceAdminsEgypt: EnumClass.PlaceType.AdminsEgypt,
  PlaceMasterAdmin: EnumClass.PlaceType.MasterAdmin,
  PlaceEmployee: EnumClass.PlaceType.Employee,
  // PlaceSales: EnumClass.PlaceType.Sales,
  PlaceStudent: EnumClass.PlaceType.Student,
  PlaceSupplier: EnumClass.PlaceType.Supplier,
  PlaceParent: EnumClass.PlaceType.Parent,
  PlaceClient: EnumClass.PlaceType.Client,
  PlaceOther: EnumClass.PlaceType.Other,

  //#endregion Places

  //#region StorageSpacePlace
  StorageSpacePlaceMasterAdmin: EnumClass.StorageSpaceType.PlaceMasterAdmin,
  StorageSpacePlaceEmployee: EnumClass.StorageSpaceType.PlaceEmployee,
  StorageSpacePlaceStudent: EnumClass.StorageSpaceType.PlaceStudent,
  StorageSpacePlaceSupplier: EnumClass.StorageSpaceType.PlaceSupplier,
  StorageSpacePlaceParent: EnumClass.StorageSpaceType.PlaceParent,
  StorageSpacePlaceClient: EnumClass.StorageSpaceType.PlaceClient,
  StorageSpacePlaceOther: EnumClass.StorageSpaceType.PlaceOther,
  // StorageSpacePlaceVechileOwner: EnumClass.StorageSpaceType.PlaceVechileOwner,
  // StorageSpacePlaceSales: EnumClass.StorageSpaceType.PlaceSales,
  //#endregion StorageSpacePlace

  //#region StorageSpaceMediaPlace
  StorageSpaceMediaPlaceMasterAdmin:
    EnumClass.StorageSpaceMediaType.PlaceMasterAdmin,
  StorageSpaceMediaPlaceEmployee: EnumClass.StorageSpaceMediaType.PlaceEmployee,
  StorageSpaceMediaPlaceStudent: EnumClass.StorageSpaceMediaType.PlaceStudent,
  StorageSpaceMediaPlaceSupplier: EnumClass.StorageSpaceMediaType.PlaceSupplier,
  StorageSpaceMediaPlaceParent: EnumClass.StorageSpaceMediaType.PlaceParent,
  StorageSpaceMediaPlaceClient: EnumClass.StorageSpaceMediaType.PlaceClient,
  StorageSpaceMediaPlaceOther: EnumClass.StorageSpaceMediaType.PlaceOther,
  // StorageSpaceMediaPlaceVechileOwner: EnumClass.StorageSpaceMediaType.PlaceVechileOwner,
  // StorageSpaceMediaPlaceSales: EnumClass.StorageSpaceMediaType.PlaceSales,
  //#endregion StorageSpaceMediaPlace
};

export const GeneralFun = {
  // view
  viewActive: EnumClass.ActivationType.Active + "1",
  viewArchived: EnumClass.ActivationType.Archived + "1",
  viewBlocked: EnumClass.ActivationType.Blocked + "1",
  viewDialogActive: EnumClass.ActivationType.Active + "4",
  viewDialogArchived: EnumClass.ActivationType.Archived + "4",
  viewDialogBlocked: EnumClass.ActivationType.Blocked + "4",
  viewReportActive: EnumClass.ActivationType.Active + "7",
  viewReportArchived: EnumClass.ActivationType.Archived + "7",
  viewReportBlocked: EnumClass.ActivationType.Blocked + "7",
  // actions
  itemAdd: "1",
  itemUpdate: "3",
  itemActive: "5",
  itemArchived: "7",
  itemBlocked: "9",
  itemDeleteImage: "11",
  itemFinaleDelete: "13",
};

// general functions for login
export const LoginGeneralFunctions = {
  ...GeneralFun,
  // custom
  view: GeneralFun.viewActive,
  viewReport: "AST-174009",
  //  MediaPackageCode
  subscribe: ModulesPrivilege.MediaPackageCode + "112",
  //  Discussion
  changeClosedState: ModulesPrivilege.Discussion + "changeClosedState",

  addSharedMediaWithSpaceStorageMedia:
    ModulesPrivilege.SharedMediaWithSpaceStorageMedia + "1",
  cancelSharedMediaWithSpaceStorageMedia:
    ModulesPrivilege.SharedMediaWithSpaceStorageMedia + "13",
  //  Notification
  notificationView: ModulesPrivilege.Notification + "1",
  notificationRead: ModulesPrivilege.Notification + "2",
  notificationOpen: ModulesPrivilege.Notification + "3",
  notificationArchive: ModulesPrivilege.Notification + "4",
  notificationAdd: ModulesPrivilege.Notification + "5",

  // AccountTransaction
  accountTransactionDeposit:
    ModulesPrivilege.AccountTransaction +
    EnumClass.AccountTransactionType.DepositToAccount,
  accountTransactionDropdown:
    ModulesPrivilege.AccountTransaction +
    EnumClass.AccountTransactionType.DropdownFromAccount,
  accountTransactionPayExpenses:
    ModulesPrivilege.AccountTransaction +
    EnumClass.AccountTransactionType.PayExpenses,
  accountTransactionRefundExpenses:
    ModulesPrivilege.AccountTransaction +
    EnumClass.AccountTransactionType.RefundExpenses,
  accountTransactionAccrualRevenues:
    ModulesPrivilege.AccountTransaction +
    EnumClass.AccountTransactionType.AccrualRevenues,
  accountTransactionRefundRevenues:
    ModulesPrivilege.AccountTransaction +
    EnumClass.AccountTransactionType.RefundRevenues,

  // CountedServiceTransaction
  countedServiceTransactionViewBuy:
    ModulesPrivilege.CountedServiceTransaction + "5",
  countedServiceTransactionViewSell:
    ModulesPrivilege.CountedServiceTransaction + "6",
  countedServiceTransactionViewRefund:
    ModulesPrivilege.CountedServiceTransaction + "7",
  countedServiceTransactionBuy:
    ModulesPrivilege.CountedServiceTransaction + "2",
  countedServiceTransactionSell:
    ModulesPrivilege.CountedServiceTransaction + "3",
  countedServiceTransactionRefund:
    ModulesPrivilege.CountedServiceTransaction + "4",

  // Expenses
  payExpenses: ModulesPrivilege.Expenses + "2",
  refundExpenses: ModulesPrivilege.Expenses + "3",
  // Revenues
  accrualRevenues: ModulesPrivilege.Revenues + "2",
  refundRevenues: ModulesPrivilege.Revenues + "3",
  // ServiceEntitlement
  accrualServiceEntitlement: ModulesPrivilege.ServiceEntitlement + "2",
  refundServiceEntitlement: ModulesPrivilege.ServiceEntitlement + "3",
  // Complaint
  closeComplaint: ModulesPrivilege.Complaint + "333",
  // EducationalJoiningApplicationsPrivlage
  changeApproveApplications:
    ModulesPrivilege.EducationalJoiningApplication + "333",
  // UserLoginCode
  resetUserloginCode: ModulesPrivilege.InstallmentPayment + "334",
  resetUserDeviceCode: ModulesPrivilege.InstallmentPayment + "333",
  //  InstallmentPayment
  addPayments: ModulesPrivilege.InstallmentPayment + "2",
  refundPayments: ModulesPrivilege.InstallmentPayment + "3",
  //#region PriceQuotation
  view_WorkProgress:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.WorkProgress,
  view_WaitingForQuotes:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.WaitingForQuotes,
  view_WaitingForCustomerAccept:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.WaitingForCustomerAccept,
  view_RejectedQuotesFormCustomer:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.RejectedQuotesFormCustomer,
  view_AcceptQuotesFormCustomer:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.AcceptQuotesFormCustomer,
  view_InJobOrder:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.InJobOrder,
  view_FinishJobOrderNotCustomerReceive:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.FinishJobOrderNotCustomerReceive,
  view_FinishJobOrderCustomerReceive:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.FinishJobOrderCustomerReceive,
  view_Canceled:
    ModulesPrivilege.PriceQuotation +
    PRICE_QUOTATION_HISTORY_WORK_TYPES.Canceled,

  sendPriceQuotationToClient:
    ModulesPrivilege.PriceQuotation + "SendPriceQuotationToClient",
  resendPriceQuotations:
    ModulesPrivilege.PriceQuotation + "ResendPriceQuotations",
  moveToRejected:
    ModulesPrivilege.PriceQuotation + "Move_PriceQuotationHistoryWorkType-4",
  moveToApproved:
    ModulesPrivilege.PriceQuotation + "Move_PriceQuotationHistoryWorkType-5",
  moveToCanceled:
    ModulesPrivilege.PriceQuotation + "Move_PriceQuotationHistoryWorkType-9",
  //#endregion PriceQuotation

  //#region PriceQuotationDetails
  view_PriceQuotationDetails_NewlyWanted:
    ModulesPrivilege.PriceQuotationDetails +
    "QuotationDetailsHistoryWorkType-1",
  view_PriceQuotationDetails_WorkProgres:
    ModulesPrivilege.PriceQuotationDetails +
    "QuotationDetailsHistoryWorkType-2",
  view_PriceQuotationDetails_ReviewedByCustomer:
    ModulesPrivilege.PriceQuotationDetails +
    "QuotationDetailsHistoryWorkType-3",
  view_PriceQuotationDetails_RejectedByCustomer:
    ModulesPrivilege.PriceQuotationDetails +
    "QuotationDetailsHistoryWorkType-4",
  view_PriceQuotationDetails_WaitingForQuotes:
    ModulesPrivilege.PriceQuotationDetails +
    "QuotationDetailsHistoryWorkType-5",
  view_PriceQuotationDetails_CanceledbyCustomer:
    ModulesPrivilege.PriceQuotationDetails +
    "QuotationDetailsHistoryWorkType-9",
  move_PriceQuotationDetails_NewlyWanted:
    ModulesPrivilege.PriceQuotationDetails +
    "Move_QuotationDetailsHistoryWorkType-1",
  move_PriceQuotationDetails_WorkProgres:
    ModulesPrivilege.PriceQuotationDetails +
    "Move_QuotationDetailsHistoryWorkType-2",
  move_PriceQuotationDetails_ReviewedByCustomer:
    ModulesPrivilege.PriceQuotationDetails +
    "Move_QuotationDetailsHistoryWorkType-3",
  move_PriceQuotationDetails_RejectedByCustomer:
    ModulesPrivilege.PriceQuotationDetails +
    "Move_QuotationDetailsHistoryWorkType-4",
  move_PriceQuotationDetails_WaitingForQuotes:
    ModulesPrivilege.PriceQuotationDetails +
    "Move_QuotationDetailsHistoryWorkType-5",
  move_PriceQuotationDetails_CanceledbyCustomer:
    ModulesPrivilege.PriceQuotationDetails +
    "Move_QuotationDetailsHistoryWorkType-9",
  //#endregion PriceQuotationDetails

  //#region PriceQuotationAffiliateOperation
  sendPriceQuotationAffiliateOperationToClient:
    ModulesPrivilege.PriceQuotationAffiliateOperation +
    "SendPriceQuotationAffiliateOperationToClient",
  //#endregion PriceQuotationAffiliateOperation

  //#region PriceQuotationJobOrders
  view_PriceQuotationJobOrder_NewlyWanted:
    ModulesPrivilege.PriceQuotationJobOrder +
    "PriceQuotationJobOrderHistoryWorkType-1",
  view_PriceQuotationJobOrder_WorkProgres:
    ModulesPrivilege.PriceQuotationJobOrder +
    "PriceQuotationJobOrderHistoryWorkType-2",
  view_PriceQuotationJobOrder_FinishNotCustomerReceived:
    ModulesPrivilege.PriceQuotationJobOrder +
    "PriceQuotationJobOrderHistoryWorkType-3",
  view_PriceQuotationJobOrder_FinishCustomerReceived:
    ModulesPrivilege.PriceQuotationJobOrder +
    "PriceQuotationJobOrderHistoryWorkType-4",
  view_PriceQuotationJobOrder_Canceled:
    ModulesPrivilege.PriceQuotationJobOrder +
    "PriceQuotationJobOrderHistoryWorkType-5",
  move_PriceQuotationJobOrder_NewlyWanted:
    ModulesPrivilege.PriceQuotationJobOrder +
    "Move_PriceQuotationJobOrderHistoryWorkType-1",
  move_PriceQuotationJobOrder_WorkProgres:
    ModulesPrivilege.PriceQuotationJobOrder +
    "Move_PriceQuotationJobOrderHistoryWorkType-2",
  move_PriceQuotationJobOrder_FinishNotCustomerReceived:
    ModulesPrivilege.PriceQuotationJobOrder +
    "Move_PriceQuotationJobOrderHistoryWorkType-3",
  move_PriceQuotationJobOrder_FinishCustomerReceived:
    ModulesPrivilege.PriceQuotationJobOrder +
    "Move_PriceQuotationJobOrderHistoryWorkType-4",
  move_PriceQuotationJobOrder_Canceled:
    ModulesPrivilege.PriceQuotationJobOrder +
    "Move_PriceQuotationJobOrderHistoryWorkType-5",
  //#endregion PriceQuotationJobOrders

  //#region EducationalGroup
  changeCloseType: ModulesPrivilege.EducationalGroup + "444",
  changeFinishType: ModulesPrivilege.EducationalGroup + "555",
  //#endregion EducationalGroup

  //#region EducationalGroupStudent
  changeStudentCertificateStatus:
    ModulesPrivilege.EducationalGroupStudent + "111",
  //#endregion EducationalGroupStudent
};
// general functions for view
export const GeneralFunctions = {
  // view
  viewSelfDataActive: EnumClass.ActivationType.Active + "2",
  viewAllDataActive: EnumClass.ActivationType.Active + "3",
  viewSelfDataArchived: EnumClass.ActivationType.Archived + "2",
  viewAllDataArchived: EnumClass.ActivationType.Archived + "3",
  viewSelfDataBlocked: EnumClass.ActivationType.Blocked + "2",
  viewAllDataBlocked: EnumClass.ActivationType.Blocked + "3",
  // dialog
  viewDialogSelfDataActive: EnumClass.ActivationType.Active + "5",
  viewDialogAllDataActive: EnumClass.ActivationType.Active + "6",
  viewDialogSelfDataArchived: EnumClass.ActivationType.Archived + "5",
  viewDialogAllDataArchived: EnumClass.ActivationType.Archived + "6",
  viewDialogSelfDataBlocked: EnumClass.ActivationType.Blocked + "5",
  viewDialogAllDataBlocked: EnumClass.ActivationType.Blocked + "6",
  // report
  reportingSelfDataActive: EnumClass.ActivationType.Active + "8",
  reportingAllDataActive: EnumClass.ActivationType.Active + "9",
  reportingSelfDataArchived: EnumClass.ActivationType.Archived + "8",
  reportingAllDataArchived: EnumClass.ActivationType.Archived + "9",
  reportingSelfDataBlocked: EnumClass.ActivationType.Blocked + "8",
  reportingAllDataBlocked: EnumClass.ActivationType.Blocked + "9",
  notificationOnReportingData: "15",
  // actions
  itemAdd: GeneralFun.itemAdd,
  notificationOnItemAdd: "2",
  itemUpdate: GeneralFun.itemUpdate,
  notificationOnItemUpdate: "4",
  itemActive: GeneralFun.itemActive,
  notificationOnItemActive: "6",
  itemArchive: GeneralFun.itemArchived,
  notificationOnItemArchive: "8",
  itemBlocked: GeneralFun.itemBlocked,
  notificationOnItemBlocked: "10",
  itemDeleteImage: GeneralFun.itemDeleteImage,
  itemFinaleDelete: GeneralFun.itemFinaleDelete,
  notificationOnDeleteImage: "12",
  notificationOnFinaleDeleteItem: "14",
  closeComplaint: "333",
};
