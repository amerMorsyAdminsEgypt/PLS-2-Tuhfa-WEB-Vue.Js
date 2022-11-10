const CITIZEN_SHIP_TYPE_TOKEN_SIMPOL = "CST-";
const PARAGRAPH_TYPE_TOKEN_SIMPOL = "PTTS-";
const DEATH_TYPE_TOKEN_SIMPOL = "DTT-";
const QUESTION_TYPE_TOKEN_SIMPOL = "QTTS-";
const SYSTEM_TYPE_TOKEN_SIMPOL = "STTS-";
const KINSHIP_DEGREE_TOKEN_SIMPOL = "KTT-";
const GENDER_TOKEN_SIMPOL = "GET-";
const MARITAL_TOKEN_SIMPOL = "MAT-";
const MILITARY_TOKEN_SIMPOL = "MIT-";
const PLAT_FORM_TYPE_TOKEN_SIMPOL = "PFT-";
const DAY_OF_WEEK_TOKEN_SIMPOL = "DOF-";
const MEDIA_TYPE_TOKEN_SIMPOL = "MTT-";
const PAGE_GO_TO_TOKEN_SIMPOL = "PGT-";
const FEES_TYPE_TOKEN_SIMPOL = "FTT-";
const USER_TYPE_TOKEN_SIMPOL = "UTT_";
const PLACE_TYPE_TOKEN_SIMPOL = "PLCT-";
const StorageSpace = "StorageSpace_";
const StorageSpaceMedia = "StorageSpaceMediaType_";
const THEME_TYPE_TOKEN_SIMPOL = "THEM-";
const ACTIVATION_TYPE_TOKEN_SIMPOL = "AST-";
const OWNERSHIP_TYPE_TOKEN_SIMPOL = "OTT-";
const DURATION_TYPE_TOKEN_SIMPOL = "DTT-";
const COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL = "CST-";
const GRADING_PLAN_SLICES_TYPE_TOKEN_SIMPOL = "GRPS-";
const COST_CENTER_TYPE_TOKEN_SIMPOL = "CCT-";
const CLOSED_STATE_TYPE_TOKEN_SIMPOL = "CLST-";
const EQUILIBRIUM_TYPE_TOKEN_SIMPOL = "EQUIL-";
const TAX_DEDUCTION_TYPE_TOKEN_SIMPOL = "TDT-";
const PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL = "PST-";
const WorkStatusTypeToken = "WOR-";
const APPOINTMENT_TYPE_TOKEN_SIMPOL = "APPO-";
const FOLLOW_UP_SIDE_TYPE_TOKEN_SIMPOL = "FUST-";
const PRINT_CODE_TYPE_TOKEN_SIMPOL = "PCT-";
const CALENDER_SEARCH_TYPE_TOKEN_SIMPOL = "CST-";
const ENROLLMENT_TYPE_TOKEN_SIMPOL = "ENRT-";
const APPROVAL_TYPE_TOKEN_SIMPOL = "APPROVAL-";
const ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL = "ACCOTT-";
const REFUND_TYPE_TOKEN_SIMPOL = "RTTS-";
const CANCLE_TYPE_TOKEN_SIMPOL = "CANCLE-";
const OTHER_INTEREST_TYPE_TOKEN_SIMPOL = "OITT-";
const SHOW_TYPE_TOKEN_SIMPOL = "SHOW-";
const SUBSCRIPTION_TYPE_TOKEN_SIMPOL = "SUBSCRIPTION-";
const DEBT_TYPE_TOKEN_SIMPOL = "DEBT-";
const SCHEDULE_STATUS_TYPE_TOKEN_SIMPOL = "SCHEDULE-";
const REPLY_STATUS_TYPE_TOKEN_SIMPOL = "RSTT-";
const RELATED_WITH_GROUP_TYPE_TOKEN_SIMPOL = "RELATED_WITH_GROUP-";
const JOINING_TYPE_TOKEN_SIMPOL = "JTTS-";
const FOLLOW_UP_TYPE_TOKEN_SIMPOL = "FTTS-";
const ATTENDANCE_TYPE_TOKEN_SIMPOL = "ATTS-";
const EXAM_TYPE_TOKEN_SIMPOL = "EXAM-";
const EXAM_SUBMIT_STATUS_TYPE_TOKEN_SIMPOL = "EXAM_SUBMIT_STATUS-";
const INSTALLMENT_STATE_TYPE_TOKEN_SIMPOL = "ISTT-";
const REACT_TYPE_TOKEN_SIMPOL = "RTTS-";
const PRICE_TYPE_TOKEN_SIMPOL = "PTTS-";
const BALANCE_AFFECTED_TYPE_TOKEN_SIMPOL = "BATT-";
const BALANCE_AFFECTED_METHOD_TYPE_TOKEN_SIMPOL = "BAMT-";
const EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL = "ERTT-";
const WAITING_TYPE_TOKEN_SIMPOL = "WTT-";
const USER_TYPE = {
  AdminsEgypt: USER_TYPE_TOKEN_SIMPOL + "12300",
  MasterAdmin: USER_TYPE_TOKEN_SIMPOL + "12400",
  Employee: USER_TYPE_TOKEN_SIMPOL + "12500",
  Contractor: USER_TYPE_TOKEN_SIMPOL + "12700",
  Student: USER_TYPE_TOKEN_SIMPOL + "12800",
  Supplier: USER_TYPE_TOKEN_SIMPOL + "13000",
  Parent: USER_TYPE_TOKEN_SIMPOL + "13200",
  Client: USER_TYPE_TOKEN_SIMPOL + "12600",
  VechileOwner: USER_TYPE_TOKEN_SIMPOL + "12900",
  Guest: USER_TYPE_TOKEN_SIMPOL + "15000",
};
const SYSTEM_TYPE = {
  Place: SYSTEM_TYPE_TOKEN_SIMPOL + "1",
  EducationalActivity: SYSTEM_TYPE_TOKEN_SIMPOL + "2",
  GeographicalDistribution: SYSTEM_TYPE_TOKEN_SIMPOL + "3",
  JobGrade: SYSTEM_TYPE_TOKEN_SIMPOL + "4",
  StoreItem: SYSTEM_TYPE_TOKEN_SIMPOL + "5",
  Level: SYSTEM_TYPE_TOKEN_SIMPOL + "6",
  BodyPart: SYSTEM_TYPE_TOKEN_SIMPOL + "7",
};

