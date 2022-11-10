//#region Educational
export const EducationalPeriods = {
  getAll: "/api/EducationalPeriods/GetAllEducationalPeriods",
  getDetails: "/api/EducationalPeriods/GetEducationalPeriodDetails",
  getDialog: "/api/EducationalPeriods/GetEducationalPeriodDialog",
  add: "/api/EducationalPeriods/AddEducationalPeriod",
  update: "/api/EducationalPeriods/UpdateEducationalPeriod",
  changeActivationType:
    "/api/EducationalPeriods/ChangeActivationTypeEducationalPeriod",
  finalDelete: "/api/EducationalPeriods/DeleteEducationalPeriod",
  deleteImage: "/api/EducationalPeriods/DeleteImage",
};
export const Discussions = {
  getAll: "/api/Discussions/GetAllDiscussions",
  getDetails: "/api/Discussions/GetDiscussionDetails",
  getDialog: "/api/Discussions/GetDiscussionDialog",
  add: "/api/Discussions/AddDiscussion",
  update: "/api/Discussions/UpdateDiscussion",
  changeActivationType: "/api/Discussions/ChangeActivationTypeDiscussion",
  changeClosedState: "/api/Discussions/ChangeDiscussionClosedState",
  finalDelete: "/api/Discussions/DeleteDiscussion",
  deleteImage: "/api/Discussions/DeleteImage",
};
export const DiscussionComments = {
  getAll: "/api/DiscussionComments/GetAllDiscussionComments",
  getDetails: "/api/DiscussionComments/GetDiscussionCommentDetails",
  getDialog: "/api/DiscussionComments/GetDiscussionCommentDialog",
  add: "/api/DiscussionComments/AddDiscussionComment",
  update: "/api/DiscussionComments/UpdateDiscussionComment",
  changeActivationType:
    "/api/DiscussionComments/ChangeActivationTypeDiscussionComment",
  finalDelete: "/api/DiscussionComments/DeleteDiscussionComment",
  deleteImage: "/api/DiscussionComments/DeleteImage",
};
export const DiscussionCommentReacts = {
  add: "/api/DiscussionCommentReacts/AddDiscussionCommentReact",
};

export const EducationalRatings = {
  getAll: "/api/EducationalRatings/GetAllEducationalRatings",
  getDetails: "/api/EducationalRatings/GetEducationalRatingDetails",
  getDialog: "/api/EducationalRatings/GetEducationalRatingDialog",
  add: "/api/EducationalRatings/AddEducationalRating",
  update: "/api/EducationalRatings/UpdateEducationalRating",
  changeActivationType:
    "/api/EducationalRatings/ChangeActivationTypeEducationalRating",
  finalDelete: "/api/EducationalRatings/DeleteEducationalRating",
  deleteImage: "/api/EducationalRatings/DeleteImage",
};
export const EducationalCategories = {
  getAll: "/api/EducationalCategories/GetAllEducationalCategories",
  getDetails: "/api/EducationalCategories/GetEducationalCategoryDetails",
  getDialog: "/api/EducationalCategories/GetEducationalCategoryDialog",
  add: "/api/EducationalCategories/AddEducationalCategory",
  update: "/api/EducationalCategories/UpdateEducationalCategory",
  changeActivationType:
    "/api/EducationalCategories/ChangeActivationTypeEducationalCategory",
  finalDelete: "/api/EducationalCategories/DeleteEducationalCategory",
  deleteImage: "/api/EducationalCategories/DeleteImage",
};

export const EducationalJoiningApplications = {
  getAll:
    "/api/EducationalJoiningApplications/GetAllEducationalJoiningApplications",
  getDetails:
    "/api/EducationalJoiningApplications/GetEducationalJoiningApplicationDetails",
  getDialog:
    "/api/EducationalJoiningApplications/GetEducationalJoiningApplicationDialog",
  getStatement:
    "/api/EducationalJoiningApplications/GetEducationalStatementsReport",
  add: "/api/EducationalJoiningApplications/AddEducationalJoiningApplication",
  update:
    "/api/EducationalJoiningApplications/UpdateEducationalJoiningApplication",
  changeApprove:
    "/api/EducationalJoiningApplications/ChangeApproveEducationalJoiningApplication",
  finalDelete:
    "/api/EducationalJoiningApplications/DeleteEducationalJoiningApplication",
  deleteImage: "/api/EducationalJoiningApplications/DeleteImage",
  getReport:
    "/api/EducationalJoiningApplications/GetEducationalJoiningApplicationReport",
};
export const JoiningApplicationSubscriptions = {
  getAll:
    "/api/JoiningApplicationSubscriptions/GetAllJoiningApplicationSubscriptions",
  getDetails:
    "/api/JoiningApplicationSubscriptions/GetJoiningApplicationSubscriptionDetails",
  getDialog:
    "/api/JoiningApplicationSubscriptions/GetJoiningApplicationSubscriptionDialog",
  add: "/api/JoiningApplicationSubscriptions/AddJoiningApplicationSubscription",
};

export const EducationalGroups = {
  getAll: "/api/EducationalGroups/GetAllEducationalGroups",
  getDetails: "/api/EducationalGroups/GetEducationalGroupDetails",
  getDialog: "/api/EducationalGroups/GetEducationalGroupDialog",
  add: "/api/EducationalGroups/AddEducationalGroupJson",
  addWithScheduleTimes:
    "/api/EducationalGroups/AddEducationalGroupWithScheduleTimes",
  update: "/api/EducationalGroups/UpdateEducationalGroupJson",
  changeCloseType: "/api/EducationalGroups/UpdateEducationalGroupClosedState",
  changeFinishType:
    "/api/EducationalGroups/UpdateEducationalGroupTerminationState",
  changeActivationType:
    "/api/EducationalGroups/ChangeActivationTypeEducationalGroup",
  finalDelete: "/api/EducationalGroups/DeleteEducationalGroup",
  deleteImage: "/api/EducationalGroups/DeleteImage",
  addStudents: "/api/EducationalGroupStudents/AddEducationalGroupStudent",
};
export const EducationalGroupStudents = {
  getAll: "/api/EducationalGroupStudents/GetEducationalGroupStudents",
  addStudents: "/api/EducationalGroupStudents/AddEducationalGroupStudent",
  changeCertificateStatus:
    "/api/EducationalGroupStudents/ChangeStudentCertificateStatus",
};
export const EducationalGroupEmployees = {
  getAll: "/api/EducationalGroupsEmployees/GetAllEmployeesGroups",
};
export const EducationalGroupPlaces = {
  getAll: "/api/EducationalGroupsPlaces/GetAllPlacesGroups",
};
export const EducationalGroupTransfers = {
  getAll: "/api/EducationalGroupTransfers/GetAllEducationalGroupTransfers",
  add: "/api/EducationalGroupTransfers/AddEducationalGroupTransferring",
};
export const EducationalGroupAttendances = {
  getAll: "/api/EducationalGroupAttendances/GetAllEducationalGroupAttendances",
  getDetails:
    "/api/EducationalGroupAttendances/GetEducationalGroupAttendanceDetails",
  add: "/api/EducationalGroupAttendances/AddEducationalGroupAttendance",
  addBySession:
    "/api/EducationalGroupAttendances/AddEducationalGroupAttendanceBySession",
  update:
    "/api/EducationalGroupAttendances/UpdateOneEducationalGroupAttendance",
  finalDelete:
    "/api/EducationalGroupAttendances/DeleteOneEducationalGroupAttendance",
};
export const EducationalScheduleTimes = {
  getAll: "/api/EducationalScheduleTimes/GetAllEducationalScheduleTimes",
  getDetails: "/api/EducationalScheduleTimes/GetEducationalScheduleTimeDetails",
  getDialog: "/api/EducationalScheduleTimes/GetEducationalScheduleTimeDialog",
  getGroupReport: "/api/EducationalScheduleTimes/GetGroupScheduleTimesReport",
  getPlaceReport: "/api/EducationalScheduleTimes/GetPlaceScheduleTimesReport",
  getEmployeeReport:
    "/api/EducationalScheduleTimes/GetEmployeeScheduleTimesReport",
  getStudentReport:
    "/api/EducationalScheduleTimes/GetStudentScheduleTimesReport",
  getReport: "/api/EducationalScheduleTimes/GetEducationalScheduleTimesReport",
  getNamesReport:
    "/api/EducationalScheduleTimes/GetEducationalScheduleTimeAttendanceReport",
  getAllInCalendar:
    "/api/EducationalScheduleTimes/GetAllEducationalScheduleTimesInCalendar",
  enquiry: "/api/EducationalScheduleTimes/EnquiryEducationalGroup",
  add: "/api/EducationalScheduleTimes/AddEducationalScheduleTimes",
  update: "/api/EducationalScheduleTimes/UpdateEducationalScheduleTimes",
  finalDelete: "/api/EducationalScheduleTimes/DeleteEducationalScheduleTimes",
};
export const SimpleExamModels = {
  getAll: "/api/SimpleExamModels/GetAllSimpleExamModels",
  getDetails: "/api/SimpleExamModels/GetSimpleExamModelDetails",
  getDialog: "/api/SimpleExamModels/GetSimpleExamModelDialog",
  add: "/api/SimpleExamModels/AddSimpleExamModelJson",
  update: "/api/SimpleExamModels/UpdateSimpleExamModelJson",
  changeActivationType:
    "/api/SimpleExamModels/ChangeActivationTypeSimpleExamModel",
  finalDelete: "/api/SimpleExamModels/DeleteSimpleExamModel",
  deleteImage: "/api/SimpleExamModels/DeleteImage",
  updateParagraphImage:
    "/api/SimpleExamParagraphs/UpdateSimpleExamParagraphImage",
  deleteParagraphImage: "/api/SimpleExamParagraphs/DeleteImage",
  updateTrueFalseQuestionImage:
    "/api/TrueFalseQuestions/UpdateTrueFalseQuestionImage",
  deleteTrueFalseQuestionImage: "/api/TrueFalseQuestions/DeleteImage",
  updateMcqQuestionImage: "/api/McqQuestions/UpdateMcqQuestionImage",
  deleteMcqQuestionImage: "/api/McqQuestions/DeleteImage",
};
export const GroupScheduleExams = {
  getAll: "/api/GroupScheduleExams/GetAllGroupScheduleExams",
  getDetails: "/api/GroupScheduleExams/GetGroupScheduleExamDetails",
  getDialog: "/api/GroupScheduleExams/GetGroupScheduleExamDialog",
  add: "/api/GroupScheduleExams/AddGroupScheduleExam",
  update: "/api/GroupScheduleExams/UpdateGroupScheduleExam",
  finalDelete: "/api/GroupScheduleExams/DeleteGroupScheduleExam",
  deleteImage: "/api/GroupScheduleExams/DeleteImage",
  getReport: "/api/GroupScheduleExams/GetGroupScheduleExamReport",
};
export const StudentScheduleExamTimes = {
  getAll: "/api/StudentScheduleExamTimes/GetAllStudentScheduleExamTimes",
  getDetails: "/api/StudentScheduleExamTimes/GetStudentScheduleExamTimeDetails",
  getInCalendar:
    "/api/StudentScheduleExamTimes/GetAllStudentScheduleExamTimesInCalendar",
  generateExam:
    "/api/StudentScheduleExamTimes/GetStudentScheduleExamTimeReport",
};
//#endregion Educational

//#region UsersPersonalData
export const UserFamilies = {
  getAll: "/api/UsersFamily/GetAllUsersFamily",
  getDetails: "/api/UsersFamily/GetUserFamilyDetails",
  getDialog: "/api/UsersFamily/GetUserFamilyDialog",
  add: "/api/UsersFamily/AddUserFamily",
  changeActivationType: "/api/UsersFamily/ChangeActivationTypeUserFamily",
  finalDelete: "/api/UsersFamily/DeleteUserFamily",
  deleteImage: "/api/UsersFamily/DeleteImage",
};
export const UserQualifications = {
  getAll: "/api/UserQualifications/GetAllUserQualifications",
  getDetails: "/api/UserQualifications/GetUserQualificationDetails",
  getDialog: "/api/UserQualifications/GetUserQualificationDialog",
  getReport: "/api/UserQualifications/GetAllUserQualificationsReport",
  add: "/api/UserQualifications/AddUserQualification",
  update: "/api/UserQualifications/UpdateUserQualification",
  changeActivationType:
    "/api/UserQualifications/ChangeActivationTypeUserQualification",
  finalDelete: "/api/UserQualifications/DeleteUserQualification",
  deleteImage: "/api/UserQualifications/DeleteImage",
};

export const UserScientificDegrees = {
  getAll: "/api/UserScientificDegrees/GetAllUserScientificDegrees",
  getDetails: "/api/UserScientificDegrees/GetUserScientificDegreeDetails",
  getDialog: "/api/UserScientificDegrees/GetUserScientificDegreeDialog",
  add: "/api/UserScientificDegrees/AddUserScientificDegree",
  update: "/api/UserScientificDegrees/UpdateUserScientificDegree",
  changeActivationType:
    "/api/UserScientificDegrees/ChangeActivationTypeUserScientificDegree",
  finalDelete: "/api/UserScientificDegrees/DeleteUserScientificDegree",
  deleteImage: "/api/UserScientificDegrees/DeleteImage",
};
export const UserPersonalCards = {
  getAll: "/api/UserPersonalCards/GetAllUserPersonalCards",
  getDetails: "/api/UserPersonalCards/GetUserPersonalCardDetails",
  getDialog: "/api/UserPersonalCards/GetUserPersonalCardDialog",
  add: "/api/UserPersonalCards/AddUserPersonalCard",
  update: "/api/UserPersonalCards/UpdateUserPersonalCard",
  changeActivationType:
    "/api/UserPersonalCards/ChangeActivationTypeUserPersonalCard",
  finalDelete: "/api/UserPersonalCards/DeleteUserPersonalCard",
  deleteImage: "/api/UserPersonalCards/DeleteImage",
};
export const UserTrainingCourses = {
  getAll: "/api/UserTrainingCourses/GetAllUserTrainingCourses",
  getDetails: "/api/UserTrainingCourses/GetUserTrainingCourseDetails",
  getDialog: "/api/UserTrainingCourses/GetUserTrainingCourseDialog",
  add: "/api/UserTrainingCourses/AddUserTrainingCourse",
  update: "/api/UserTrainingCourses/UpdateUserTrainingCourse",
  changeActivationType:
    "/api/UserTrainingCourses/ChangeActivationTypeUserTrainingCourse",
  finalDelete: "/api/UserTrainingCourses/DeleteUserTrainingCourse",
  deleteImage: "/api/UserTrainingCourses/DeleteImage",
};
export const UserExperiences = {
  getAll: "/api/UserExperiences/GetAllUserExperiences",
  getDetails: "/api/UserExperiences/GetUserExperienceDetails",
  getDialog: "/api/UserExperiences/GetUserExperienceDialog",
  add: "/api/UserExperiences/AddUserExperience",
  update: "/api/UserExperiences/UpdateUserExperience",
  changeActivationType:
    "/api/UserExperiences/ChangeActivationTypeUserExperience",
  finalDelete: "/api/UserExperiences/DeleteUserExperience",
  deleteImage: "/api/UserExperiences/DeleteImage",
};

export const UserInjuries = {
  getAll: "/api/UserInjuries/GetAllUserInjuries",
  getDetails: "/api/UserInjuries/GetUserInjuryDetails",
  getDialog: "/api/UserInjuries/GetUserInjuryDialog",
  add: "/api/UserInjuries/AddUserInjury",
  update: "/api/UserInjuries/UpdateUserInjury",
  changeActivationType: "/api/UserInjuries/ChangeActivationTypeUserInjury",
  finalDelete: "/api/UserInjuries/DeleteUserInjury",
  deleteImage: "/api/UserInjuries/DeleteImage",
};
export const UserOperations = {
  getAll: "/api/UserOperations/GetAllUserOperations",
  getDetails: "/api/UserOperations/GetUserOperationDetails",
  getDialog: "/api/UserOperations/GetUserOperationDialog",
  add: "/api/UserOperations/AddUserOperation",
  update: "/api/UserOperations/UpdateUserOperation",
  changeActivationType: "/api/UserOperations/ChangeActivationTypeUserOperation",
  finalDelete: "/api/UserOperations/DeleteUserOperation",
  deleteImage: "/api/UserOperations/DeleteImage",
};

//#endregion UsersPersonalData

//#region Users
export const Users = {
  getAll: "/api/Users/GetAllUsers",
  getDetails: "/api/Users/GetUserDetails",
  getDialog: "/api/Users/GetUserDialog",
  getReport: "/api/StudentScheduleExamTimes/GetStudentScheduleExamTimesReport",
  getCardIdReport: "/api/Users/GetAllUsersCardIdReport",
  add: "/api/Users/AddUser",
  update: "/api/Users/UpdateUser",
  changeActivationType: "/api/Users/ChangeActivationTypeUser",
  finalDelete: "/api/Users/DeleteUser",
  deleteImage: "/api/Users/DeleteImage",
  updateAndGetUserFinanceStatistic:
    "/api/UserFinanceStatistics/UpdateAndGetUserFinanceStatistic",
};
//#endregion Users

//#region PlaceUsers
export const PlaceUsers = {
  getAll: "/api/PlaceUsers/GetPlaceUsers",
  getDetails: "/api/PlaceUsers/GetPlaceUserDetails",
  addPlaceUsers: "/api/PlaceUsers/AddPlaceUsers",
  addUserPlaces: "/api/PlaceUsers/AddUserPlaces",
  finalDelete: "/api/PlaceUsers/DeletePlaceUsers",
};
//#endregion PlaceUsers