export const EnumClass = {
  CitizenShipType: {
    Residing: CITIZEN_SHIP_TYPE_TOKEN_SIMPOL + "1",
    NotResiding: CITIZEN_SHIP_TYPE_TOKEN_SIMPOL + "2",
  },
  ParagraphType: {
    Mandatory: PARAGRAPH_TYPE_TOKEN_SIMPOL + "1",
    Optional: PARAGRAPH_TYPE_TOKEN_SIMPOL + "2",
  },
  DeathType: {
    Alive: DEATH_TYPE_TOKEN_SIMPOL + "1",
    Dead: DEATH_TYPE_TOKEN_SIMPOL + "2",
  },
  QuestionType: {
    Essay: QUESTION_TYPE_TOKEN_SIMPOL + "1",
    TrueOrFalse: QUESTION_TYPE_TOKEN_SIMPOL + "2",
    MultipleChoice: QUESTION_TYPE_TOKEN_SIMPOL + "3",
  },
  SystemType: {
    Place: SYSTEM_TYPE_TOKEN_SIMPOL + "1",
    EducationalActivity: SYSTEM_TYPE_TOKEN_SIMPOL + "2",
    GeographicalDistribution: SYSTEM_TYPE_TOKEN_SIMPOL + "3",
    JobGrade: SYSTEM_TYPE_TOKEN_SIMPOL + "4",
    StoreItem: SYSTEM_TYPE_TOKEN_SIMPOL + "5",
    Level: SYSTEM_TYPE_TOKEN_SIMPOL + "6",
    BodyPart: SYSTEM_TYPE_TOKEN_SIMPOL + "7",
  },
  KinShipDegree: {
    First: KINSHIP_DEGREE_TOKEN_SIMPOL + "1",
    Second: KINSHIP_DEGREE_TOKEN_SIMPOL + "2",
    Third: KINSHIP_DEGREE_TOKEN_SIMPOL + "3",
    Fourth: KINSHIP_DEGREE_TOKEN_SIMPOL + "4",
  },
  GenderType: {
    Male: GENDER_TOKEN_SIMPOL + "1",
    Female: GENDER_TOKEN_SIMPOL + "2",
    Others: GENDER_TOKEN_SIMPOL + "3",
  },
  MaritalType: {
    Married: MARITAL_TOKEN_SIMPOL + "1",
    Unmarried: MARITAL_TOKEN_SIMPOL + "2",
    Divorced: MARITAL_TOKEN_SIMPOL + "3",
    Widower: MARITAL_TOKEN_SIMPOL + "4",
    Others: MARITAL_TOKEN_SIMPOL + "5",
  },
  MilitaryType: {
    DelayedMilitaryService: MILITARY_TOKEN_SIMPOL + "1",
    EndedMilitaryService: MILITARY_TOKEN_SIMPOL + "2",
    ExemptMilitaryService: MILITARY_TOKEN_SIMPOL + "3",
    TemporarilyExemptedMilitaryService: MILITARY_TOKEN_SIMPOL + "4",
  },
  PlatFormType: {
    Ios: PLAT_FORM_TYPE_TOKEN_SIMPOL + "1",
    Android: PLAT_FORM_TYPE_TOKEN_SIMPOL + "2",
    Web: PLAT_FORM_TYPE_TOKEN_SIMPOL + "3",
    Desktop: PLAT_FORM_TYPE_TOKEN_SIMPOL + "4",
  },
  DaysOfWeek: {
    Saturday: DAY_OF_WEEK_TOKEN_SIMPOL + "1",
    Sunday: DAY_OF_WEEK_TOKEN_SIMPOL + "2",
    Monday: DAY_OF_WEEK_TOKEN_SIMPOL + "3",
    Tuesday: DAY_OF_WEEK_TOKEN_SIMPOL + "4",
    Wednesday: DAY_OF_WEEK_TOKEN_SIMPOL + "5",
    Thursday: DAY_OF_WEEK_TOKEN_SIMPOL + "6",
    Friday: DAY_OF_WEEK_TOKEN_SIMPOL + "7",
  },

  MediaType: {
    Image: MEDIA_TYPE_TOKEN_SIMPOL + "1",
    Video: MEDIA_TYPE_TOKEN_SIMPOL + "2",
    Audio: MEDIA_TYPE_TOKEN_SIMPOL + "3",
    Pdf: MEDIA_TYPE_TOKEN_SIMPOL + "4",
    Excel: MEDIA_TYPE_TOKEN_SIMPOL + "5",
    Word: MEDIA_TYPE_TOKEN_SIMPOL + "6",
    PowerPoint: MEDIA_TYPE_TOKEN_SIMPOL + "7",
    Other: MEDIA_TYPE_TOKEN_SIMPOL + "8",
  },

  PageGoTo: {
    Establishments: PAGE_GO_TO_TOKEN_SIMPOL + "Establishments",
    EstablishmentsRoles: PAGE_GO_TO_TOKEN_SIMPOL + "EstablishmentsRoles",
    UserValidSettings: PAGE_GO_TO_TOKEN_SIMPOL + "UserValidSettings",
    Users: PAGE_GO_TO_TOKEN_SIMPOL + "Users",
    CardCreationPlans: PAGE_GO_TO_TOKEN_SIMPOL + "CardCreationPlans",
    Cards: PAGE_GO_TO_TOKEN_SIMPOL + "Cards",
    ActivityTypes: PAGE_GO_TO_TOKEN_SIMPOL + "ActivityTypes",
    Brands: PAGE_GO_TO_TOKEN_SIMPOL + "Brands",
    BrandUsers: PAGE_GO_TO_TOKEN_SIMPOL + "BrandUsers",
    BrandPlaces: PAGE_GO_TO_TOKEN_SIMPOL + "BrandPlaces",
    Sectors: PAGE_GO_TO_TOKEN_SIMPOL + "Sectors",
    GeneralJobs: PAGE_GO_TO_TOKEN_SIMPOL + "GeneralJobs",
    Countries: PAGE_GO_TO_TOKEN_SIMPOL + "Countries",
    Cities: PAGE_GO_TO_TOKEN_SIMPOL + "Cities",
    Governorates: PAGE_GO_TO_TOKEN_SIMPOL + "Governorates",
    Districts: PAGE_GO_TO_TOKEN_SIMPOL + "Districts",
    ScientificDegrees: PAGE_GO_TO_TOKEN_SIMPOL + "ScientificDegrees",
    Qualifications: PAGE_GO_TO_TOKEN_SIMPOL + "Qualifications",
    Banks: PAGE_GO_TO_TOKEN_SIMPOL + "Banks",
    BrandServices: PAGE_GO_TO_TOKEN_SIMPOL + "BrandServices",
    Offers: PAGE_GO_TO_TOKEN_SIMPOL + "Offers",
    SellCards: PAGE_GO_TO_TOKEN_SIMPOL + "SellCards",
    QrCodeSessionsPurchases:
      PAGE_GO_TO_TOKEN_SIMPOL + "QrCodeSessionsPurchases",
    Sponsors: PAGE_GO_TO_TOKEN_SIMPOL + "Sponsors",
    BloodTypes: PAGE_GO_TO_TOKEN_SIMPOL + "BloodTypes",
    MilitaryStatusTypes: PAGE_GO_TO_TOKEN_SIMPOL + "MilitaryStatusTypes",
    SocialStatuses: PAGE_GO_TO_TOKEN_SIMPOL + "SocialStatuses",
    Religions: PAGE_GO_TO_TOKEN_SIMPOL + "Religions",
    Currencies: PAGE_GO_TO_TOKEN_SIMPOL + "Currencies",
    InsuranceCompanies: PAGE_GO_TO_TOKEN_SIMPOL + "InsuranceCompanies",
    PersonalCardTypes: PAGE_GO_TO_TOKEN_SIMPOL + "PersonalCardTypes",
    UserPersonalCards: PAGE_GO_TO_TOKEN_SIMPOL + "UserPersonalCards",
    RelativeRelationTypes: PAGE_GO_TO_TOKEN_SIMPOL + "RelativeRelationTypes",
    UsersFamily: PAGE_GO_TO_TOKEN_SIMPOL + "UsersFamily",
    Jobs: PAGE_GO_TO_TOKEN_SIMPOL + "Jobs",
    ClassificationDegrees: PAGE_GO_TO_TOKEN_SIMPOL + "ClassificationDegrees",
    UserQualifications: PAGE_GO_TO_TOKEN_SIMPOL + "UserQualifications",
    UserScientificDegrees: PAGE_GO_TO_TOKEN_SIMPOL + "UserScientificDegrees",
    Certificates: PAGE_GO_TO_TOKEN_SIMPOL + "Certificates",
    UserTrainingCourses: PAGE_GO_TO_TOKEN_SIMPOL + "UserTrainingCourses",
    UserExperiences: PAGE_GO_TO_TOKEN_SIMPOL + "UserExperiences",
    SystemComponents: PAGE_GO_TO_TOKEN_SIMPOL + "SystemComponents",
    SystemComponentsHierarchies:
      PAGE_GO_TO_TOKEN_SIMPOL + "SystemComponentsHierarchies",
    Places: PAGE_GO_TO_TOKEN_SIMPOL + "Places",
    NewsCategories: PAGE_GO_TO_TOKEN_SIMPOL + "NewsCategories",
    News: PAGE_GO_TO_TOKEN_SIMPOL + "News",
    GradingPlans: PAGE_GO_TO_TOKEN_SIMPOL + "GradingPlans",
    NewsGallery: PAGE_GO_TO_TOKEN_SIMPOL + "NewsGallery",
    EducationSystemTypes: PAGE_GO_TO_TOKEN_SIMPOL + "EducationSystemTypes",
    EducationalCategories: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalCategories",
    UserFavouriteNews: PAGE_GO_TO_TOKEN_SIMPOL + "UserFavouriteNews",
    EducationalGroups: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalGroups",
    ServiceTypes: PAGE_GO_TO_TOKEN_SIMPOL + "ServiceTypes",
    Services: PAGE_GO_TO_TOKEN_SIMPOL + "Services",
    Colors: PAGE_GO_TO_TOKEN_SIMPOL + "Colors",
    Units: PAGE_GO_TO_TOKEN_SIMPOL + "Units",
    FuelTypes: PAGE_GO_TO_TOKEN_SIMPOL + "FuelTypes",
    TransportationTypes: PAGE_GO_TO_TOKEN_SIMPOL + "TransportationTypes",
    VechilesBrands: PAGE_GO_TO_TOKEN_SIMPOL + "VechilesBrands",
    Vechiles: PAGE_GO_TO_TOKEN_SIMPOL + "Vechiles",
    VechileLicenses: PAGE_GO_TO_TOKEN_SIMPOL + "VechileLicenses",
    VechileTypes: PAGE_GO_TO_TOKEN_SIMPOL + "VechileTypes",
    VechileRentals: PAGE_GO_TO_TOKEN_SIMPOL + "VechileRentals",
    GeographicalDistributions:
      PAGE_GO_TO_TOKEN_SIMPOL + "GeographicalDistributions",
    JobGrades: PAGE_GO_TO_TOKEN_SIMPOL + "JobGrades",
    PaymentMethods: PAGE_GO_TO_TOKEN_SIMPOL + "PaymentMethods",
    Groups: PAGE_GO_TO_TOKEN_SIMPOL + "Groups",
    CurrencyEnquiries: PAGE_GO_TO_TOKEN_SIMPOL + "CurrencyEnquiries",
    VechileShapes: PAGE_GO_TO_TOKEN_SIMPOL + "VechileShapes",
    StoreItems: PAGE_GO_TO_TOKEN_SIMPOL + "StoreItems",
    StorageSpaces: PAGE_GO_TO_TOKEN_SIMPOL + "StorageSpaces",
    StorageSpacesMedia: PAGE_GO_TO_TOKEN_SIMPOL + "StorageSpacesMedia",
    ComplaintTypes: PAGE_GO_TO_TOKEN_SIMPOL + "ComplaintTypes",
    VechicleItineraries: PAGE_GO_TO_TOKEN_SIMPOL + "VechicleItineraries",
    FollowUpTypes: PAGE_GO_TO_TOKEN_SIMPOL + "FollowUpTypes",
    PriorityTypes: PAGE_GO_TO_TOKEN_SIMPOL + "PriorityTypes",
    ComplaintSectors: PAGE_GO_TO_TOKEN_SIMPOL + "ComplaintSectors",
    Complaints: PAGE_GO_TO_TOKEN_SIMPOL + "Complaints",
    ComplaintFollowUps: PAGE_GO_TO_TOKEN_SIMPOL + "ComplaintFollowUps",
    EducationalPeriods: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalPeriods",
    ScheduleEducationalGroups:
      PAGE_GO_TO_TOKEN_SIMPOL + "ScheduleEducationalGroups",
    ReminderPlans: PAGE_GO_TO_TOKEN_SIMPOL + "ReminderPlans",
    Reminders: PAGE_GO_TO_TOKEN_SIMPOL + "Reminders",
    EducationalScheduleTimes:
      PAGE_GO_TO_TOKEN_SIMPOL + "EducationalScheduleTimes",
    ExamModels: PAGE_GO_TO_TOKEN_SIMPOL + "ExamModels",
    EstablishmentPackages: PAGE_GO_TO_TOKEN_SIMPOL + "EstablishmentPackages",
    EducationalJoiningApplications:
      PAGE_GO_TO_TOKEN_SIMPOL + "EducationalJoiningApplications",
    ExamModelParagraphs: PAGE_GO_TO_TOKEN_SIMPOL + "ExamModelParagraphs",
    ExamModelParagraphQuestions:
      PAGE_GO_TO_TOKEN_SIMPOL + "ExamModelParagraphQuestions",
    Accounts: PAGE_GO_TO_TOKEN_SIMPOL + "Accounts",
    ExpensesTypes: PAGE_GO_TO_TOKEN_SIMPOL + "ExpensesTypes",
    RevenuesTypes: PAGE_GO_TO_TOKEN_SIMPOL + "RevenuesTypes",
    EducationalRatings: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalRatings",
    AccountTransactions: PAGE_GO_TO_TOKEN_SIMPOL + "AccountTransactions",
    PriceLists: PAGE_GO_TO_TOKEN_SIMPOL + "PriceLists",
    Expenses: PAGE_GO_TO_TOKEN_SIMPOL + "Expenses",
    Revenues: PAGE_GO_TO_TOKEN_SIMPOL + "Revenues",
    Debts: PAGE_GO_TO_TOKEN_SIMPOL + "Debts",
    Interests: PAGE_GO_TO_TOKEN_SIMPOL + "Interests",
    Installments: PAGE_GO_TO_TOKEN_SIMPOL + "Installments",
    InstallmentSchedules: PAGE_GO_TO_TOKEN_SIMPOL + "InstallmentSchedules",
    InstallmentPayments: PAGE_GO_TO_TOKEN_SIMPOL + "InstallmentPayments",
    InterestFollowUps: PAGE_GO_TO_TOKEN_SIMPOL + "InterestFollowUps",
    EducationalGroupStudents:
      PAGE_GO_TO_TOKEN_SIMPOL + "EducationalGroupStudents",
    ServiceEntitlements: PAGE_GO_TO_TOKEN_SIMPOL + "ServiceEntitlements",
    EducationalGroupAttendances:
      PAGE_GO_TO_TOKEN_SIMPOL + "EducationalGroupAttendances",
    SimpleExamModels: PAGE_GO_TO_TOKEN_SIMPOL + "SimpleExamModels",
    GroupScheduleExams: PAGE_GO_TO_TOKEN_SIMPOL + "GroupScheduleExams",
    StudentScheduleExamTimes:
      PAGE_GO_TO_TOKEN_SIMPOL + "StudentScheduleExamTimes",
    EducationalCertificates:
      PAGE_GO_TO_TOKEN_SIMPOL + "EducationalCertificates",
    Discussions: PAGE_GO_TO_TOKEN_SIMPOL + "Discussions",
    DiscussionComments: PAGE_GO_TO_TOKEN_SIMPOL + "DiscussionComments",
    DiscussionCommentReacts:
      PAGE_GO_TO_TOKEN_SIMPOL + "DiscussionCommentReacts",
    Clubs: PAGE_GO_TO_TOKEN_SIMPOL + "Clubs",
    InjuryTypes: PAGE_GO_TO_TOKEN_SIMPOL + "InjuryTypes",
    OperationTypes: PAGE_GO_TO_TOKEN_SIMPOL + "OperationTypes",
    Levels: PAGE_GO_TO_TOKEN_SIMPOL + "Levels",
    BodyParts: PAGE_GO_TO_TOKEN_SIMPOL + "BodyParts",
    UserInjuries: PAGE_GO_TO_TOKEN_SIMPOL + "UserInjuries",
    CompetitionTypes: PAGE_GO_TO_TOKEN_SIMPOL + "CompetitionTypes",
    UserOperations: PAGE_GO_TO_TOKEN_SIMPOL + "UserOperations",
    Competitions: PAGE_GO_TO_TOKEN_SIMPOL + "Competitions",
    CompetitionAppointments:
      PAGE_GO_TO_TOKEN_SIMPOL + "CompetitionAppointments",
    CompetitionSubscriptions:
      PAGE_GO_TO_TOKEN_SIMPOL + "CompetitionSubscriptions",
    UserBalances: PAGE_GO_TO_TOKEN_SIMPOL + "UserBalances",
    UserBalanceTransactions:
      PAGE_GO_TO_TOKEN_SIMPOL + "UserBalanceTransactions",
  },

  FeeType: {
    Default: FEES_TYPE_TOKEN_SIMPOL + "1",
    Increase: FEES_TYPE_TOKEN_SIMPOL + "2",
    Deduct: FEES_TYPE_TOKEN_SIMPOL + "3",
  },

  UserType: {
    AdminsEgypt: USER_TYPE_TOKEN_SIMPOL + "12300",
    MasterAdmin: USER_TYPE_TOKEN_SIMPOL + "12400",
    Employee: USER_TYPE_TOKEN_SIMPOL + "12500",
    Contractor: USER_TYPE_TOKEN_SIMPOL + "12700",
    Student: USER_TYPE_TOKEN_SIMPOL + "12800",
    Supplier: USER_TYPE_TOKEN_SIMPOL + "13000",
    Parent: USER_TYPE_TOKEN_SIMPOL + "13200",
    Client: USER_TYPE_TOKEN_SIMPOL + "12600",
    VechileOwner: USER_TYPE_TOKEN_SIMPOL + "12900",
    Guest: USER_TYPE_TOKEN_SIMPOL + "15000",
  },

  PlaceType: {
    AdminsEgypt: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.AdminsEgypt,
    MasterAdmin: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.MasterAdmin,
    Employee: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Employee,
    Student: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Student,
    Supplier: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Supplier,
    Parent: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Parent,
    Client: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Client,
    VechileOwner: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.VechileOwner,
    // Sales: PLACE_TYPE_TOKEN_SIMPOL + USER_TYPE.Sales,
    Other: PLACE_TYPE_TOKEN_SIMPOL + "333",
  },

  UsersModules: {
    UsersFamily: "UsersFamily_",
    UserValidSetting: "UserValidSetting_",
    UserQualification: "UserQualification_",
    UserScientificDegree: "UserScientificDegree_",
    UserTrainingCourse: "UserTrainingCourse_",
    UserExperience: "UserExperience_",
    UserInjury: "UserInjury_",
    UserOperation: "UserOpration_",
    UserPersonalCard: "UserPersonalCard_",
    EstablishmentsRoles: "EstablishmentsRoles_",
    UserLoginCode: "UserLoginCode_",
  },

  StorageSpaceType: {
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
    PlaceVechileOwner:
      StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.VechileOwner,
    PlaceClient: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Client,
    PlaceSupplier: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Supplier,
    // PlaceSales: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Sales,
    PlaceParent: StorageSpace + SYSTEM_TYPE.Place + USER_TYPE.Parent,
    PlaceOther: StorageSpace + SYSTEM_TYPE.Place,

    EducationalCategory: StorageSpace + SYSTEM_TYPE.EducationalActivity,
    Vechile: StorageSpace + "Vechile",
    Account: StorageSpace + "Account",
    StoreItem: StorageSpace + "StoreItem",
    EducationalGroup: StorageSpace + "EducationalGroup",
  },

  StorageSpaceMediaType: {
    AdminsEgypt: StorageSpaceMedia + USER_TYPE.AdminsEgypt,
    MasterAdmin: StorageSpaceMedia + USER_TYPE.MasterAdmin,
    Employee: StorageSpaceMedia + USER_TYPE.Employee,
    Student: StorageSpaceMedia + USER_TYPE.Student,
    Supplier: StorageSpaceMedia + USER_TYPE.Supplier,
    Parent: StorageSpaceMedia + USER_TYPE.Parent,
    Client: StorageSpaceMedia + USER_TYPE.Client,
    VechileOwner: StorageSpaceMedia + USER_TYPE.VechileOwner,

    PlaceAdminsEgypt:
      StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.AdminsEgypt,
    PlaceMasterAdmin:
      StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.MasterAdmin,
    PlaceEmployee: StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.Employee,
    PlaceStudent: StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.Student,
    PlaceVechileOwner:
      StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.VechileOwner,
    PlaceClient: StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.Client,
    PlaceSupplier: StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.Supplier,
    // PlaceSales: StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.Sales,
    PlaceParent: StorageSpaceMedia + SYSTEM_TYPE.Place + USER_TYPE.Parent,
    PlaceOther: StorageSpaceMedia + SYSTEM_TYPE.Place,

    EducationalCategory: StorageSpaceMedia + SYSTEM_TYPE.EducationalActivity,
    Vechile: StorageSpaceMedia + "Vechile",
    Account: StorageSpaceMedia + "Account",
    StoreItem: StorageSpaceMedia + "StoreItem",
    EducationalGroup: StorageSpaceMedia + "EducationalGroup",
  },

  ThemeType: {
    light: THEME_TYPE_TOKEN_SIMPOL + "1",
    Dark: THEME_TYPE_TOKEN_SIMPOL + "2",
  },

  ActivationType: {
    Active: ACTIVATION_TYPE_TOKEN_SIMPOL + "17400",
    Archived: ACTIVATION_TYPE_TOKEN_SIMPOL + "17500",
    Blocked: ACTIVATION_TYPE_TOKEN_SIMPOL + "17600",
  },

  OwnerShipType: {
    Owned: OWNERSHIP_TYPE_TOKEN_SIMPOL + "1",
    Rented: OWNERSHIP_TYPE_TOKEN_SIMPOL + "2",
  },

  DurationType: {
    BeforeTime: DURATION_TYPE_TOKEN_SIMPOL + "1",
    AfterTime: DURATION_TYPE_TOKEN_SIMPOL + "2",
  },

  TerminationType: {
    Finished: "1",
    NotFinished: "2",
  },

  ComplaintStatusType: {
    OpenAndWaitingForSupportResponse: COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL + "1",
    OpenAndWaitingForComplainingPersonResponse:
      COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL + "2",
    Closed: COMPLAINT_STATUS_TYPE_TOKEN_SIMPOL + "3",
  },

  GradingPlanSlicesType: {
    Degree: GRADING_PLAN_SLICES_TYPE_TOKEN_SIMPOL + "1",
    Percentage: GRADING_PLAN_SLICES_TYPE_TOKEN_SIMPOL + "2",
  },

  CostCenterType: {
    establishment: COST_CENTER_TYPE_TOKEN_SIMPOL + "1",
    user: COST_CENTER_TYPE_TOKEN_SIMPOL + "2",
    place: COST_CENTER_TYPE_TOKEN_SIMPOL + "3",
    educationalCategory: COST_CENTER_TYPE_TOKEN_SIMPOL + "4",
    service: COST_CENTER_TYPE_TOKEN_SIMPOL + "5",
  },

  ClosedState: {
    Closed: CLOSED_STATE_TYPE_TOKEN_SIMPOL + "1",
    Open: CLOSED_STATE_TYPE_TOKEN_SIMPOL + "2",
  },

  EquilibriumType: {
    Balanced: EQUILIBRIUM_TYPE_TOKEN_SIMPOL + "1",
    Unbalanced: EQUILIBRIUM_TYPE_TOKEN_SIMPOL + "2",
  },

  TaxDeductionType: {
    Isolated: TAX_DEDUCTION_TYPE_TOKEN_SIMPOL + "1",
    Inclusive: TAX_DEDUCTION_TYPE_TOKEN_SIMPOL + "2",
  },

  WaitingType: {
    Waiting: WAITING_TYPE_TOKEN_SIMPOL + "1",
    Crossing: WAITING_TYPE_TOKEN_SIMPOL + "2",
  },

  PriorityScopeType: {
    Complaints: PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL + "1",
    FollowUps: PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL + "2",
    Reminders: PRIORITY_SCOPE_TYPE_TOKEN_SIMPOL + "3",
  },

  WorkStatusType: {
    Work: WorkStatusTypeToken + "1",
    Holiday: WorkStatusTypeToken + "2",
    Unknown: WorkStatusTypeToken + "3",
  },

  AppointmentType: {
    Online: APPOINTMENT_TYPE_TOKEN_SIMPOL + "1",
    InPlcae: APPOINTMENT_TYPE_TOKEN_SIMPOL + "2",
  },

  FollowUpSideType: {
    Support: FOLLOW_UP_SIDE_TYPE_TOKEN_SIMPOL + "1",
    Request: FOLLOW_UP_SIDE_TYPE_TOKEN_SIMPOL + "2",
  },

  PrintCodeType: {
    Barcode: PRINT_CODE_TYPE_TOKEN_SIMPOL + "1",
    QrCode: PRINT_CODE_TYPE_TOKEN_SIMPOL + "2",
  },

  CalendarSearchType: {
    Day: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "1",
    Week: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "2",
    Month: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "3",
    Year: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "4",
    Customize: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "5",
  },

  EnrollmentType: {
    Regularity: ENROLLMENT_TYPE_TOKEN_SIMPOL + "1",
    Affiliation: ENROLLMENT_TYPE_TOKEN_SIMPOL + "2",
    Online: ENROLLMENT_TYPE_TOKEN_SIMPOL + "3",
  },

  ApprovalType: {
    UnderReview: APPROVAL_TYPE_TOKEN_SIMPOL + "1",
    Accepted: APPROVAL_TYPE_TOKEN_SIMPOL + "2",
    Rejected: APPROVAL_TYPE_TOKEN_SIMPOL + "3",
  },

  EducationalRatingType: {
    EducationalCategory: EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL + "1",
    EducationalGroup: EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL + "2",
    EducationalScheduleTime: EDUCATIONAL_RATING_TYPE_TOKEN_SIMPOL + "3",
  },

  AccountTransactionType: {
    DepositToAccount:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "DepositToAccount",
    DropdownFromAccount:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "DropdownFromAccount",
    PayExpenses: ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "PayExpenses",
    RefundExpenses: ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "RefundExpenses",
    AccrualRevenues: ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "AccrualRevenues",
    RefundRevenues: ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "RefundRevenues",
    PayInstallment: ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "PayInstallmen",
    RefundInstallment:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "RefundInstallmen",
    AccrualServiceEntitlement:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "AccrualServiceEntitlement",
    RefundServiceEntitlement:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "RefundServiceEntitlement",
    PayDebt: ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "PayDebt",
    PayCompetitionSubscription:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "PayCompetitionSubscription",
    DepositeToWallet:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "DepositeToWallet",
    DropDownFromWallet:
      ACCOUNT_TRANSACTION_TYPE_TOKEN_SIMPOL + "DropDownFromWallet",
  },

  RefundType: {
    Refunded: REFUND_TYPE_TOKEN_SIMPOL + "1",
    NotRefunded: REFUND_TYPE_TOKEN_SIMPOL + "2",
  },

  CancelType: {
    Canceled: CANCLE_TYPE_TOKEN_SIMPOL + "1",
    NotCanceled: CANCLE_TYPE_TOKEN_SIMPOL + "2",
  },

  InterestType: {
    NoInterests: OTHER_INTEREST_TYPE_TOKEN_SIMPOL + "1",
    EducationalCategoryInterests: OTHER_INTEREST_TYPE_TOKEN_SIMPOL + "2",
    EducationalCategoryOtherInterests: OTHER_INTEREST_TYPE_TOKEN_SIMPOL + "3",
    AllInterests: OTHER_INTEREST_TYPE_TOKEN_SIMPOL + "4",
  },

  ShowType: {
    Show: SHOW_TYPE_TOKEN_SIMPOL + "1",
    Hide: SHOW_TYPE_TOKEN_SIMPOL + "2",
  },

  SubscriptionType: {
    Package: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "1",
    Session: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "2",
    Hour: SUBSCRIPTION_TYPE_TOKEN_SIMPOL + "3",
  },

  DebtType: {
    EducationalJoiningApplication: DEBT_TYPE_TOKEN_SIMPOL + "1",
    Service: DEBT_TYPE_TOKEN_SIMPOL + "2",
    CompetitionSubscription: DEBT_TYPE_TOKEN_SIMPOL + "3",
  },

  SchedulingStatusType: {
    IsHaveSchedule: SCHEDULE_STATUS_TYPE_TOKEN_SIMPOL + "1",
    NotHaveSchedule: SCHEDULE_STATUS_TYPE_TOKEN_SIMPOL + "2",
  },

  ReplyStatusType: {
    Reply: REPLY_STATUS_TYPE_TOKEN_SIMPOL + "1",
    NotReply: REPLY_STATUS_TYPE_TOKEN_SIMPOL + "2",
    Closed: REPLY_STATUS_TYPE_TOKEN_SIMPOL + "3",
    Other: REPLY_STATUS_TYPE_TOKEN_SIMPOL + "4",
  },

  RelatedWithGroupType: {
    Related: RELATED_WITH_GROUP_TYPE_TOKEN_SIMPOL + "1",
    NotRelated: RELATED_WITH_GROUP_TYPE_TOKEN_SIMPOL + "2",
  },

  JoiningType: {
    Joined: JOINING_TYPE_TOKEN_SIMPOL + "1",
    NotJoined: JOINING_TYPE_TOKEN_SIMPOL + "2",
  },

  FollowUpType: {
    EducationalCategoryInterest: FOLLOW_UP_TYPE_TOKEN_SIMPOL + "1",
    EducationalCategoryOtherInterest: FOLLOW_UP_TYPE_TOKEN_SIMPOL + "2",
  },

  AttendanceType: {
    Attendance: ATTENDANCE_TYPE_TOKEN_SIMPOL + "1",
    Departure: ATTENDANCE_TYPE_TOKEN_SIMPOL + "2",
    Unknown: ATTENDANCE_TYPE_TOKEN_SIMPOL + "3",
  },

  ExamType: {
    FinalExam: EXAM_TYPE_TOKEN_SIMPOL + "1",
    MidtermExam: EXAM_TYPE_TOKEN_SIMPOL + "2",
    OralExam: EXAM_TYPE_TOKEN_SIMPOL + "3",
    PeriodicalExam: EXAM_TYPE_TOKEN_SIMPOL + "4",
  },

  ExamSubmitStatusType: {
    Unknown: EXAM_SUBMIT_STATUS_TYPE_TOKEN_SIMPOL + "1",
    Submit: EXAM_SUBMIT_STATUS_TYPE_TOKEN_SIMPOL + "2",
  },

  InstallmentStateType: {
    Installment: INSTALLMENT_STATE_TYPE_TOKEN_SIMPOL + "1",
    Cash: INSTALLMENT_STATE_TYPE_TOKEN_SIMPOL + "2",
  },

  ReactType: {
    Like: REACT_TYPE_TOKEN_SIMPOL + "1",
    DisLike: REACT_TYPE_TOKEN_SIMPOL + "2",
  },

  PriceType: {
    Paid: PRICE_TYPE_TOKEN_SIMPOL + "1",
    Free: PRICE_TYPE_TOKEN_SIMPOL + "2",
  },

  BalanceAffectedType: {
    Wallet: BALANCE_AFFECTED_TYPE_TOKEN_SIMPOL + "1",
    Points: BALANCE_AFFECTED_TYPE_TOKEN_SIMPOL + "2",
    Both: BALANCE_AFFECTED_TYPE_TOKEN_SIMPOL + "3",
  },

  BalanceAffectedMethodType: {
    Increase: BALANCE_AFFECTED_METHOD_TYPE_TOKEN_SIMPOL + "1",
    Decrease: BALANCE_AFFECTED_METHOD_TYPE_TOKEN_SIMPOL + "2",
  },
};