//#region Places
export const Places = {
  getAll: "/api/Places/GetAllPlaces",
  getDetails: "/api/Places/GetPlaceDetails",
  getDialog: "/api/Places/GetPlaceDialog",
  add: "/api/Places/AddPlace",
  update: "/api/Places/UpdatePlace",
  changeActivationType: "/api/Places/ChangeActivationTypePlace",
  finalDelete: "/api/Places/DeletePlace",
  deleteImage: "/api/Places/DeleteImage",
};
//#endregion Places

//#region SystemComponents
export const SystemComponents = {
  getAll: "/api/SystemComponents/GetAllSystemComponents",
  getDetails: "/api/SystemComponents/GetSystemComponentDetails",
  getDialog: "/api/SystemComponents/GetSystemComponentDialog",
  add: "/api/SystemComponents/AddSystemComponent",
  update: "/api/SystemComponents/UpdateSystemComponent",
  changeActivationType:
    "/api/SystemComponents/ChangeActivationTypeSystemComponent",
  finalDelete: "/api/SystemComponents/DeleteSystemComponent",
  deleteImage: "/api/SystemComponents/DeleteImage",
};
//#endregion SystemComponents

//#region SystemComponentsHierarchies
export const SystemComponentsHierarchies = {
  getAll: "/api/SystemComponentsHierarchies/GetAllSystemComponentsHierarchies",
  getDetails:
    "/api/SystemComponentsHierarchies/GetSystemComponentsHierarchyDetails",
  getDialog:
    "/api/SystemComponentsHierarchies/GetSystemComponentsHierarchyDialog",
  add: "/api/SystemComponentsHierarchies/AddSystemComponentsHierarchy",
  update: "/api/SystemComponentsHierarchies/UpdateSystemComponentsHierarchy",
  changeActivationType:
    "/api/SystemComponentsHierarchies/ChangeActivationTypeSystemComponentsHierarchy",
  finalDelete:
    "/api/SystemComponentsHierarchies/DeleteSystemComponentsHierarchy",
  deleteImage: "/api/SystemComponentsHierarchies/DeleteImage",
};
//#endregion SystemComponentsHierarchies

//#region Services
export const Services = {
  getAll: "/api/Services/GetAllServices",
  getDetails: "/api/Services/GetServiceDetails",
  getDialog: "/api/Services/GetServiceDialog",
  add: "/api/Services/AddService",
  update: "/api/Services/UpdateService",
  changeActivationType: "/api/Services/ChangeActivationTypeService",
  finalDelete: "/api/Services/DeleteService",
  deleteImage: "/api/Services/DeleteImage",
};
//#endregion Services

//#region CountedServices
export const CountedServices = {
  getAll: "/api/CountedServices/GetAllCountedServices",
  getDetails: "/api/CountedServices/GetCountedServiceDetails",
  getDialog: "/api/CountedServices/GetCountedServiceDialog",
  add: "/api/CountedServices/AddCountedService",
  update: "/api/CountedServices/UpdateCountedService",
  changeActivationType:
    "/api/CountedServices/ChangeActivationTypeCountedService",
  finalDelete: "/api/CountedServices/DeleteCountedService",
  deleteImage: "/api/CountedServices/DeleteImage",
};
//#endregion CountedServices

//#region Products
export const StoreItems = {
  getAll: "/api/StoreItems/GetAllStoreItems",
  getDetails: "/api/StoreItems/GetStoreItemDetails",
  getDialog: "/api/StoreItems/GetStoreItemDialog",
  getReport: "/api/StoreItems/GetAllStoreItemsPriceQuotationsReport",
  add: "/api/StoreItems/AddStoreItem",
  update: "/api/StoreItems/UpdateStoreItem",
  changeActivationType: "/api/StoreItems/ChangeActivationTypeStoreItem",
  finalDelete: "/api/StoreItems/DeleteStoreItem",
  deleteImage: "/api/StoreItems/DeleteImage",
};
export const DropDownLists = {
  getAll: "/api/DropDownLists/GetAllDropDownLists",
  getDetails: "/api/DropDownLists/GetDropDownListDetails",
  getDialog: "/api/DropDownLists/GetDropDownListDialog",
  add: "/api/DropDownLists/AddDropDownList",
  update: "/api/DropDownLists/UpdateDropDownList",
  changeActivationType: "/api/DropDownLists/ChangeActivationTypeDropDownList",
  finalDelete: "/api/DropDownLists/DeleteDropDownList",
  deleteImage: "/api/DropDownLists/DeleteImage",
};
export const PropertyTypes = {
  getAll: "/api/PropertyTypes/GetAllPropertyTypes",
  getDetails: "/api/PropertyTypes/GetPropertyTypeDetails",
  getDialog: "/api/PropertyTypes/GetPropertyTypeDialog",
  add: "/api/PropertyTypes/AddPropertyType",
  update: "/api/PropertyTypes/UpdatePropertyType",
  changeActivationType: "/api/PropertyTypes/ChangeActivationTypePropertyType",
  finalDelete: "/api/PropertyTypes/DeletePropertyType",
  deleteImage: "/api/PropertyTypes/DeleteImage",
};

export const PriceQuotations = {
  getAll: "/api/PriceQuotations/GetAllPriceQuotations",
  getDetails: "/api/PriceQuotations/GetPriceQuotationDetails",
  getReport: "/api/PriceQuotations/GetAllPriceQuotationsReport",
  getReportExport: "/api/PriceQuotations/GetReportPriceQuotation",
  add: "/api/PriceQuotations/AddPriceQuotationJson",
  sendToClient: "/api/PriceQuotations/SendPriceQuotationToClient",
  resend: "/api/PriceQuotations/ResendPriceQuotations",
  moveToReject:
    "/api/PriceQuotationHistoryWorks/MoveToClientRejectPriceQuotations",
  moveToApproved:
    "/api/PriceQuotationHistoryWorks/MoveToClientApprovedPriceQuotations",
  moveToCancel:
    "/api/PriceQuotationHistoryWorks/MoveToClientCancelPriceQuotations",
};
export const QuotationPriceHistories = {
  getAll: "/api/QuotationPriceHistories/GetAllQuotationPriceHistories",
  getDetails: "/api/QuotationPriceHistories/GetQuotationPriceHistoryDetails",
  add: "/api/QuotationPriceHistories/AddQuotationPriceHistories",
  update: "/api/QuotationPriceHistories/UpdateQuotationPriceHistories",
  finalDelete: "/api/QuotationPriceHistories/DeleteQuotationPriceHistories",
};
export const PriceQuotationDetails = {
  getAll: "/api/PriceQuotationDetails/GetAllPriceQuotationDetails",
  getDetails: "/api/PriceQuotationDetails/GetPriceQuotationDetails",
};
export const QuotationDetailsHistoryWorks = {
  getAll:
    "/api/QuotationDetailsHistoryWorks/GetAllQuotationDetailsHistoryWorks",
  getDetails:
    "/api/QuotationDetailsHistoryWorks/GetQuotationDetailsHistoryWorkDetails",
  moveToWorkProgres:
    "/api/QuotationDetailsHistoryWorks/MoveQuotationDetailsToWorkProgres",
  moveToNewlyWanted:
    "/api/QuotationDetailsHistoryWorks/MoveQuotationDetailsToNewlyWanted",
  moveToReviewedByCustomer:
    "/api/QuotationDetailsHistoryWorks/MoveQuotationDetailsToReviewedByCustomer",
  moveToRejectedByCustomer:
    "/api/QuotationDetailsHistoryWorks/MoveQuotationDetailsToRejectedByCustomer",
  moveToWaitingForQuotes:
    "/api/QuotationDetailsHistoryWorks/MoveQuotationDetailsToWaitingForQuotes",
  moveToCanceledbyCustomer:
    "/api/QuotationDetailsHistoryWorks/MoveQuotationDetailsToCanceledbyCustomer",
};

export const PriceQuotationAffiliateOperations = {
  getAll:
    "/api/PriceQuotationAffiliateOperations/GetAllPriceQuotationAffiliateOperations",
  getDetails:
    "/api/PriceQuotationAffiliateOperations/GetPriceQuotationAffiliateOperationDetails?",
  add: "/api/PriceQuotationAffiliateOperations/AddPriceQuotationAffiliateOperation",
  update:
    "/api/PriceQuotationAffiliateOperations/UpdatePriceQuotationAffiliateOperation",
  changeActivationType:
    "/api/PriceQuotationAffiliateOperations/ChangeActivationTypePriceQuotationAffiliateOperation",
  finalDelete:
    "/api/PriceQuotationAffiliateOperations/DeletePriceQuotationAffiliateOperation",
  deleteImage: "/api/PriceQuotationAffiliateOperations/DeleteImage",
  sendToClient:
    "/api/PriceQuotationAffiliateOperations/DeletePriceQuotationAffiliateOperation",
};

export const PriceQuotationJobOrders = {
  getAll: "/api/PriceQuotationJobOrders/GetAllPriceQuotationJobOrders",
  getDetails: "/api/PriceQuotationJobOrders/GetPriceQuotationJobOrderDetails",
  getReport: "/api/PriceQuotationJobOrders/GetAllPriceQuotationJobOrdersReport",
  add: "/api/PriceQuotationJobOrders/AddPriceQuotationJobOrder",
  update: "/api/PriceQuotationJobOrders/UpdatePriceQuotationJobOrder",
  deleteImage: "/api/PriceQuotationJobOrders/DeleteImage",
};
export const JobOrderHistoryWorks = {
  moveToNewlyWanted:
    "/api/JobOrderHistoryWorks/MoveQuotationDetailsToNewlyWanted",
  moveToWorkProgres:
    "/api/JobOrderHistoryWorks/MoveQuotationDetailsToWorkProgres",
  moveToFinishNotCustomerReceived:
    "/api/JobOrderHistoryWorks/MoveQuotationDetailsToFinishNotCustomerReceived",
  moveToFinishCustomerReceived:
    "/api/JobOrderHistoryWorks/MoveQuotationDetailsToFinishCustomerReceived",
  moveToCanceled: "/api/JobOrderHistoryWorks/MoveQuotationDetailsToCanceled",
};
//#endregion Products

//#region Newss
export const Newss = {
  getAll: "/api/News/GetAllNews",
  getDetails: "/api/News/GetNewsDetails?",
  getDialog: "/api/News/GetNewsDialog",
  add: "/api/News/AddNews",
  update: "/api/News/UpdateNews",
  changeActivationType: "/api/News/ChangeActivationTypeNews",
  finalDelete: "/api/News/DeleteNews",
  deleteImage: "/api/News/DeleteImage",
};
//#endregion Newss

//#region Finance
//#region Accounts
export const Accounts = {
  getAll: "/api/Accounts/GetAllAccounts",
  getDetails: "/api/Accounts/GetAccountDetails",
  getDialog: "/api/Accounts/GetAccountDialog",
  add: "/api/Accounts/AddAccount",
  update: "/api/Accounts/UpdateAccount",
  changeActivationType: "/api/Accounts/ChangeActivationTypeAccount",
  finalDelete: "/api/Accounts/DeleteAccount",
  deleteImage: "/api/Accounts/DeleteImage",
};
//#endregion Accounts

//#region AccountTransactions
export const AccountTransactions = {
  getAll: "/api/AccountTransactions/GetAllAccountTransactions",
  getDetails: "/api/AccountTransactions/GetAccountTransactionDetails",
  getDialog: "/api/AccountTransactions/GetAccountTransactionDialog",
  getBillReport: "/api/AccountTransactions/GetAccountTransactionBillReport",
  add: "/api/AccountTransactions/AddAccountTransaction",
  update: "/api/AccountTransactions/UpdateAccountTransaction",
  changeActivationType:
    "/api/AccountTransactions/ChangeActivationTypeAccountTransaction",
  finalDelete: "/api/AccountTransactions/DeleteAccountTransaction",
  deleteImage: "/api/AccountTransactions/DeleteImage",
};
//#endregion AccountTransactions

//#region CountedServiceTransactions
export const CountedServiceTransactions = {
  getAll: "/api/CountedServiceTransactions/GetAllCountedServiceTransactions",
  getDetails:
    "/api/CountedServiceTransactions/GetCountedServiceTransactionsDetails",
  buy: "/api/CountedServiceTransactions/BuyCountedService",
  sell: "/api/CountedServiceTransactions/SellCountedService",
  refund: "/api/CountedServiceTransactions/RefundCountedServiceTransaction",
  deleteImage: "/api/CountedServiceTransactions/DeleteImage",
};
//#endregion CountedServiceTransactions

//#region Expenses
export const Expenses = {
  getAll: "/api/Expenses/GetAllExpenses",
  getDetails: "/api/Expenses/GetExpensesDetails",
  pay: "/api/Expenses/PayExpenses",
  refund: "/api/Expenses/RefundExpenses",
  deleteImage: "/api/Expenses/DeleteImage",
};
//#endregion Expenses

//#region Revenues
export const Revenues = {
  getAll: "/api/Revenues/GetAllRevenues",
  getDetails: "/api/Revenues/GetRevenuesDetails",
  accrual: "/api/Revenues/AccrualRevenues",
  refund: "/api/Revenues/RefundRevenues",
  deleteImage: "/api/Revenues/DeleteImage",
};
//#endregion Revenues

//#endregion Finance

//#region JoiningApplications
//#region Debts
export const Debts = {
  getAll: "/api/Debts/GetAllDebts",
  getDetails: "/api/Debts/GetDebtsDetails",
  getDialog: "/api/Debts/GetDebtDialog",
};
//#endregion Debts
//#region Installments
export const Installments = {
  getAll: "/api/Installments/GetAllInstallments",
  getDetails: "/api/Installments/GetInstallmentDetails",
  getDialog: "/api/Installments/GetInstallmentDialog",
  getReport:
    "/api/InstallmentScheduleTimes/GetAllInstallmentScheduleTimesReport",
  add: "/api/Installments/AddInstallment",
  update: "/api/Installments/UpdateInstallment",
  cancel: "/api/Installments/CancelInstallment",
  deleteImage: "/api/Installments/DeleteImage",
};
//#endregion Installments

//#region InstallmentPayments
export const InstallmentPayments = {
  getAll: "/api/InstallmentPayments/GetAllInstallmentPayments",
  getDetails: "/api/InstallmentPayments/GetInstallmentPaymentDetails",
  getDialog: "/api/InstallmentPayments/GetInstallmentPaymentDialog",
  add: "/api/InstallmentPayments/AddInstallmentPayment",
  refund: "/api/InstallmentPayments/RefundInstallmentPayment",
  deleteImage: "/api/InstallmentPayments/DeleteImage",
};
//#endregion InstallmentPayments

//#region ServiceEntitlements
export const ServiceEntitlements = {
  getAll: "/api/ServiceEntitlements/GetAllServiceEntitlements",
  getDetails: "/api/ServiceEntitlements/GetServiceEntitlementDetails",
  addServiceEntitlementAsDebt:
    "/api/ServiceEntitlements/AddServiceEntitlementAsDept",
  accrual: "/api/ServiceEntitlements/AccrualServiceEntitlement",
  refund: "/api/ServiceEntitlements/RefundServiceEntitlement",
  deleteImage: "/api/ServiceEntitlements/DeleteImage",
};
//#endregion ServiceEntitlements

//#endregion JoiningApplications

//#region Complaints
//#region Complaints
export const Complaints = {
  getAll: "/api/Complaints/GetAllComplaints",
  getDetails: "/api/Complaints/GetComplaintDetails",
  getDialog: "/api/Complaints/GetComplaintDialog",
  getReport: "/api/Complaints/GetComplaintReport",
  add: "/api/Complaints/AddComplaint",
  update: "/api/Complaints/UpdateComplaint",
  changeActivationType: "/api/Complaints/ChangeActivationTypeComplaint",
  close: "/api/Complaints/CloseComplaint",
  finalDelete: "/api/Complaints/DeleteComplaint",
  deleteImage: "/api/Complaints/DeleteImage",
};
//#endregion Complaints

//#region ComplaintFollowUps
export const ComplaintFollowUps = {
  getAll: "/api/ComplaintFollowUps/GetAllComplaintFollowUps",
  getDetails: "/api/ComplaintFollowUps/GetComplaintFollowUpDetails",
  getDialog: "/api/ComplaintFollowUps/GetComplaintFollowUpDialog",
  add: "/api/ComplaintFollowUps/AddComplaintFollowUp",
  update: "/api/ComplaintFollowUps/UpdateComplaintFollowUp",
  changeActivationType:
    "/api/ComplaintFollowUps/ChangeActivationTypeComplaintFollowUp",
  finalDelete: "/api/ComplaintFollowUps/DeleteComplaintFollowUp",
  deleteImage: "/api/ComplaintFollowUps/DeleteImage",
};
//#endregion ComplaintFollowUps

//#endregion Complaints

//#region StorageSpaces
export const StorageSpaces = {
  getAll: "/api/StorageSpaces/GetAllStorageSpaces",
  getDetails: "/api/StorageSpaces/GetStorageSpaceDetails",
  getDialog: "/api/StorageSpaces/GetStorageSpaceDialog",
  add: "/api/StorageSpaces/AddStorageSpace",
  update: "/api/StorageSpaces/UpdateStorageSpace",
  changeActivationType: "/api/StorageSpaces/ChangeActivationTypeStorageSpace",
  finalDelete: "/api/StorageSpaces/DeleteStorageSpace",
  deleteImage: "/api/StorageSpaces/DeleteImage",
};
export const StorageSpaceMedias = {
  getAll: "/api/StorageSpaceMedia/GetAllStorageSpaceMedia",
  getDetails: "/api/StorageSpaceMedia/GetStorageSpaceMediaDetails",
  getDialog: "/api/StorageSpaceMedia/GetStorageSpaceMediaDialog",
  add: "/api/StorageSpaceMedia/AddStorageSpaceMedia",
  update: "/api/StorageSpaceMedia/UpdateStorageSpaceMedia",
  changeActivationType:
    "/api/StorageSpaceMedia/ChangeActivationTypeStorageSpaceMedia",
  finalDelete: "/api/StorageSpaceMedia/DeleteStorageSpaceMedia",
  deleteImage: "/api/StorageSpaceMedia/DeleteImage",
};
//#endregion StorageSpaces

//#region SharedMediaFolders
export const SharedMediaFolders = {
  getAll: "/api/SharedMediaFolders/GetAllSharedMediaFolders",
  getDetails: "/api/SharedMediaFolders/GetSharedMediaFolderDetails",
  getDialog: "/api/SharedMediaFolders/GetSharedMediaFolderDialog",
  add: "/api/SharedMediaFolders/AddSharedMediaFolder",
  update: "/api/SharedMediaFolders/UpdateSharedMediaFolder",
  changeActivationType:
    "/api/SharedMediaFolders/ChangeActivationTypeSharedMediaFolder",
  finalDelete: "/api/SharedMediaFolders/DeleteSharedMediaFolder",
  deleteImage: "/api/SharedMediaFolders/DeleteImage",
};
//#endregion SharedMediaFolders

//#region SharedMedias
export const SharedMedias = {
  getAll: "/api/SharedMedia/GetAllSharedMedia",
  getDetails: "/api/SharedMedia/GetSharedMediaDetails",
  getDialog: "/api/SharedMedia/GetSharedMediaDialog",
  add: "/api/SharedMedia/AddSharedMedia",
  update: "/api/SharedMedia/UpdateSharedMedia",
  changeActivationType: "/api/SharedMedia/ChangeActivationTypeSharedMedia",
  finalDelete: "/api/SharedMedia/DeleteSharedMedia",
};
//#endregion SharedMedias

//#region SharedMediaWithSpaceStorageMedias
export const SharedMediaWithSpaceStorageMedias = {
  getAll:
    "/api/SharedMediaWithSpaceStorageMedia/GetAllSharedMediaWithSpaceStorageMedia",
  getDetails:
    "/api/SharedMediaWithSpaceStorageMedia/GetSharedMediaWithSpaceStorageMediaDetails",
  add: "/api/SharedMediaWithSpaceStorageMedia/AddSharedMediaWithSpaceStorageMedia",
  finalDelete:
    "/api/SharedMediaWithSpaceStorageMedia/DeleteSharedMediaWithSpaceStorageMedia",
};
//#endregion SharedMediaWithSpaceStorageMedias

//#region Settings
export const EstablishmentRole = {
  getAll: "/api/EstablishmentRoles/GetAllEstablishmentRoles",
  getDetails: "/api/EstablishmentRoles/GetEstablishmentRoleDetails",
  getDialog: "/api/EstablishmentRoles/GetEstablishmentRoleDialog",
  add: "/api/EstablishmentRoles/AddEstablishmentRole",
  update: "/api/EstablishmentRoles/UpdateEstablishmentRole",
  changeActivationType:
    "/api/EstablishmentRoles/ChangeActivationTypeEstablishmentRole",
  finalDelete: "/api/EstablishmentRoles/DeleteEstablishmentRole",
  deleteImage: "/api/EstablishmentRoles/DeleteImage",
};

export const UserValidSettings = {
  getAll: "/api/UserValidSettings/GetAllUserValidSettings",
  getDetails: "/api/UserValidSettings/GetUserValidSettingDetails",
  getDialog: "/api/UserValidSettings/GetUserValidSettingDialog",
  add: "/api/UserValidSettings/AddUserValidSetting",
  update: "/api/UserValidSettings/UpdateUserValidSetting",
  changeActivationType:
    "/api/UserValidSettings/ChangeActivationTypeUserValidSetting",
  finalDelete: "/api/UserValidSettings/DeleteUserValidSetting",
  deleteImage: "/api/UserValidSettings/DeleteImage",
};

//#region SettingsOther
export const Qualifications = {
  getAll: "/api/Qualifications/GetAllQualifications",
  getDetails: "/api/Qualifications/GetQualificationDetails",
  getDialog: "/api/Qualifications/GetQualificationDialog",
  add: "/api/Qualifications/AddQualification",
  update: "/api/Qualifications/UpdateQualification",
  changeActivationType: "/api/Qualifications/ChangeActivationTypeQualification",
  finalDelete: "/api/Qualifications/DeleteQualification",
  deleteImage: "/api/Qualifications/DeleteImage",
};

export const EducationalStages = {
  getAll: "/api/EducationalStages/GetAllEducationalStages",
  getDetails: "/api/EducationalStages/GetEducationalStageDetails",
  getDialog: "/api/EducationalStages/GetEducationalStageDialog",
  add: "/api/EducationalStages/AddEducationalStage",
  update: "/api/EducationalStages/UpdateEducationalStage",
  changeActivationType:
    "/api/EducationalStages/ChangeActivationTypeEducationalStage",
  finalDelete: "/api/EducationalStages/DeleteEducationalStage",
  deleteImage: "/api/EducationalStages/DeleteImage",
};

export const BodyParts = {
  getAll: "/api/BodyParts/GetAllBodyParts",
  getDetails: "/api/BodyParts/GetBodyPartDetails",
  getDialog: "/api/BodyParts/GetBodyPartDialog",
  add: "/api/BodyParts/AddBodyPart",
  update: "/api/BodyParts/UpdateBodyPart",
  changeActivationType: "/api/BodyParts/ChangeActivationTypeBodyPart",
  finalDelete: "/api/BodyParts/DeleteBodyPart",
  deleteImage: "/api/BodyParts/DeleteImage",
};

//#region InjuryTypes
export const InjuryTypes = {
  getAll: "/api/InjuryTypes/GetAllInjuryTypes",
  getDetails: "/api/InjuryTypes/GetInjuryTypeDetails",
  getDialog: "/api/InjuryTypes/GetInjuryTypeDialog",
  add: "/api/InjuryTypes/AddInjuryType",
  update: "/api/InjuryTypes/UpdateInjuryType",
  changeActivationType: "/api/InjuryTypes/ChangeActivationTypeInjuryType",
  finalDelete: "/api/InjuryTypes/DeleteInjuryType",
  deleteImage: "/api/InjuryTypes/DeleteImage",
};
//#endregion InjuryTypes

//#region OperationTypes
export const OperationTypes = {
  getAll: "/api/OperationTypes/GetAllOperationTypes",
  getDetails: "/api/OperationTypes/GetOperationTypeDetails",
  getDialog: "/api/OperationTypes/GetOperationTypeDialog",
  add: "/api/OperationTypes/AddOperationType",
  update: "/api/OperationTypes/UpdateOperationType",
  changeActivationType: "/api/OperationTypes/ChangeActivationTypeOperationType",
  finalDelete: "/api/OperationTypes/DeleteOperationType",
  deleteImage: "/api/OperationTypes/DeleteImage",
};
//#endregion InjuryTypes
export const EmployeePayrollSettings = {
  getAll: "/api/EmployeePayrollSettings/GetAllEmployeePayrollSettings",
  getDetails: "/api/EmployeePayrollSettings/GetEmployeePayrollSettingDetails",
  // add: "/api/EmployeePayrollSettings/AddEmployeePayrollSetting",
  add: "/api/EmployeePayrollSettings/UpdateEmployeePayrollSetting", // add using update
  update: "/api/EmployeePayrollSettings/UpdateEmployeePayrollSetting",
  finalDelete: "/api/EmployeePayrollSettings/DeleteOneEmployeePayrollSetting",
};

export const Religions = {
  getAll: "/api/Religions/GetAllReligions",
  getDetails: "/api/Religions/GetReligionDetails",
  getDialog: "/api/Religions/GetReligionDialog",
  getReport: "/api/Religions/GetAllReligionsReport",
  add: "/api/Religions/AddReligion",
  update: "/api/Religions/UpdateReligion",
  changeActivationType: "/api/Religions/ChangeActivationTypeReligion",
  finalDelete: "/api/Religions/DeleteReligion",
  deleteImage: "/api/Religions/DeleteImage",
};

export const ReportTemplates = {
  getDialog: "/api/ReportTemplates/GetReportTemplateDialog",
};

export const InstallmentBatchTypes = {
  getAll: "/api/InstallmentBatchTypes/GetAllInstallmentBatchTypes",
  getDetails: "/api/InstallmentBatchTypes/GetInstallmentBatchTypeDetails",
  getDialog: "/api/InstallmentBatchTypes/GetInstallmentBatchTypeDialog",
  add: "/api/InstallmentBatchTypes/AddInstallmentBatchType",
  update: "/api/InstallmentBatchTypes/UpdateInstallmentBatchType",
  changeActivationType:
    "/api/InstallmentBatchTypes/ChangeActivationTypeInstallmentBatchType",
  finalDelete: "/api/InstallmentBatchTypes/DeleteInstallmentBatchType",
  deleteImage: "/api/InstallmentBatchTypes/DeleteImage",
};

export const InsuranceCompanies = {
  getAll: "/api/InsuranceCompanies/GetAllInsuranceCompanies",
  getDetails: "/api/InsuranceCompanies/GetQualificationDetails",
  getDialog: "/api/InsuranceCompanies/GetInsuranceCompanyDialog",
  add: "/api/InsuranceCompanies/AddInsuranceCompany",
  update: "/api/InsuranceCompanies/UpdateInsuranceCompany",
  changeActivationType:
    "/api/InsuranceCompanies/ChangeActivationTypeInsuranceCompany",
  finalDelete: "/api/InsuranceCompanies/DeleteInsuranceCompany",
  deleteImage: "/api/InsuranceCompanies/DeleteImage",
};

export const Banks = {
  getAll: "/api/Banks/GetAllBanks",
  getDetails: "/api/Banks/GetBankDetails",
  getDialog: "/api/Banks/GetBankDialog",
  add: "/api/Banks/AddBank",
  update: "/api/Banks/UpdateBank",
  changeActivationType: "/api/Banks/ChangeActivationTypeBank",
  finalDelete: "/api/Banks/DeleteBank",
  deleteImage: "/api/Banks/DeleteImage",
};

export const KnownMethods = {
  getAll: "/api/KnownMethods/GetAllKnownMethods",
  getDetails: "/api/KnownMethods/GetKnownMethodDetails",
  getDialog: "/api/KnownMethods/GetKnownMethodDialog",
  getReport: "/api/KnownMethods/GetAllKnownMethodsReport",
  add: "/api/KnownMethods/AddKnownMethod",
  update: "/api/KnownMethods/UpdateKnownMethod",
  changeActivationType: "/api/KnownMethods/ChangeActivationTypeKnownMethod",
  finalDelete: "/api/KnownMethods/DeleteKnownMethod",
  deleteImage: "/api/KnownMethods/DeleteImage",
};

export const GeographicalDistributions = {
  getAll: "/api/GeographicalDistributions/GetAllGeographicalDistributions",
  getDetails:
    "/api/GeographicalDistributions/GetGeographicalDistributionDetails",
  getDialog: "/api/GeographicalDistributions/GetGeographicalDistributionDialog",
  add: "/api/GeographicalDistributions/AddGeographicalDistribution",
  update: "/api/GeographicalDistributions/UpdateGeographicalDistribution",
  changeActivationType:
    "/api/GeographicalDistributions/ChangeActivationTypeGeographicalDistribution",
  finalDelete: "/api/GeographicalDistributions/DeleteGeographicalDistribution",
  deleteImage: "/api/GeographicalDistributions/DeleteImage",
};

export const SocialStatuses = {
  getAll: "/api/SocialStatuses/GetAllSocialStatuses",
  getDetails: "/api/SocialStatuses/GetSocialStatuseDetails",
  getDialog: "/api/SocialStatuses/GetSocialStatuseDialog",
  add: "/api/SocialStatuses/AddSocialStatuse",
  update: "/api/SocialStatuses/UpdateSocialStatuse",
  changeActivationType: "/api/SocialStatuses/ChangeActivationTypeSocialStatuse",
  finalDelete: "/api/SocialStatuses/DeleteSocialStatuse",
  deleteImage: "/api/SocialStatuses/DeleteImage",
};

export const Specialties = {
  getAll: "/api/Specialties/GetAllSpecialties",
  getDetails: "/api/Specialties/GetSpecialtieDetails",
  getDialog: "/api/Specialties/GetSpecialtieDialog",
  add: "/api/Specialties/AddSpecialtie",
  update: "/api/Specialties/UpdateSpecialtie",
  changeActivationType: "/api/Specialties/ChangeActivationTypeSpecialtie",
  finalDelete: "/api/Specialties/DeleteSpecialtie",
  deleteImage: "/api/Specialties/DeleteImage",
};

export const BloodTypes = {
  getAll: "/api/BloodTypes/GetAllBloodTypes",
  getDetails: "/api/BloodTypes/GetBloodTypeDetails",
  getDialog: "/api/BloodTypes/GetBloodTypeDialog",
  add: "/api/BloodTypes/AddBloodType",
  update: "/api/BloodTypes/UpdateBloodType",
  changeActivationType: "/api/BloodTypes/ChangeActivationTypeBloodType",
  finalDelete: "/api/BloodTypes/DeleteBloodType",
  deleteImage: "/api/BloodTypes/DeleteImage",
};

export const Certificates = {
  getAll: "/api/Certificates/GetAllCertificates",
  getDetails: "/api/Certificates/GetCertificateDetails",
  getDialog: "/api/Certificates/GetCertificateDialog",
  add: "/api/Certificates/AddCertificate",
  update: "/api/Certificates/UpdateCertificate",
  changeActivationType: "/api/Certificates/ChangeActivationTypeCertificate",
  finalDelete: "/api/Certificates/DeleteCertificate",
  deleteImage: "/api/Certificates/DeleteImage",
};
export const Countries = {
  getAll: "/api/Countries/GetAllCountries",
  getDetails: "/api/Countries/GetCountryDetails",
  getDialog: "/api/Countries/GetCountryDialog",
  add: "/api/Countries/AddCountry",
  update: "/api/Countries/UpdateCountry",
  changeActivationType: "/api/Countries/ChangeActivationTypeCountry",
  finalDelete: "/api/Countries/DeleteCountry",
  deleteImage: "/api/Countries/DeleteImage",
};

export const MilitaryStatusTypes = {
  getAll: "/api/MilitaryStatusTypes/GetAllMilitaryStatusTypes",
  getDetails: "/api/MilitaryStatusTypes/GetMilitaryStatusTypeDetails",
  getDialog: "/api/MilitaryStatusTypes/GetMilitaryStatusTypeDialog",
  add: "/api/MilitaryStatusTypes/AddMilitaryStatusType",
  update: "/api/MilitaryStatusTypes/UpdateMilitaryStatusType",
  changeActivationType:
    "/api/MilitaryStatusTypes/ChangeActivationTypeMilitaryStatusType",
  finalDelete: "/api/MilitaryStatusTypes/DeleteMilitaryStatusType",
  deleteImage: "/api/MilitaryStatusTypes/DeleteImage",
};

export const PersonalCardTypes = {
  getAll: "/api/PersonalCardTypes/GetAllPersonalCardTypes",
  getDetails: "/api/PersonalCardTypes/GetPersonalCardTypeDetails",
  getDialog: "/api/PersonalCardTypes/GetPersonalCardTypeDialog",
  add: "/api/PersonalCardTypes/AddPersonalCardType",
  update: "/api/PersonalCardTypes/UpdatePersonalCardType",
  changeActivationType:
    "/api/PersonalCardTypes/ChangeActivationTypePersonalCardType",
  finalDelete: "/api/PersonalCardTypes/DeletePersonalCardType",
  deleteImage: "/api/PersonalCardTypes/DeleteImage",
};

export const GeneralJobs = {
  getAll: "/api/GeneralJobs/GetAllGeneralJobs",
  getDetails: "/api/GeneralJobs/GetGeneralJobDetails",
  getDialog: "/api/GeneralJobs/GetGeneralJobDialog",
  add: "/api/GeneralJobs/AddGeneralJob",
  update: "/api/GeneralJobs/UpdateGeneralJob",
  changeActivationType: "/api/GeneralJobs/ChangeActivationTypeGeneralJob",
  finalDelete: "/api/GeneralJobs/DeleteGeneralJob",
  deleteImage: "/api/GeneralJobs/DeleteImage",
};
export const ClassificationDegrees = {
  getAll: "/api/ClassificationDegrees/GetAllClassificationDegrees",
  getDetails: "/api/ClassificationDegrees/GetClassificationDegreeDetails",
  getDialog: "/api/ClassificationDegrees/GetClassificationDegreeDialog",
  add: "/api/ClassificationDegrees/AddClassificationDegree",
  update: "/api/ClassificationDegrees/UpdateClassificationDegree",
  changeActivationType:
    "/api/ClassificationDegrees/ChangeActivationTypeClassificationDegree",
  finalDelete: "/api/ClassificationDegrees/DeleteClassificationDegree",
  deleteImage: "/api/ClassificationDegrees/DeleteImage",
};
export const ScientificDegrees = {
  getAll: "/api/ScientificDegrees/GetAllScientificDegrees",
  getDetails: "/api/ScientificDegrees/GetScientificDegreeDetails",
  getDialog: "/api/ScientificDegrees/GetScientificDegreeDialog",
  add: "/api/ScientificDegrees/AddScientificDegree",
  update: "/api/ScientificDegrees/UpdateScientificDegree",
  changeActivationType:
    "/api/ScientificDegrees/ChangeActivationTypeScientificDegree",
  finalDelete: "/api/ScientificDegrees/DeleteScientificDegree",
  deleteImage: "/api/ScientificDegrees/DeleteImage",
};

export const JobGrades = {
  getAll: "/api/JobGrades/GetAllJobGrades",
  getDetails: "/api/JobGrades/GetJobGradeDetails",
  getDialog: "/api/JobGrades/GetJobGradeDialog",
  add: "/api/JobGrades/AddJobGrade",
  update: "/api/JobGrades/UpdateJobGrade",
  changeActivationType: "/api/JobGrades/ChangeActivationTypeJobGrade",
  finalDelete: "/api/JobGrades/DeleteJobGrade",
  deleteImage: "/api/JobGrades/DeleteImage",
};

export const Colors = {
  getAll: "/api/Colors/GetAllColors",
  getDetails: "/api/Colors/GetColorDetails",
  getDialog: "/api/Colors/GetColorDialog",
  add: "/api/Colors/AddColor",
  update: "/api/Colors/UpdateColor",
  changeActivationType: "/api/Colors/ChangeActivationTypeColor",
  finalDelete: "/api/Colors/DeleteColor",
  deleteImage: "/api/Colors/DeleteImage",
};

export const PriorityTypes = {
  getAll: "/api/PriorityTypes/GetAllPriorityTypes",
  getDetails: "/api/PriorityTypes/GetPriorityTypeDetails",
  getDialog: "/api/PriorityTypes/GetPriorityTypeDialog",
  add: "/api/PriorityTypes/AddPriorityType",
  update: "/api/PriorityTypes/UpdatePriorityType",
  changeActivationType: "/api/PriorityTypes/ChangeActivationTypePriorityType",
  finalDelete: "/api/PriorityTypes/DeletePriorityType",
  deleteImage: "/api/PriorityTypes/DeleteImage",
};

export const CommunicationTypes = {
  getAll: "/api/CommunicationTypes/GetAllCommunicationTypes",
  getDetails: "/api/CommunicationTypes/GetCommunicationTypeDetails",
  getDialog: "/api/CommunicationTypes/GetCommunicationTypeDialog",
  add: "/api/CommunicationTypes/AddCommunicationType",
  update: "/api/CommunicationTypes/UpdateCommunicationType",
  changeActivationType:
    "/api/CommunicationTypes/ChangeActivationTypeCommunicationType",
  finalDelete: "/api/CommunicationTypes/DeleteCommunicationType",
  deleteImage: "/api/CommunicationTypes/DeleteImage",
};

export const ComplaintTypes = {
  getAll: "/api/ComplaintTypes/GetAllComplaintTypes",
  getDetails: "/api/ComplaintTypes/GetComplaintTypeDetails",
  getDialog: "/api/ComplaintTypes/GetComplaintTypeDialog",
  add: "/api/ComplaintTypes/AddComplaintType",
  update: "/api/ComplaintTypes/UpdateComplaintType",
  changeActivationType: "/api/ComplaintTypes/ChangeActivationTypeComplaintType",
  finalDelete: "/api/ComplaintTypes/DeleteComplaintType",
  deleteImage: "/api/ComplaintTypes/DeleteImage",
};

export const NewsCategories = {
  getAll: "/api/NewsCategories/GetAllNewsCategories",
  getDetails: "/api/NewsCategories/GetNewsCategoryDetails",
  getDialog: "/api/NewsCategories/GetNewsCategoryDialog",
  add: "/api/NewsCategories/AddNewsCategory",
  update: "/api/NewsCategories/UpdateNewsCategory",
  changeActivationType: "/api/NewsCategories/ChangeActivationTypeNewsCategory",
  finalDelete: "/api/NewsCategories/DeleteNewsCategory",
  deleteImage: "/api/NewsCategories/DeleteImage",
};

export const ComplaintSectors = {
  getAll: "/api/ComplaintSectors/GetAllComplaintSectors",
  getDetails: "/api/ComplaintSectors/GetComplaintSectorDetails",
  getDialog: "/api/ComplaintSectors/GetComplaintSectorDialog",
  add: "/api/ComplaintSectors/AddComplaintSector",
  update: "/api/ComplaintSectors/UpdateComplaintSector",
  changeActivationType:
    "/api/ComplaintSectors/ChangeActivationTypeComplaintSector",
  finalDelete: "/api/ComplaintSectors/DeleteComplaintSector",
  deleteImage: "/api/ComplaintSectors/DeleteImage",
};

export const ReminderPlans = {
  getAll: "/api/ReminderPlans/GetAllReminderPlans",
  getDetails: "/api/ReminderPlans/GetReminderPlanDetails",
  getDialog: "/api/ReminderPlans/GetReminderPlanDialog",
  add: "/api/ReminderPlans/AddReminderPlan",
  update: "/api/ReminderPlans/UpdateReminderPlan",
  changeActivationType: "/api/ReminderPlans/ChangeActivationTypeReminderPlan",
  finalDelete: "/api/ReminderPlans/DeleteReminderPlan",
  deleteImage: "/api/ReminderPlans/DeleteImage",
};

export const ExpensesTypes = {
  getAll: "/api/ExpensesTypes/GetAllExpensesTypes",
  getDetails: "/api/ExpensesTypes/GetExpensesTypeDetails",
  getDialog: "/api/ExpensesTypes/GetExpensesTypeDialog",
  add: "/api/ExpensesTypes/AddExpensesType",
  update: "/api/ExpensesTypes/UpdateExpensesType",
  changeActivationType: "/api/ExpensesTypes/ChangeActivationTypeExpensesType",
  finalDelete: "/api/ExpensesTypes/DeleteExpensesType",
  deleteImage: "/api/ExpensesTypes/DeleteImage",
};

export const RevenuesTypes = {
  getAll: "/api/RevenuesTypes/GetAllRevenuesTypes",
  getDetails: "/api/RevenuesTypes/GetRevenuesTypeDetails",
  getDialog: "/api/RevenuesTypes/GetRevenuesTypeDialog",
  add: "/api/RevenuesTypes/AddRevenuesType",
  update: "/api/RevenuesTypes/UpdateRevenuesType",
  changeActivationType: "/api/RevenuesTypes/ChangeActivationTypeRevenuesType",
  finalDelete: "/api/RevenuesTypes/DeleteRevenuesType",
  deleteImage: "/api/RevenuesTypes/DeleteImage",
};

export const PaymentMethods = {
  getAll: "/api/PaymentMethods/GetAllPaymentMethods",
  getDetails: "/api/PaymentMethods/GetPaymentMethodDetails",
  getDialog: "/api/PaymentMethods/GetPaymentMethodDialog",
  add: "/api/PaymentMethods/AddPaymentMethod",
  update: "/api/PaymentMethods/UpdatePaymentMethod",
  changeActivationType: "/api/PaymentMethods/ChangeActivationTypePaymentMethod",
  finalDelete: "/api/PaymentMethods/DeletePaymentMethod",
  deleteImage: "/api/PaymentMethods/DeleteImage",
};
export const RelativeRelationTypes = {
  getAll: "/api/RelativeRelationTypes/GetAllRelativeRelationTypes",
  getDetails: "/api/RelativeRelationTypes/GetRelativeRelationTypeDetails",
  getDialog: "/api/RelativeRelationTypes/GetRelativeRelationTypeDialog",
  add: "/api/RelativeRelationTypes/AddRelativeRelationType",
  update: "/api/RelativeRelationTypes/UpdateRelativeRelationType",
  changeActivationType:
    "/api/RelativeRelationTypes/ChangeActivationTypeRelativeRelationType",
  finalDelete: "/api/RelativeRelationTypes/DeleteRelativeRelationType",
  deleteImage: "/api/RelativeRelationTypes/DeleteImage",
};

export const GradingPlans = {
  getAll: "/api/GradingPlans/GetAllGradingPlans",
  getDetails: "/api/GradingPlans/GetGradingPlanDetails",
  getDialog: "/api/GradingPlans/GetGradingPlanDialog",
  add: "/api/GradingPlans/AddGradingPlan",
  update: "/api/GradingPlans/UpdateGradingPlan",
  changeActivationType: "/api/GradingPlans/ChangeActivationTypeGradingPlan",
  finalDelete: "/api/GradingPlans/DeleteGradingPlan",
  deleteImage: "/api/GradingPlans/DeleteImage",
};
export const PriceLists = {
  getAll: "/api/PriceLists/GetAllPriceLists",
  getDetails: "/api/PriceLists/GetPriceListDetails",
  getDialog: "/api/PriceLists/GetPriceListDialog",
  add: "/api/PriceLists/AddPriceList",
  update: "/api/PriceLists/UpdatePriceList",
  changeActivationType: "/api/PriceLists/ChangeActivationTypePriceList",
  finalDelete: "/api/PriceLists/DeletePriceList",
  deleteImage: "/api/PriceLists/DeleteImage",
};

export const ServiceTypes = {
  getAll: "/api/ServiceTypes/GetAllServiceTypes",
  getDetails: "/api/ServiceTypes/GetServiceTypeDetails",
  getDialog: "/api/ServiceTypes/GetServiceTypeDialog",
  add: "/api/ServiceTypes/AddServiceType",
  update: "/api/ServiceTypes/UpdateServiceType",
  changeActivationType: "/api/ServiceTypes/ChangeActivationTypeServiceType",
  finalDelete: "/api/ServiceTypes/DeleteServiceType",
  deleteImage: "/api/ServiceTypes/DeleteImage",
};

export const CountedServiceTypes = {
  getAll: "/api/CountedServiceTypes/GetAllCountedServiceTypes",
  getDetails: "/api/CountedServiceTypes/GetCountedServiceTypeDetails",
  getDialog: "/api/CountedServiceTypes/GetCountedServiceTypeDialog",
  add: "/api/CountedServiceTypes/AddCountedServiceType",
  update: "/api/CountedServiceTypes/UpdateCountedServiceType",
  changeActivationType:
    "/api/CountedServiceTypes/ChangeActivationTypeCountedServiceType",
  finalDelete: "/api/CountedServiceTypes/DeleteCountedServiceType",
  deleteImage: "/api/CountedServiceTypes/DeleteImage",
};
//#endregion SettingsOther
//#endregion Settings

//#region FollowUps
export const Interests = {
  getAll: "/api/Interests/GetAllInterests",
  getDetails: "/api/Interests/GetInterestDetails",
  getDialog: "/api/Interests/GetInterestDialog",
  add: "/api/Interests/AddInterest",
  update: "/api/Interests/UpdateInterest",
  changeActivationType: "/api/Interests/ChangeActivationTypeInterest",
  finalDelete: "/api/Interests/DeleteInterest",
  deleteImage: "/api/Interests/DeleteImage",
};

export const InterestFollowUps = {
  getAll: "/api/InterestFollowUps/GetAllInterestFollowUps",
  getDetails: "/api/InterestFollowUps/GetInterestFollowUpDetails",
  getDialog: "/api/InterestFollowUps/GetInterestFollowUpDialog",
  add: "/api/InterestFollowUps/AddInterestFollowUp",
  update: "/api/InterestFollowUps/UpdateInterestFollowUp",
  changeActivationType:
    "/api/InterestFollowUps/ChangeActivationTypeInterestFollowUp",
  finalDelete: "/api/InterestFollowUps/DeleteInterestFollowUp",
  deleteImage: "/api/InterestFollowUps/DeleteImage",
};

export const FollowInterests = {
  getAll: "/api/FollowInterests/GetAllFollowInterests",
  getDetails: "/api/FollowInterests/GetFollowInterestDetails",
  getDialog: "/api/FollowInterests/GetFollowInterestDialog",
  add: "/api/FollowInterests/AddFollowInterestJson",
  update: "/api/FollowInterests/UpdateFollowInterestJson",
  changeActivationType:
    "/api/FollowInterest/ChangeActivationTypeFollowInterest",
  finalDelete: "/api/FollowInterests/DeleteFollowInterest",
  deleteImage: "/api/FollowInterests/DeleteImage",
};

export const UserSysteamInterests = {
  getAll: "/api/UserSysteamInterests/GetAllUserSysteamInterests",
  getDetails: "/api/UserSysteamInterests/GetUserSysteamInterestDetails",
  getDialog: "/api/UserSysteamInterests/GetUserSysteamInterestDialog",
  add: "/api/UserSysteamInterests/AddUserSysteamInterestJson",
  update: "/api/UserSysteamInterests/UpdateUserSysteamInterestJson",
  changeActivationType:
    "/api/UserSysteamInterests/ChangeActivationTypeUserSysteamInterest",
  finalDelete: "/api/UserSysteamInterests/DeleteUserSysteamInterest",
};

export const UserOtherInterests = {
  getAll: "/api/UserOtherInterests/GetAllUserOtherInterests",
  getDetails: "/api/UserOtherInterests/GetUserOtherInterestDetails",
  getDialog: "/api/UserOtherInterests/GetUserOtherInterestDialog",
  add: "/api/UserOtherInterests/AddUserOtherInterestJson",
  update: "/api/UserOtherInterests/UpdateUserOtherInterestJson",
  changeActivationType:
    "/api/UserOtherInterests/ChangeActivationTypeUserOtherInterest",
  finalDelete: "/api/UserOtherInterests/DeleteUserOtherInterest",
};
//#endregion FollowUps

//#region Notifications
export const Notifications = {
  getAll: "/api/Notifications/GetAllNotifications",
  getDetails: "/api/Notifications/GetNotificationDetails",
  getCountNotRead: "/api/Notifications/GetCountNotReadNotfcations",
  read: "/api/Notifications/ReadNotification",
  readAll: "/api/Notifications/ReadAllNotifications",
  openAll: "/api/Notifications/OpenAllNotification",
};
//#endregion Notifications

//#region Reminders
export const Reminders = {
  getAll: "/api/Reminders/GetAllReminders",
  getDetails: "/api/Reminders/GetReminderDetails",
  getDialog: "/api/Reminders/GetReminderDialog",
  add: "/api/Reminders/AddReminder",
  update: "/api/Reminders/UpdateReminder",
  changeActivationType: "/api/Reminders/ChangeActivationTypeReminder",
  finalDelete: "/api/Reminders/DeleteReminder",
  deleteImage: "/api/Reminders/DeleteImage",
};
//#endregion Reminders

export const UserAppSettings = {
  get: "/api/UserAppSettings/GetUserAppSettingDetails",
  update: "/api/UserAppSettings/UpdateUserAppSetting",
};

//#region UserLoginCodes
export const UserLoginCodes = {
  getAll: "/api/UserLoginCodes/GetAllUserLoginCodes",
  getDetails: "/api/UserLoginCodes/GetUserLoginCodeDetails",
  getDialog: "/api/UserLoginCodes/GetUserLoginCodeDialog",
  getSuggestion: "/api/UserLoginCodes/SuggestionNewUserLoginCode",
  add: "/api/UserLoginCodes/AddUserLoginCode",
  update: "/api/UserLoginCodes/UpdateUserLoginCode",
  resetUserLoginCode: "/api/UserLoginCodes/ResetUserLoginCode",
  resetUserDeviceCode: "/api/UserLoginCodes/ResetUserDeviceCode",
  useLoginCode: "/api/UserLoginCodes/UseLoginCode",
  changeActivationType: "/api/UserLoginCodes/ChangeActivationTypeUserLoginCode",
  finalDelete: "/api/UserLoginCodes/DeleteUserLoginCode",
  deleteImage: "/api/UserLoginCodes/DeleteImage",
};
//#endregion UserLoginCodes

//#region MediaPackages
export const MediaPackages = {
  getAll: "/api/MediaPackages/GetAllMediaPackages",
  getDetails: "/api/MediaPackages/GetMediaPackageDetails",
  getDialog: "/api/MediaPackages/GetMediaPackageDialog",
  add: "/api/MediaPackages/AddMediaPackage",
  update: "/api/MediaPackages/UpdateMediaPackage",
  changeActivationType: "/api/MediaPackages/ChangeActivationTypeMediaPackage",
  changeActivationTypeMediaInPackage:
    "/api/MediaPackages/ChangeActivationTypeMediaInPackage",
  finalDelete: "/api/MediaPackages/DeleteMediaPackage",
  deleteImage: "/api/MediaPackages/DeleteImage",
};
//#endregion MediaPackages

//#region MediaPackageCodes
export const MediaPackageCodes = {
  getAll: "/api/MediaPackageCodes/GetAllMediaPackageCodes",
  getDetails: "/api/MediaPackageCodes/GetMediaPackageCodeDetails",
  getDialog: "/api/MediaPackageCodes/GetMediaPackageDialog",
  getReport: "/api/MediaPackageCodes/ExportPackageCodesReport?",
  add: "/api/MediaPackageCodes/AddMediaPackageCode",
  subscribe: "/api/MediaPackageCodes/SubscribeInPackageToUser",
  deleteNotUsedCodes: "/api/MediaPackageCodes/DeleteNotUsedCodes",
  finalDelete: "/api/MediaPackageCodes/DeleteMediaPackageCode",
};
//#endregion MediaPackageCodes
