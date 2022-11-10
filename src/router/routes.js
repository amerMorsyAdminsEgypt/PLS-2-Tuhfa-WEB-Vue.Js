import { DEFAULT_PAGES } from "./../utils/constants";
import {
  USER_TYPE,
  PLACE_TYPE_TOKENS,
  SYSTEM_TYPE,
  STORAGE_SPACE_TYPE,
  STORAGE_SPACE_Media_TYPE,
} from "./../utils/constantLists";
import { checkPrivilege } from "./../utils/functions";
import i18n from "./../i18n";
import store from "./../store";
import * as privilegeHelper from "./../utils/privilegeHelper";

export const ifAuthenticated = (to, from, next) => {
  if (store.getters.userAuthorizeToken) {
    next({ name: DEFAULT_PAGES.loggedIn });
  } else {
    next();
  }
};
export const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.userAuthorizeToken) {
    next({ name: DEFAULT_PAGES.notLoggedIn });
  } else {
    next();
  }
};

export const handlePrivilege = (to, from, next, privilegeStatus) => {
  ifNotAuthenticated(to, from, next);
  if (privilegeStatus) {
    next();
  } else {
    next({ name: "Error404" });
  }
  if (store.getters.invalidLoginCodeStatus) {
    next({ name: "InvalidLoginClode" });
  } else {
    next();
  }
};

export const ifInvalidLoginClode = (to, from, next) => {
  ifNotAuthenticated(to, from, next);
  if (store.getters.invalidLoginCodeStatus) {
    next();
  } else {
    next({ name: "Error404" });
  }
};

const routes = [
  {
    path: "/invalid-login-clode",
    name: "InvalidLoginClode",
    component: () =>
      import("./../views/settings/userLoginCodes/UserLoginCodesUseCode.vue"),
    beforeEnter: ifInvalidLoginClode,

    meta: {
      // layout: "auth",
      pageName: "InvalidLoginClode",
      pageIcon: "homepage.svg",
    },
  },
  //#region General
  {
    path: "/test",
    name: "Test",
    component: () => import("./../views/general/Test.vue"),
    meta: {
      // layout: "auth",
      pageName: "test",
      pageIcon: "homepage.svg",
    },
  },
  {
    path: "/test2",
    name: "TestSohagy",
    component: () => import("./../views/general/TestSohagy.vue"),
    meta: {
      layout: "auth",
      pageName: "test",
      pageIcon: "homepage.svg",
    },
  },
  {
    path: "/",
    name: "Home",
    component: () => import("./../views/home/Home.vue"),
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "auth",
      pageName: i18n.t("homePage"),
      pageIcon: "homepage.svg",
    },
  },
  //#endregion General

  //#region Auth
  {
    path: "/auth/login",
    name: "UserLogin",
    component: () => import("./../views/users/UserLogin"),
    beforeEnter: ifAuthenticated,
    meta: {
      layout: "auth",
      pageName: i18n.t("login"),
      pageIcon: "homepage.svg",
    },
  },
  //#endregion Auth

  //#region UserAppSettings
  {
    path: "/user-app-settings",
    name: "UserAppSettings",
    component: () => import("./../views/userAppSettings/UserAppSettings.vue"),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserAppSettings.modelName"),
      pageIcon: "UserAppSettings.svg",
    },
  },
  //#endregion UserAppSettings

  //#region Educational
  {
    path: "/educational/educational-periods",
    name: "EducationalPeriods",
    component: () =>
      import(
        "./../views/educational/educationalPeriods/EducationalPeriods.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalPeriod())
      );
    },
    meta: {
      pageName: i18n.t("EducationalPeriods.modelName"),
      pageIcon: "educationalPeriods.svg",
    },
  },
  {
    path: "/educational/educational-categories/:parentEducationalCategoryToken?",
    name: "EducationalCategories",
    component: () =>
      import(
        "./../views/educational/educationalCategories/EducationalCategories.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalCategory())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("EducationalCategories.modelName"),
      pageIcon: "EducationalCategories.svg",
    },
  },
  {
    path: "/educational/educational-categories-tree",
    name: "EducationalCategoriesTree",
    component: () =>
      import(
        "./../views/educational/educationalCategories/EducationalCategoriesTree.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalCategory())
      );
    },
    meta: {
      pageName: i18n.t("EducationalCategories.modelName"),
      pageIcon: "EducationalCategories.svg",
    },
  },
  {
    path: "/educational/system-components-educational-categories",
    name: "SystemComponentEducationalCategory",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponents/SystemComponents.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentEducationalCategory())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponents.modelName"),
      pageIcon: "systemComponents.svg",
      systemTypeToken: SYSTEM_TYPE.EducationalActivity,
      modelName: "systemComponentEducationalCategory",
    },
    props: true,
  },
  {
    path: "/educational/system-components-hierarchies-educational-categories",
    name: "SystemComponentsHierarchyEducationalCategory",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(
          privilegeHelper.hasSystemComponentsHierarchyEducationalCategory()
        )
      );
    },
    meta: {
      pageName: i18n.t("SystemComponentsHierarchies.modelName"),
      pageIcon: "systemComponentsHierarchies.svg",
      systemTypeToken: SYSTEM_TYPE.EducationalActivity,
      modelName: "systemComponentsHierarchyEducationalCategory",
    },
    props: true,
  },
  // {
  //   path: "/educational/educational-ratings/educational-categories-ratings/:educationalCategoryToken?",
  //   name: "EducationalCategoriesRatings",
  //   component: () =>
  //     import(
  //       "./../views/educational/educationalRatings/EducationalRatings.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(
  //         privilegeHelper.hasEducationalCategory() &&
  //           privilegeHelper.hasEducationalRating()
  //       )
  //     );
  //   },
  //   props: true,
  //   meta: {
  //     educationalRatingTypeToken:
  //       EDUCATIONAL_RATING_TYPE_TOKENS.EducationalCategory,
  //     pageName: i18n.t("EducationalRatings.categoriesRatings"),
  //     pageIcon: "educationalRatings.svg",
  //   },
  // },

  {
    path: "/educational/educational-groups/:educationalCategoryToken?",
    name: "EducationalGroups",
    component: () =>
      import("./../views/educational/educationalGroups/EducationalGroups.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalGroup())
      );
    },
    meta: {
      pageName: i18n.t("EducationalGroups.modelName"),
      pageIcon: "EducationalGroups.svg",
    },
    props: true,
  },
  // {
  //   path: "/educational/educational-ratings/educational-groups-ratings/:educationalGroupToken?",
  //   name: "EducationalGroupsRatings",
  //   component: () =>
  //     import(
  //       "./../views/educational/educationalRatings/EducationalRatings.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(
  //         privilegeHelper.hasEducationalGroup() &&
  //           privilegeHelper.hasEducationalRating()
  //       )
  //     );
  //   },
  //   props: true,
  //   meta: {
  //     educationalRatingTypeToken:
  //       EDUCATIONAL_RATING_TYPE_TOKENS.EducationalGroup,
  //     pageName: i18n.t("EducationalRatings.groupsRatings"),
  //     pageIcon: "educationalRatings.svg",
  //   },
  // },

  {
    path: "/educational/educational-schedule-times/:educationalGroupToken?",
    name: "EducationalScheduleTimes",
    component: () =>
      import(
        "./../views/educational/educationalScheduleTimes/EducationalScheduleTimes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalScheduleTime())
      );
    },
    meta: {
      pageName: i18n.t("EducationalScheduleTimes.modelName"),
      pageIcon: "EducationalScheduleTimes.svg",
    },
    props: true,
  },
  {
    path: "/educational/educational-schedule-times/details/:educationalScheduleTimeToken?",
    name: "EducationalScheduleTimeDetails",
    component: () =>
      import(
        "./../views/educational/educationalScheduleTimes/EducationalScheduleTimeDetails.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalScheduleTime())
      );
    },
    meta: {
      pageName: i18n.t("EducationalScheduleTimeDetails.modelName"),
      pageIcon: "EducationalScheduleTimeDetails.svg",
      withPayment: false,
    },
    props: true,
  },
  {
    path: "/educational/educational-schedule-times-details-with-payment/:educationalScheduleTimeToken?",
    name: "EducationalScheduleTimeDetailsWithPayment",
    component: () =>
      import(
        "./../views/educational/educationalScheduleTimes/EducationalScheduleTimeDetails.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalScheduleTime())
      );
    },
    meta: {
      pageName: i18n.t("EducationalScheduleTimeDetails.modelName"),
      pageIcon: "EducationalScheduleTimeDetails.svg",
      withPayment: true,
    },
    props: true,
  },

  {
    path: "/educational/educational-group-students/:educationalGroupToken?/:educationalCategoryToken?",
    name: "EducationalGroupStudents",
    component: () =>
      import(
        "./../views/educational/educationalGroupStudents/EducationalGroupStudents.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalGroupStudent())
      );
    },
    meta: {
      pageName: i18n.t("EducationalGroupStudents.modelName"),
      pageIcon: "EducationalGroupStudents.svg",
    },
    props: true,
  },
  {
    path: "/educational/educational-group-transfers",
    name: "EducationalGroupTransfers",
    component: () =>
      import(
        "./../views/educational/educationalGroupTransfers/EducationalGroupTransfers.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalGroupTransfer())
      );
    },
    meta: {
      pageName: i18n.t("EducationalGroupTransfers.modelName"),
      pageIcon: "EducationalGroupTransfers.svg",
    },
    props: true,
  },
  {
    path: "/educational/educational-group-attendances/:educationalGroupToken?",
    name: "EducationalGroupAttendances",
    component: () =>
      import(
        "./../views/educational/educationalGroupAttendances/EducationalGroupAttendances.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalGroupAttendance())
      );
    },
    meta: {
      pageName: i18n.t("EducationalGroupAttendances.modelName"),
      pageIcon: "EducationalGroupAttendances.svg",
    },
    props: true,
  },
  // {
  //   path: "/educational/educational-ratings/educational-schedule-times-ratings/:educationalScheduleTimeToken?",
  //   name: "EducationalScheduleTimesRatings",
  //   component: () =>
  //     import(
  //       "./../views/educational/educationalRatings/EducationalRatings.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(
  //         privilegeHelper.hasEducationalScheduleTime() &&
  //           privilegeHelper.hasEducationalRating()
  //       )
  //     );
  //   },
  //   props: true,
  //   meta: {
  //     educationalRatingTypeToken:
  //       EDUCATIONAL_RATING_TYPE_TOKENS.EducationalScheduleTime,
  //     pageName: i18n.t("EducationalRatings.scheduleTimesRatings"),
  //     pageIcon: "educationalRatings.svg",
  //   },
  // },
  {
    path: "/educational/simple-exam-models/:simpleExamModelToken?",
    name: "SimpleExamModels",
    component: () =>
      import("./../views/educational/simpleExamModels/SimpleExamModels.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSimpleExamModel())
      );
    },
    meta: {
      pageName: i18n.t("SimpleExamModels.modelName"),
      pageIcon: "SimpleExamModels.svg",
    },
    props: true,
  },

  {
    path: "/educational/group-schedule-exams/:educationalGroupToken?",
    name: "GroupScheduleExams",
    component: () =>
      import(
        "./../views/educational/groupScheduleExams/GroupScheduleExams.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasGroupScheduleExam())
      );
    },
    meta: {
      pageName: i18n.t("GroupScheduleExams.modelName"),
      pageIcon: "GroupScheduleExams.svg",
    },
    props: true,
  },
  {
    path: "/educational/student-schedule-exam-times/:educationalGroupToken?/:userToken?",
    name: "StudentScheduleExamTimes",
    component: () =>
      import(
        "./../views/educational/studentScheduleExamTimes/StudentScheduleExamTimes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudentScheduleExamTime())
      );
    },
    meta: {
      pageName: i18n.t("StudentScheduleExamTimes.modelName"),
      pageIcon: "StudentScheduleExamTimes.svg",
    },
    props: true,
  },

  {
    path: "/discussions/:discussionTypeToken/:mainToken/:educationalGroupToken",
    name: "Discussions",
    props: true,
    component: () =>
      import("./../views/educational/discussions/Discussions.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasDiscussion())
      );
    },
    meta: {
      pageName: i18n.t("Discussions.modelName"),
      pageIcon: "discussions.svg",
    },
  },

  {
    path: "/discussionComments/:educationalGroupToken/:discussionToken/:parentDiscussionCommentToken",
    name: "DiscussionComments",
    props: true,
    component: () =>
      import(
        "./../views/educational/discussionComments/DiscussionComments.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasDiscussionComment())
      );
    },
    meta: {
      pageName: i18n.t("DiscussionComments.modelName"),
      pageIcon: "discussionComments.svg",
    },
  },
  //#endregion Educational

  //#region JoiningApplications
  {
    path: "/JoiningApplications/educational-joining-application/:userStudentToken?/:educationalPeriodToken?/:educationalCategoryToken?",
    name: "EducationalJoiningApplications",
    props: true,
    component: () =>
      import(
        "./../views/educational/educationalJoiningApplications/EducationalJoiningApplications.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalJoiningApplication())
      );
    },
    meta: {
      pageName: i18n.t("EducationalJoiningApplications.modelName"),
      pageIcon: "EducationalJoiningApplications.svg",
    },
  },
  //#endregion JoiningApplications

  //#region JoiningApplications
  {
    path: "/JoiningApplications/joining-application-subscriptions/:userStudentToken?/:educationalJoiningApplicationToken?",
    name: "JoiningApplicationSubscriptions",
    component: () =>
      import(
        "./../views/educational/joiningApplicationSubscriptions/JoiningApplicationSubscriptions.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasJoiningApplicationSubscription())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("JoiningApplicationSubscriptions.modelName"),
      pageIcon: "JoiningApplicationSubscriptions.svg",
    },
  },
  //#endregion JoiningApplications

  //#region Users
  {
    path: "/users/admins-egypt/:userToken?",
    name: "AdminsEgypt",
    component: () => import("./../views/users/Users"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasAdminsEgypt())
      );
    },
    meta: {
      pageName: i18n.t("adminsEgypt.modelName"),
      pageIcon: "adminsEgypt.svg",
      userTypeToken: USER_TYPE.AdminsEgypt,
      modelName: "adminsEgypt",
      StorageSpacesRoute: "StorageSpacesAdminsEgypt",
    },
    props: true,
  },
  {
    path: "/users/master-admin/:userToken?",
    name: "MasterAdmin",
    component: () => import("./../views/users/Users"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: "masterAdmins",
      StorageSpacesRoute: "StorageSpacesMasterAdmin",
    },
    props: true,
  },
  {
    path: "/users/employees/:userToken?",
    name: "Employees",
    component: () => import("./../views/users/Users"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEmployee())
      );
    },
    meta: {
      pageName: i18n.t("employees.modelName"),
      pageIcon: "employees.svg",
      userTypeToken: USER_TYPE.Employee,
      modelName: "employees",
      StorageSpacesRoute: "StorageSpacesEmployee",
    },
    props: true,
  },
  {
    path: "/users/students/:userToken?",
    name: "Students",
    component: () => import("./../views/users/Users"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudent())
      );
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      userTypeToken: USER_TYPE.Student,
      modelName: "students",
      StorageSpacesRoute: "StorageSpacesStudent",
    },
    props: true,
  },
  // {
  //   path: "/users/suppliers/:userToken?",
  //   name: "Suppliers",
  //   component: () => import("./../views/users/Users"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasSupplier())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("suppliers.modelName"),
  //     pageIcon: "suppliers.svg",
  //     userTypeToken: USER_TYPE.Supplier,
  //     modelName: "suppliers",
  //     StorageSpacesRoute: "StorageSpacesSupplier",
  //   },
  //   props: true,
  // },
  {
    path: "/users/parents/:userToken?",
    name: "Parents",
    component: () => import("./../views/users/Users"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasParent())
      );
    },
    meta: {
      pageName: i18n.t("parents.modelName"),
      pageIcon: "parents.svg",
      userTypeToken: USER_TYPE.Parent,
      modelName: "parents",
      StorageSpacesRoute: "StorageSpacesParent",
    },
    props: true,
  },
  // {
  //   path: "/users/clients/:userToken?",
  //   name: "Clients",
  //   component: () => import("./../views/users/Users"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasClient())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("clients.modelName"),
  //     pageIcon: "clients.svg",
  //     userTypeToken: USER_TYPE.Client,
  //     modelName: "clients",
  //     StorageSpacesRoute: "StorageSpacesClient",
  //   },
  //   props: true,
  // },
  //#endregion Users

  //#region UsersPersonalData
  {
    path: "/users/user-family/:userTypeToken/:userToken?",
    name: "UserFamilies",
    component: () =>
      import("./../views/usersPersonalData/userFamilies/UserFamilies.vue"),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserFamilies.modelName"),
      pageIcon: "UserFamilies.svg",
    },
    props: true,
  },
  {
    path: "/users/user-qualifications/:userTypeToken/:userToken?",
    name: "UserQualifications",
    component: () =>
      import(
        "./../views/usersPersonalData/userQualifications/UserQualifications.vue"
      ),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserQualifications.modelName"),
      pageIcon: "UserQualifications.svg",
    },
    props: true,
  },
  {
    path: "/users/user-scientific-Degrees/:userTypeToken/:userToken?",
    name: "UserScientificDegrees",
    component: () =>
      import(
        "./../views/usersPersonalData/userScientificDegrees/UserScientificDegrees.vue"
      ),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserScientificDegrees.modelName"),
      pageIcon: "UserScientificDegrees.svg",
    },
    props: true,
  },
  {
    path: "/users/user-trainingCourses/:userTypeToken/:userToken?",
    name: "UserTrainingCourses",
    component: () =>
      import(
        "./../views/usersPersonalData/userTrainingCourses/UserTrainingCourses.vue"
      ),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserTrainingCourses.modelName"),
      pageIcon: "UserTrainingCourses.svg",
    },
    props: true,
  },
  {
    path: "/users/user-experiences/:userTypeToken/:userToken?",
    name: "UserExperiences",
    component: () =>
      import(
        "./../views/usersPersonalData/userExperiences/UserExperiences.vue"
      ),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserExperiences.modelName"),
      pageIcon: "UserExperiences.svg",
    },
    props: true,
  },
  {
    path: "/users/user-injuries/:userTypeToken/:userToken?",
    name: "UserInjuries",
    component: () =>
      import("./../views/usersPersonalData/userInjuries/UserInjuries.vue"),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserInjuries.modelName"),
      pageIcon: "UserInjuries.svg",
    },
    props: true,
  },
  {
    path: "/users/user-operations/:userTypeToken/:userToken?",
    name: "UserOperations",
    component: () =>
      import("./../views/usersPersonalData/userOperations/UserOperations.vue"),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserOperations.modelName"),
      pageIcon: "UserOperations.svg",
    },
    props: true,
  },

  {
    path: "/users/user-personal-cards/:userTypeToken/:userToken?",
    name: "UserPersonalCards",
    component: () =>
      import(
        "./../views/usersPersonalData/userPersonalCards/UserPersonalCards.vue"
      ),
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("UserPersonalCards.modelName"),
      pageIcon: "UserPersonalCards.svg",
    },
    props: true,
  },
  //#endregion UsersPersonalData

  //#region Notifications
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("./../views/notifications/Notifications.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasNotification())
      );
    },
    meta: {
      pageName: i18n.t("Notifications.modelName"),
      pageIcon: "notifications.svg",
    },
  },
  //#endregion Notifications

  //#region Services
  {
    path: "/settings/services-and-counted-services/services",
    name: "Services",
    component: () => import("./../views/services/Services.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasService())
      );
    },
    meta: {
      pageName: i18n.t("Services.modelName"),
      pageIcon: "services.svg",
    },
  },
  //#endregion Services

  //#region CountedServices
  {
    path: "/settings/services-and-counted-services/countedServices",
    name: "CountedServices",
    component: () => import("./../views/countedServices/CountedServices.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasCountedService())
      );
    },
    meta: {
      pageName: i18n.t("CountedServices.modelName"),
      pageIcon: "countedServices.svg",
    },
  },
  //#endregion CountedServices

  //#region Products

  {
    path: "/products/price-quotations-1/info/:token",
    name: "PriceQuotationInfo",
    component: () =>
      import("./../views/products/priceQuotations/PriceQuotationInfo.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPriceQuotation1())
      );
    },
    meta: {
      pageName: i18n.t("PriceQuotationsInfo.modelName"),
      pageIcon: "PriceQuotations.svg",
    },
    props: true,
  },
  {
    path: "/products/price-quotations-1/prices-history/:priceQuotationDetailsToken",
    name: "QuotationPriceHistories",
    component: () =>
      import(
        "./../views/products/quotationPriceHistories/QuotationPriceHistories.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasQuotationPriceHistory())
      );
    },
    meta: {
      pageName: i18n.t("QuotationPriceHistories.modelName"),
      pageIcon: "QuotationPriceHistories.svg",
    },
    props: true,
  },

  {
    path: "/products/price-quotation-affiliate-operations/:priceQuotationDetailsToken?",
    name: "PriceQuotationAffiliateOperations",
    component: () =>
      import(
        "./../views/products/priceQuotationAffiliateOperations/PriceQuotationAffiliateOperations.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPriceQuotationAffiliateOperation())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("PriceQuotationAffiliateOperations.modelName"),
      pageIcon: "PriceQuotationAffiliateOperations.svg",
    },
  },

  //#endregion Products

  //#region SharedMediaFolders
  {
    path: "/shared-media-folders",
    name: "SharedMediaFolders",
    component: () =>
      import("./../views/sharedMediaFolders/SharedMediaFolders.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSharedMediaFolder())
      );
    },
    meta: {
      pageName: i18n.t("SharedMediaFolders.modelName"),
      pageIcon: "sharedMediaFolders.svg",
    },
  },
  //#endregion SharedMediaFolders

  //#region MediaPackageCodes
  {
    path: "/media-package-codes/:mediaPackageToken?",
    name: "MediaPackageCodes",
    component: () =>
      import("./../views/mediaPackageCodes/MediaPackageCodes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMediaPackageCode())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("MediaPackageCodes.modelName"),
      pageIcon: "mediaPackageCodes.svg",
    },
  },
  //#endregion MediaPackageCodes

  //#region SharedMedias
  {
    path: "/shared-media-folders/shared-medias/:sharedMediaFolderToken",
    name: "SharedMedias",
    component: () => import("./../views/sharedMedias/SharedMedias.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSharedMedia())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("SharedMedias.modelName"),
      pageIcon: "sharedMedias.svg",
    },
  },
  //#endregion SharedMedias

  //#region MediaPackages
  {
    path: "/media-packages",
    name: "MediaPackages",
    component: () => import("./../views/mediaPackages/MediaPackages.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMediaPackage())
      );
    },
    meta: {
      pageName: i18n.t("MediaPackages.modelName"),
      pageIcon: "mediaPackages.svg",
    },
  },
  //#endregion MediaPackages
  //#region Newss
  {
    path: "/news",
    name: "Newss",
    component: () => import("./../views/newss/Newss.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasNews())
      );
    },
    meta: {
      pageName: i18n.t("Newss.modelName"),
      pageIcon: "news.svg",
    },
  },
  //#endregion Services

  //#region Finance
  //#region Accounts
  {
    path: "/finance/accounts",
    name: "Accounts",
    component: () => import("./../views/finance/accounts/Accounts.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasAccount())
      );
    },
    meta: {
      pageName: i18n.t("Accounts.modelName"),
      pageIcon: "accounts.svg",
    },
  },
  //#endregion Accounts

  //#region AccountTransactions
  {
    path: "/finance/accounts/account-transactions",
    name: "AccountTransactions",
    component: () =>
      import("./../views/finance/accountTransactions/AccountTransactions.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasAccountTransaction())
      );
    },
    meta: {
      pageName: i18n.t("AccountTransactions.modelName"),
      pageIcon: "accountTransactions.svg",
    },
  },
  //#endregion AccountTransactions

  //#region CountedServiceTransactions
  {
    path: "/finance/counted-service-transactions",
    name: "CountedServiceTransactions",
    component: () =>
      import(
        "./../views/finance/countedServiceTransactions/CountedServiceTransactions.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasCountedServiceTransaction())
      );
    },
    meta: {
      pageName: i18n.t("CountedServiceTransactions.modelName"),
      pageIcon: "countedServiceTransactions.svg",
    },
  },
  //#endregion CountedServiceTransactions

  //#region Expenses
  {
    path: "/finance/expenses",
    name: "Expenses",
    component: () => import("./../views/finance/expenses/Expenses.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasExpense())
      );
    },
    meta: {
      pageName: i18n.t("Expenses.modelName"),
      pageIcon: "expenses.svg",
    },
  },
  //#endregion Expenses

  //#region Revenues
  {
    path: "/finance/revenues",
    name: "Revenues",
    component: () => import("./../views/finance/revenues/Revenues.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasRevenue())
      );
    },
    meta: {
      pageName: i18n.t("Revenues.modelName"),
      pageIcon: "revenues.svg",
    },
  },
  //#endregion Revenues

  {
    path: "/JoiningApplications/Debt/:userToken?",
    name: "Debts",
    component: () => import("./../views/joiningApplications/debts/Debts.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasDebt())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("Debts.modelName"),
      pageIcon: "debts.svg",
    },
  },
  {
    path: "/JoiningApplications/Installments/:userToken?",
    name: "Installments",
    component: () =>
      import("./../views/joiningApplications/installments/Installments.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInstallment())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("Installments.modelName"),
      pageIcon: "installments.svg",
    },
  },
  {
    path: "/JoiningApplications/InstallmentPayments/:userToken?",
    name: "InstallmentPayments",
    component: () =>
      import(
        "./../views/joiningApplications/installmentPayments/InstallmentPayments.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInstallmentPayment())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("InstallmentPayments.modelName"),
      pageIcon: "installmentPayments.svg",
    },
  },
  {
    path: "/JoiningApplications/ServiceEntitlements",
    name: "ServiceEntitlements",
    component: () =>
      import(
        "./../views/joiningApplications/serviceEntitlements/ServiceEntitlements.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasServiceEntitlement())
      );
    },
    meta: {
      pageName: i18n.t("ServiceEntitlements.modelName"),
      pageIcon: "serviceEntitlements.svg",
    },
  },
  //#endregion Finance

  //#region Alerts
  //#region Complaints
  {
    path: "/alerts/complaints",
    name: "Complaints",
    component: () => import("./../views/complaints/complaints/Complaints.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasComplaint())
      );
    },
    meta: {
      pageName: i18n.t("Complaints.modelName"),
      pageIcon: "complaints.svg",
    },
  },
  //#endregion Complaints

  //#region Reminders
  {
    path: "/alerts/reminders",
    name: "Reminders",
    component: () => import("./../views/reminders/Reminders.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasReminder())
      );
    },
    meta: {
      pageName: i18n.t("Reminders.modelName"),
      pageIcon: "reminders.svg",
    },
  },
  //#endregion Reminders

  //#endregion Alerts

  //#region ComplaintFollowUps
  {
    path: "/complaintFollowUps/:complaintToken",
    name: "ComplaintFollowUps",
    component: () =>
      import("./../views/complaints/complaintFollowUps/ComplaintFollowUps.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasComplaintFollowUp())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("ComplaintFollowUps.modelName"),
      pageIcon: "complaintFollowUps.svg",
    },
  },
  //#endregion ComplaintFollowUps

  //#region StorageSpaces
  //#region Main
  {
    path: "/storage-spaces/admins-egypt/:mainToken?",
    name: "StorageSpacesAdminsEgypt",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceAdminsEgypt())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.adminsEgypt"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.AdminsEgypt,
      modelName: "storageSpacesAdminsEgypt",
      userTypeToken: USER_TYPE.AdminsEgypt,
      storageSpacesMediaRoute: "StorageSpacesMediaAdminsEgypt",
    },
    props: true,
  },
  {
    path: "/storage-spaces/master-admin/:mainToken?",
    name: "StorageSpacesMasterAdmin",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.masterAdmin"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.MasterAdmin,
      modelName: "storageSpacesMasterAdmin",
      userTypeToken: USER_TYPE.MasterAdmin,
      storageSpacesMediaRoute: "StorageSpacesMediaMasterAdmin",
    },
    props: true,
  },
  {
    path: "/storage-spaces/employees/:mainToken?",
    name: "StorageSpacesEmployee",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceEmployee())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.employees"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Employee,
      modelName: "storageSpacesEmployees",
      userTypeToken: USER_TYPE.Employee,
      storageSpacesMediaRoute: "StorageSpacesMediaEmployee",
    },
    props: true,
  },
  {
    path: "/storage-spaces/students/:mainToken?",
    name: "StorageSpacesStudent",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceStudent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.students"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Student,
      modelName: "storageSpacesStudents",
      userTypeToken: USER_TYPE.Student,
      storageSpacesMediaRoute: "StorageSpacesMediaStudent",
    },
    props: true,
  },
  {
    path: "/storage-spaces/suppliers/:mainToken?",
    name: "StorageSpacesSupplier",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceSupplier())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.suppliers"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Supplier,
      modelName: "storageSpacesSuppliers",
      userTypeToken: USER_TYPE.Supplier,
      storageSpacesMediaRoute: "StorageSpacesMediaSupplier",
    },
    props: true,
  },
  {
    path: "/storage-spaces/parents/:mainToken?",
    name: "StorageSpacesParent",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceParent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.parents"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Parent,
      modelName: "storageSpacesParents",
      userTypeToken: USER_TYPE.Parent,
      storageSpacesMediaRoute: "StorageSpacesMediaParent",
    },
    props: true,
  },
  {
    path: "/storage-spaces/clients/:mainToken?",
    name: "StorageSpacesClient",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceClient())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.clients"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Client,
      modelName: "storageSpacesClients",
      userTypeToken: USER_TYPE.Client,
      storageSpacesMediaRoute: "StorageSpacesMediaClient",
    },
    props: true,
  },
  //#region StorageSpacesPlace
  {
    path: "/storage-spaces/MasterAdmin/:mainToken?",
    name: "StorageSpacesPlaceMasterAdmin",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceMasterAdmin,
      modelName: "storageSpacesPlaceMasterAdmin",
      userTypeToken: USER_TYPE.MasterAdmin,
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceMasterAdmin",
    },
    props: true,
  },
  {
    path: "/storage-spaces/Employee/:mainToken?",
    name: "StorageSpacesPlaceEmployees",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceEmployee())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceEmployee,
      modelName: "storageSpacesPlaceEmployees",
      userTypeToken: USER_TYPE.Employee,
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceEmployees",
    },
    props: true,
  },
  {
    path: "/storage-spaces/Student/:mainToken?",
    name: "StorageSpacesPlaceStudents",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceStudent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceStudent,
      modelName: "storageSpacesPlaceStudents",
      userTypeToken: USER_TYPE.Student,
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceStudents",
    },
    props: true,
  },
  {
    path: "/storage-spaces/Supplier/:mainToken?",
    name: "StorageSpacesPlaceSuppliers",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceSupplier())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceSupplier,
      modelName: "storageSpacesPlaceSuppliers",
      userTypeToken: USER_TYPE.Supplier,
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceSuppliers",
    },
    props: true,
  },
  {
    path: "/storage-spaces/Parent/:mainToken?",
    name: "StorageSpacesPlaceParents",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceParent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceParent,
      modelName: "storageSpacesPlaceParents",
      userTypeToken: USER_TYPE.Parent,
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceParents",
    },
    props: true,
  },
  {
    path: "/storage-spaces/Client/:mainToken?",
    name: "StorageSpacesPlaceClients",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceClient())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceClient,
      modelName: "storageSpacesPlaceClients",
      userTypeToken: USER_TYPE.Client,
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceClients",
    },
    props: true,
  },
  {
    path: "/storage-spaces/Other/:mainToken?",
    name: "StorageSpacesPlaceOthers",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpacePlaceOther())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.places"),
      pageIcon: "StorageSpaces.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceOther,
      modelName: "storageSpacesPlaceOthers",
      userTypeToken: "",
      storageSpacesMediaRoute: "StorageSpacesMediaPlaceOthers",
    },
    props: true,
  },
  //#endregion StorageSpacesPlace
  {
    path: "/storage-spaces/educational-groups/:mainToken?",
    name: "StorageSpacesEducationalGroup",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceEducationalGroup())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.EducationalGroup"),
      pageIcon: "educationalGroupMedia.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.EducationalGroup,
      modelName: "storageSpacesEducationalGroup",
      userTypeToken: "",
      storageSpacesMediaRoute: "StorageSpacesMediaEducationalGroup",
    },
    props: true,
  },
  {
    path: "/storage-spaces/educational-categories/:mainToken?",
    name: "StorageSpacesEducationalCategory",
    component: () => import("./../views/storageSpaces/StorageSpaces.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceEducationalCategory())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.EducationalCategory"),
      pageIcon: "educationalGroupMedia.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.EducationalCategory,
      modelName: "storageSpacesEducationalCategory",
      userTypeToken: "",
      storageSpacesMediaRoute: "StorageSpacesMediaEducationalCategory",
    },
    props: true,
  },
  //#endregion Main

  //#region Folders
  // {
  //   path: "/storage-spaces/folder/employees/:mainToken?/:storageSpaceParentToken?",
  //   name: "StorageSpacesFolderEmployee",
  //   component: () => import("./../views/storageSpaces/StorageSpacesFolder.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasStorageSpaceEmployee())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("StorageSpaces.folder.employees"),
  //     pageIcon: "folder.svg",
  //     storageSpaceTypeToken: STORAGE_SPACE_TYPE.Employee,
  //     storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.Employee,
  //     modelName: "storageSpacesEmployees",
  //     userTypeToken: USER_TYPE.Employee,
  //     currentTab: "folders",
  //   },
  //   props: true,
  // },
  //#endregion Folders

  //#region Medias
  {
    path: "/storage-spaces/media/admins-egypt/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaAdminsEgypt",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaAdminsEgypt())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.adminsEgypt"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.AdminsEgypt,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.AdminsEgypt,
      userTypeToken: USER_TYPE.AdminsEgypt,
      modelName: "storageSpaceMediasAdminsEgypt",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/master-admin/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaMasterAdmin",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.masterAdmin"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.MasterAdmin,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.MasterAdmin,
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: "storageSpaceMediasMasterAdmin",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/employees/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaEmployee",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaEmployee())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.employees"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Employee,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.Employee,
      modelName: "storageSpaceMediasEmployees",
      userTypeToken: USER_TYPE.Employee,
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/students/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaStudent",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaStudent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.students"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Student,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.Student,
      modelName: "storageSpaceMediasStudents",
      userTypeToken: USER_TYPE.Student,
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/suppliers/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaSupplier",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaSupplier())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.suppliers"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Supplier,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.Supplier,
      modelName: "storageSpaceMediasSuppliers",
      userTypeToken: USER_TYPE.Supplier,
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/parents/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaParent",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaParent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.parents"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Parent,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.Parent,
      modelName: "storageSpaceMediasParents",
      userTypeToken: USER_TYPE.Parent,
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/clients/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaClient",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaClient())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.clients"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.Client,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.Client,
      modelName: "storageSpaceMediasClients",
      userTypeToken: USER_TYPE.Client,
    },
    props: true,
  },
  //#region StorageSpacesMediaPlace
  {
    path: "/storage-spaces/media/MasterAdmin/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceMasterAdmin",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceMasterAdmin,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceMasterAdmin,
      modelName: "storageSpaceMediasPlaceMasterAdmin",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/Employee/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceEmployees",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceEmployee())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceEmployee,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceEmployee,
      modelName: "storageSpaceMediasPlaceEmployees",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/Student/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceStudents",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceStudent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceStudent,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceStudent,
      modelName: "storageSpaceMediasPlaceStudents",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/Supplier/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceSuppliers",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceSupplier())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceSupplier,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceSupplier,
      modelName: "storageSpaceMediasPlaceSuppliers",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/Parent/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceParents",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceParent())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceParent,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceParent,
      modelName: "storageSpaceMediasPlaceParents",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/Client/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceClients",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceClient())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceClient,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceClient,
      modelName: "storageSpaceMediasPlaceClients",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/Other/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaPlaceOthers",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaPlaceOther())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.places"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.PlaceOther,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.PlaceOther,
      modelName: "storageSpaceMediasPlaceOthers",
      userTypeToken: "",
    },
    props: true,
  },
  //#endregion StorageSpacesMediaPlace
  {
    path: "/storage-spaces/media/educational-groups/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaEducationalGroup",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStorageSpaceMediaEducationalGroup())
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.EducationalGroup"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.EducationalGroup,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.EducationalGroup,
      modelName: "storageSpaceMediasEducationalGroup",
      userTypeToken: "",
    },
    props: true,
  },
  {
    path: "/storage-spaces/media/educational-categories/:mainToken?/:storageSpaceToken?",
    name: "StorageSpacesMediaEducationalCategory",
    component: () =>
      import("./../views/storageSpaceMedias/StorageSpacesMedia.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(
          privilegeHelper.hasStorageSpaceMediaEducationalCategory()
        )
      );
    },
    meta: {
      pageName: i18n.t("StorageSpaces.media.EducationalCategory"),
      pageIcon: "media.svg",
      storageSpaceTypeToken: STORAGE_SPACE_TYPE.EducationalCategory,
      storageSpaceMediaTypeToken: STORAGE_SPACE_Media_TYPE.EducationalCategory,
      modelName: "storageSpaceMediasEducationalCategory",
      userTypeToken: "",
    },
    props: true,
  },
  //#endregion Medias

  //#endregion StorageSpaces

  //#region InterestsAndFollowUps
  //#region Interests
  {
    path: "/interests",
    name: "Interests",
    component: () => import("./../views/followUps/interests/Interests.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInterest())
      );
    },
    meta: {
      pageName: i18n.t("Interests.modelName"),
      pageIcon: "interests.svg",
    },
  },
  //#endregion Interests
  //#region InterestFollowUps
  {
    path: "/interest-follow-ups/:interestToken?/:mainToken?/:followUpTypeToken?",
    name: "InterestFollowUps",
    component: () =>
      import("./../views/followUps/interestFollowUps/InterestFollowUps.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInterestFollowUp())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("InterestFollowUps.modelName"),
      pageIcon: "interestFollowUps.svg",
    },
  },
  //#endregion InterestFollowUps

  //#region UserInterests
  {
    path: "/user-interests",
    name: "UserInterests",
    component: () => import("./../views/followUps/userInterests/UserInterests"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudent())
      );
    },
    meta: {
      pageName: i18n.t("UserInterests.modelName"),
      pageIcon: "UserInterests.svg",
    },
    props: true,
  },
  {
    path: "/user-interests/user-systeam-interests/:userToken?",
    name: "UserSysteamInterests",
    component: () =>
      import("./../views/followUps/userSysteamInterests/UserSysteamInterests"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudent())
      );
    },
    meta: {
      pageName: i18n.t("UserSysteamInterests.modelName"),
      pageIcon: "UserSysteamInterests.svg",
    },
    props: true,
  },
  {
    path: "/user-interests/user-other-interests/:userToken?",
    name: "UserOtherInterests",
    component: () =>
      import("./../views/followUps/userOtherInterests/UserOtherInterests"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudent())
      );
    },
    meta: {
      pageName: i18n.t("UserOtherInterests.modelName"),
      pageIcon: "UserOtherInterests.svg",
    },
    props: true,
  },
  //#endregion UserInterests

  //#region FollowInterests
  {
    path: "/user-interests/follow-interests/:userToken?/:userSysteamInterestToken?/:userOtherInterestToken?",
    name: "FollowInterests",
    component: () =>
      import("./../views/followUps/followInterests/FollowInterests.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudent())
      );
    },
    meta: {
      pageName: i18n.t("FollowInterests.modelName"),
      pageIcon: "followInterests.svg",
    },
    props: true,
  },
  //#endregion FollowInterests

  //#endregion InterestsAndFollowUps

  //#region SystemStructure
  //#region systemComponents

  //#endregion systemComponents

  //#region systemComponentsHierarchies

  //#endregion systemComponentsHierarchies

  {
    path: "/system-components-hierarchies-places",
    name: "SystemComponentsHierarchyPlace",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentsHierarchyPlace())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponentsHierarchies.modelName"),
      pageIcon: "systemComponentsHierarchies.svg",
      systemTypeToken: SYSTEM_TYPE.Place,
      modelName: "systemComponentsHierarchyPlace",
    },
    props: true,
  },
  {
    path: "/system-components-places",
    name: "SystemComponentPlace",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponents/SystemComponents.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentPlace())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponents.modelName"),
      pageIcon: "systemComponents.svg",
      systemTypeToken: SYSTEM_TYPE.Place,
      modelName: "systemComponentPlace",
    },
    props: true,
  },

  //#endregion SystemStructure

  //#region Places
  {
    path: "/places/master-admin/:parentPlaceToken?",
    name: "PlaceMasterAdmin",
    component: () => import("./../views/places/Places.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPlaceMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("Places.modelName"),
      pageIcon: "places.svg",
      placeTypeToken: PLACE_TYPE_TOKENS.MasterAdmin,
      modelName: "placeMasterAdmin",
    },
    props: true,
  },
  {
    path: "/places/employees/:parentPlaceToken?",
    name: "PlaceEmployees",
    component: () => import("./../views/places/Places.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPlaceEmployee())
      );
    },
    meta: {
      pageName: i18n.t("Places.modelName"),
      pageIcon: "places.svg",
      placeTypeToken: PLACE_TYPE_TOKENS.Employee,
      modelName: "placeEmployees",
    },
    props: true,
  },
  {
    path: "/places/students/:parentPlaceToken?",
    name: "PlaceStudents",
    component: () => import("./../views/places/Places.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPlaceStudent())
      );
    },
    meta: {
      pageName: i18n.t("Places.modelName"),
      pageIcon: "places.svg",
      placeTypeToken: PLACE_TYPE_TOKENS.Student,
      modelName: "placeStudents",
    },
    props: true,
  },
  // {
  //   path: "/places/suppliers/:parentPlaceToken?",
  //   name: "PlaceSuppliers",
  //   component: () => import("./../views/places/Places.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasPlaceSupplier())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Places.modelName"),
  //     pageIcon: "places.svg",
  //     placeTypeToken: PLACE_TYPE_TOKENS.Supplier,
  //     modelName: "placeSuppliers",
  //   },
  //   props: true,
  // },
  {
    path: "/places/parents/:parentPlaceToken?",
    name: "PlaceParents",
    component: () => import("./../views/places/Places.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPlaceParent())
      );
    },
    meta: {
      pageName: i18n.t("Places.modelName"),
      pageIcon: "places.svg",
      placeTypeToken: PLACE_TYPE_TOKENS.Parent,
      modelName: "placeParents",
    },
    props: true,
  },
  // {
  //   path: "/places/clients/:parentPlaceToken?",
  //   name: "PlaceClients",
  //   component: () => import("./../views/places/Places.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasPlaceClient())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Places.modelName"),
  //     pageIcon: "places.svg",
  //     placeTypeToken: PLACE_TYPE_TOKENS.Client,
  //     modelName: "placeClients",
  //   },
  //   props: true,
  // },
  {
    path: "/places/others/:parentPlaceToken?",
    name: "PlaceOthers",
    component: () => import("./../views/places/Places.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPlaceOther())
      );
    },
    meta: {
      pageName: i18n.t("Places.modelName"),
      pageIcon: "places.svg",
      placeTypeToken: PLACE_TYPE_TOKENS.Other,
      modelName: "placeOthers",
    },
    props: true,
  },
  //#endregion Places

  //#region PlaceUsers
  {
    path: "/place-user/:placeTypeToken?/:placeToken?/:placeModelName?/:userTypeToken?/:userToken?/:userModelName?",
    name: "PlaceUser",
    component: () => import("./../views/placeUsers/PlaceUsers.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPlaceUser())
      );
    },
    meta: {
      pageName: i18n.t("PlaceUsers.modelName"),
      pageIcon: "placeUsers.svg",
    },
    props: true,
  },
  //#endregion PlaceUsers

  //#region Settings

  //#region SettingsOther
  {
    path: "/settings/settings-others",
    name: "SettingsOthers",
    component: () =>
      import("./../views/settings/settingsOthers/SettingsOthers.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSettingsOthers())
      );
    },
    meta: {
      pageName: i18n.t("settings-other"),
      pageIcon: "settings-other.svg",
    },
  },

  //#region Qualifications
  {
    path: "/settings/settings-others/qualifications",
    name: "Qualifications",
    component: () =>
      import(
        "./../views/settings/settingsOthers/qualifications/Qualifications.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasQualification())
      );
    },
    meta: {
      pageName: i18n.t("Qualifications.modelName"),
      pageIcon: "qualifications.svg",
    },
  },
  //#endregion Qualifications

  //#region EducationalStages
  {
    path: "/settings/settings-others/educational-stages",
    name: "EducationalStages",
    component: () =>
      import(
        "./../views/settings/settingsOthers/educationalStages/EducationalStages.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEducationalStage())
      );
    },
    meta: {
      pageName: i18n.t("EducationalStages.modelName"),
      pageIcon: "educationalStages.svg",
    },
  },
  //#endregion EducationalStages

  //#region InjuryTypes
  {
    path: "/settings/settings-others/injury-types",
    name: "InjuryTypes",
    component: () =>
      import("./../views/settings/settingsOthers/injuryTypes/InjuryTypes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInjuryType())
      );
    },
    meta: {
      pageName: i18n.t("InjuryTypes.modelName"),
      pageIcon: "injuryTypes.svg",
    },
  },
  //#endregion InjuryTypes

  //#region OperationTypes
  {
    path: "/settings/settings-others/operation-types",
    name: "OperationTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/operationTypes/OperationTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasOperationType())
      );
    },
    meta: {
      pageName: i18n.t("OperationTypes.modelName"),
      pageIcon: "operationTypes.svg",
    },
  },
  //#endregion OperationTypes

  //#region EmployeePayrollSettings
  // {
  //   path: "/settings/settings-others/employee-sayroll-settings/:educationalGroupToken?/:userToken?",
  //   name: "EmployeePayrollSettings",
  //   component: () =>
  //     import(
  //       "./../views/settings/settingsOthers/employeePayrollSettings/EmployeePayrollSettings.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasEmployeePayrollSetting())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("EmployeePayrollSettings.modelName"),
  //     pageIcon: "employeePayrollSettings.svg",
  //   },
  // },
  //#endregion EmployeePayrollSettings

  //#region Reports
  {
    path: "/reports",
    name: "Reports",
    component: () => import("./../views/reports/Reports.vue"),
    // beforeEnter: (to, from, next) => {
    //   handlePrivilege(to, from, next);
    //   // checkPrivilege(privilegeHelper.hasReport())
    // },
    meta: {
      pageName: i18n.t("Reports.modelName"),
      pageIcon: "reports.svg",
    },
  },
  //#endregion Reports

  //#region Religions
  {
    path: "/settings/settings-others/religions",
    name: "Religions",
    component: () =>
      import("./../views/settings/settingsOthers/religions/Religions.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasReligion())
      );
    },
    meta: {
      pageName: i18n.t("Religions.modelName"),
      pageIcon: "religions.svg",
    },
  },
  //#endregion Religions

  //#region InstallmentBatchTypes
  {
    path: "/settings/settings-others/installmentBatchTypes",
    name: "InstallmentBatchTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/installmentBatchTypes/InstallmentBatchTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInstallmentBatchType())
      );
    },
    meta: {
      pageName: i18n.t("InstallmentBatchTypes.modelName"),
      pageIcon: "installmentBatchTypes.svg",
    },
  },
  //#endregion InstallmentBatchTypes

  //#region PersonalCardTypes
  {
    path: "/settings/settings-others/personalCardTypes",
    name: "PersonalCardTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/personalCardTypes/PersonalCardTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPersonalCardType())
      );
    },
    meta: {
      pageName: i18n.t("PersonalCardTypes.modelName"),
      pageIcon: "personalCardTypes.svg",
    },
  },
  //#endregion PersonalCardTypes

  //#region JobGrades
  {
    path: "/settings/settings-others/jobGrades/:parentJobGradeToken?",
    name: "JobGrades",
    component: () =>
      import("./../views/settings/settingsOthers/jobGrades/JobGrades.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasJobGrade())
      );
    },
    meta: {
      pageName: i18n.t("JobGrades.modelName"),
      pageIcon: "jobGrade.svg",
    },
    props: true,
  },

  {
    path: "/system-components-hierarchies-job-grade",
    name: "SystemComponentsHierarchyJobGrade",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentsHierarchyJobGrade())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponentsHierarchies.modelName"),
      pageIcon: "systemComponentsHierarchies.svg",
      systemTypeToken: SYSTEM_TYPE.JobGrade,
      modelName: "systemComponentsHierarchyJobGrade",
    },
    props: true,
  },
  {
    path: "/system-components-job-grade",
    name: "SystemComponentJobGrade",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponents/SystemComponents.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentJobGrade())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponents.modelName"),
      pageIcon: "systemComponents.svg",
      systemTypeToken: SYSTEM_TYPE.JobGrade,
      modelName: "systemComponentJobGrade",
    },
    props: true,
  },
  //#endregion JobGrades

  //#region ClassificationDegrees
  {
    path: "/settings/settings-others/classificationDegrees",
    name: "ClassificationDegrees",
    component: () =>
      import(
        "./../views/settings/settingsOthers/classificationDegrees/ClassificationDegrees.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasClassificationDegree())
      );
    },
    meta: {
      pageName: i18n.t("ClassificationDegrees.modelName"),
      pageIcon: "classificationDegrees.svg",
    },
  },
  //#endregion ClassificationDegrees

  //#region ScientificDegrees
  {
    path: "/settings/settings-others/scientificDegrees",
    name: "ScientificDegrees",
    component: () =>
      import(
        "./../views/settings/settingsOthers/scientificDegrees/ScientificDegrees.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasScientificDegree())
      );
    },
    meta: {
      pageName: i18n.t("ScientificDegrees.modelName"),
      pageIcon: "scientificDegrees.svg",
    },
  },
  //#endregion ScientificDegrees

  //#region RelativeRelationTypes
  {
    path: "/settings/settings-others/relativeRelationTypes",
    name: "RelativeRelationTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/relativeRelationTypes/RelativeRelationTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasRelativeRelationType())
      );
    },
    meta: {
      pageName: i18n.t("RelativeRelationTypes.modelName"),
      pageIcon: "RelativeRelationTypes.svg",
    },
  },
  //#endregion RelativeRelationTypes

  //#region GeneralJobs
  {
    path: "/settings/settings-others/generalJobs",
    name: "GeneralJobs",
    component: () =>
      import("./../views/settings/settingsOthers/generalJobs/GeneralJobs.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasGeneralJob())
      );
    },
    meta: {
      pageName: i18n.t("GeneralJobs.modelName"),
      pageIcon: "generalJobs.svg",
    },
  },
  //#endregion GeneralJobs

  //#region Colors
  {
    path: "/settings/settings-others/colors",
    name: "Colors",
    component: () =>
      import("./../views/settings/settingsOthers/colors/Colors.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasColor())
      );
    },
    meta: {
      pageName: i18n.t("Colors.modelName"),
      pageIcon: "colors.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion Colors

  //#region PriorityTypes
  {
    path: "/settings/settings-others/priorityTypes",
    name: "PriorityTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/priorityTypes/PriorityTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPriorityType())
      );
    },
    meta: {
      pageName: i18n.t("PriorityTypes.modelName"),
      pageIcon: "priorityTypes.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion PriorityTypes

  //#region CommunicationTypes
  {
    path: "/settings/settings-others/communication-types",
    name: "CommunicationTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/communicationTypes/CommunicationTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasCommunicationType())
      );
    },
    meta: {
      pageName: i18n.t("CommunicationTypes.modelName"),
      pageIcon: "communicationTypes.svg",
    },
  },
  //#endregion ComplaintTypes

  //#region ComplaintTypes
  {
    path: "/settings/settings-others/complaintTypes",
    name: "ComplaintTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/complaintTypes/ComplaintTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasComplaintType())
      );
    },
    meta: {
      pageName: i18n.t("ComplaintTypes.modelName"),
      pageIcon: "complaintTypes.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion ComplaintTypes

  //#region NewsCategories
  {
    path: "/settings/settings-others/newsCategories",
    name: "NewsCategories",
    component: () =>
      import(
        "./../views/settings/settingsOthers/newsCategories/NewsCategories.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasNewsCategory())
      );
    },
    meta: {
      pageName: i18n.t("NewsCategories.modelName"),
      pageIcon: "newsCategories.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion NewsCategories

  //#region ComplaintSectors
  {
    path: "/settings/settings-others/complaintSectors",
    name: "ComplaintSectors",
    component: () =>
      import(
        "./../views/settings/settingsOthers/complaintSectors/ComplaintSectors.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasComplaintSector())
      );
    },
    meta: {
      pageName: i18n.t("ComplaintSectors.modelName"),
      pageIcon: "complaintSectors.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion ComplaintSectors

  //#region ReminderPlans
  {
    path: "/settings/settings-others/reminderPlans",
    name: "ReminderPlans",
    component: () =>
      import(
        "./../views/settings/settingsOthers/reminderPlans/ReminderPlans.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasReminderPlan())
      );
    },
    meta: {
      pageName: i18n.t("ReminderPlans.modelName"),
      pageIcon: "reminderPlans.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion ReminderPlans

  //#region ExpensesTypes
  {
    path: "/finance/expenses/expenses-types",
    name: "ExpensesTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/expensesTypes/ExpensesTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasExpensesType())
      );
    },
    meta: {
      pageName: i18n.t("ExpensesTypes.modelName"),
      pageIcon: "expensesTypes.svg",
    },
  },
  //#endregion ExpensesTypes

  //#region RevenuesTypes
  {
    path: "/finance/revenues",
    name: "RevenuesTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/revenuesTypes/RevenuesTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasRevenuesType())
      );
    },
    meta: {
      pageName: i18n.t("RevenuesTypes.modelName"),
      pageIcon: "revenuesTypes.svg",
    },
  },
  //#endregion RevenuesTypes

  //#region PaymentMethods
  {
    path: "/settings/settings-others/paymentMethods",
    name: "PaymentMethods",
    component: () =>
      import(
        "./../views/settings/settingsOthers/paymentMethods/PaymentMethods.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPaymentMethod())
      );
    },
    meta: {
      pageName: i18n.t("PaymentMethods.modelName"),
      pageIcon: "paymentMethods.svg",
    },
  },
  //#endregion PaymentMethods

  //#region MilitaryStatusTypes
  {
    path: "/settings/settings-others/militaryStatusTypes",
    name: "MilitaryStatusTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/militaryStatusTypes/MilitaryStatusTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMilitaryStatusType())
      );
    },
    meta: {
      pageName: i18n.t("MilitaryStatusTypes.modelName"),
      pageIcon: "militaryStatus.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion MilitaryStatusTypes

  //#region BloodTypes
  {
    path: "/settings/settings-others/bloodTypes",
    name: "BloodTypes",
    component: () =>
      import("./../views/settings/settingsOthers/bloodTypes/BloodTypes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasBloodType())
      );
    },
    meta: {
      pageName: i18n.t("BloodTypes.modelName"),
      pageIcon: "BloodTypes.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion BloodTypes

  //#region Certificates
  {
    path: "/settings/settings-others/Certificates",
    name: "Certificates",
    component: () =>
      import(
        "./../views/settings/settingsOthers/certificates/Certificates.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasCertificate())
      );
    },
    meta: {
      pageName: i18n.t("Certificates.modelName"),
      pageIcon: "certificates.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion Certificates

  // #region Countries
  {
    path: "/settings/settings-others/countries",
    name: "Countries",
    component: () =>
      import("./../views/settings/settingsOthers/countries/Countries.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasCountry())
      );
    },
    meta: {
      pageName: i18n.t("Countries.modelName"),
      pageIcon: "countries.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion Countries

  //#region Governorates
  // {
  //   path: "/settings/settings-others/Governorates",
  //   name: "Governorates",
  //   component: () =>
  //     import(
  //       "./../views/settings/settingsOthers/governorates/Governorates.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasGovernorate())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Governorates.modelName"),
  //     pageIcon: "governorates.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  // {
  //   path: "/settings/settings-others/governorates/add",
  //   name: "GovernorateAdd",
  //   component: () =>
  //     import(
  //       "./../views/settings/settingsOthers/governorates/GovernorateAdd.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasGovernorateAdd())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Governorates.add"),
  //     pageIcon: "governorates.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  // {
  //   path: "/settings/settings-others/governorates/edit",
  //   name: "GovernorateEdit",
  //   component: () =>
  //     import(
  //       "./../views/settings/settingsOthers/governorates/GovernorateEdit.vue"
  //     ),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasGovernorateEdit())
  //     );
  //   },
  //   props: true,
  //   meta: {
  //     pageName: i18n.t("Governorates.edit"),
  //     pageIcon: "governorates.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  //#endregion Governorates

  //#region Cities
  // {
  //   path: "/settings/settings-others/Cities",
  //   name: "Cities",
  //   component: () =>
  //     import("./../views/settings/settingsOthers/cities/Cities.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasCity())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Cities.modelName"),
  //     pageIcon: "cities.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  // {
  //   path: "/settings/settings-others/cities/add",
  //   name: "CityAdd",
  //   component: () =>
  //     import("./../views/settings/settingsOthers/cities/CityAdd.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasCityAdd())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Cities.add"),
  //     pageIcon: "cities.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  // {
  //   path: "/settings/settings-others/cities/edit",
  //   name: "CityEdit",
  //   component: () =>
  //     import("./../views/settings/settingsOthers/cities/CityEdit.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasCityEdit())
  //     );
  //   },
  //   props: true,
  //   meta: {
  //     pageName: i18n.t("Cities.edit"),
  //     pageIcon: "cities.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  //#endregion Cities

  //#region Districts
  // {
  //   path: "/settings/settings-others/Districts",
  //   name: "Districts",
  //   component: () =>
  //     import("./../views/settings/settingsOthers/districts/Districts.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasDistrict())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Districts.modelName"),
  //     pageIcon: "districts.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  // {
  //   path: "/settings/settings-others/districts/add",
  //   name: "DistrictAdd",
  //   component: () =>
  //     import("./../views/settings/settingsOthers/districts/DistrictAdd.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasDistrictAdd())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("Districts.add"),
  //     pageIcon: "districts.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  // {
  //   path: "/settings/settings-others/districts/edit",
  //   name: "DistrictEdit",
  //   component: () =>
  //     import("./../views/settings/settingsOthers/districts/DistrictEdit.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasDistrictEdit())
  //     );
  //   },
  //   props: true,
  //   meta: {
  //     pageName: i18n.t("Districts.edit"),
  //     pageIcon: "districts.svg",
  //     currentPage: "theSettings",
  //     currentSubPage: "settings-others",
  //   },
  // },
  //#endregion Districts

  //#region SocialStatuses
  {
    path: "/settings/settings-others/SocialStatuses",
    name: "SocialStatuses",
    component: () =>
      import(
        "./../views/settings/settingsOthers/socialStatuses/SocialStatuses.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSocialStatuse())
      );
    },
    meta: {
      pageName: i18n.t("SocialStatuses.modelName"),
      pageIcon: "socialStatuses.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion SocialStatuses

  //#region Specialties
  {
    path: "/settings/settings-others/Specialties",
    name: "Specialties",
    component: () =>
      import("./../views/settings/settingsOthers/specialties/Specialties.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSpecialty())
      );
    },
    meta: {
      pageName: i18n.t("Specialties.modelName"),
      pageIcon: "specialties.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion Specialties

  //#region Bank
  {
    path: "/settings/settings-others/Banks",
    name: "Banks",
    component: () =>
      import("./../views/settings/settingsOthers/banks/Banks.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasBank())
      );
    },
    meta: {
      pageName: i18n.t("Banks.modelName"),
      pageIcon: "banks.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },
  //#endregion Banks

  //#region KnownMethod
  {
    path: "/settings/settings-others/known-methods",
    name: "KnownMethods",
    component: () =>
      import(
        "./../views/settings/settingsOthers/knownMethods/KnownMethods.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasKnownMethod())
      );
    },
    meta: {
      pageName: i18n.t("KnownMethods.modelName"),
      pageIcon: "knownMethods.svg",
    },
  },
  //#endregion KnownMethods

  //#region GeographicalDistributions
  {
    path: "/settings/settings-others/GeographicalDistributions/:parentGeographicalDistributionToken?",
    name: "GeographicalDistributions",
    component: () =>
      import(
        "./../views/settings/settingsOthers/geographicalDistributions/GeographicalDistributions.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasGeographicalDistribution())
      );
    },
    meta: {
      pageName: i18n.t("GeographicalDistributions.modelName"),
      pageIcon: "geographicalDistributions.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
    props: true,
  },

  {
    path: "/system-components-hierarchies-geographical-distributions",
    name: "SystemComponentsHierarchyGeographicalDistribution",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(
          privilegeHelper.hasSystemComponentsHierarchyGeographicalDistribution()
        )
      );
    },
    meta: {
      pageName: i18n.t("SystemComponentsHierarchies.modelName"),
      pageIcon: "systemComponentsHierarchies.svg",
      systemTypeToken: SYSTEM_TYPE.GeographicalDistribution,
      modelName: "systemComponentsHierarchyGeographicalDistribution",
    },
    props: true,
  },
  {
    path: "/system-components-geographical-distributions",
    name: "SystemComponentGeographicalDistribution",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponents/SystemComponents.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(
          privilegeHelper.hasSystemComponentGeographicalDistribution()
        )
      );
    },
    meta: {
      pageName: i18n.t("SystemComponents.modelName"),
      pageIcon: "systemComponents.svg",
      systemTypeToken: SYSTEM_TYPE.GeographicalDistribution,
      modelName: "systemComponentGeographicalDistribution",
    },
    props: true,
  },
  //#endregion GeographicalDistributions

  //#region BodyParts
  {
    path: "/settings/settings-others/BodyParts/:parentBodyPartToken?",
    name: "BodyParts",
    component: () =>
      import("./../views/settings/settingsOthers/bodyParts/BodyParts.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasBodyPart())
      );
    },
    meta: {
      pageName: i18n.t("BodyParts.modelName"),
      pageIcon: "bodyParts.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
    props: true,
  },

  {
    path: "/system-components-hierarchies-geographical-distributions",
    name: "SystemComponentsHierarchyBodyPart",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponentsHierarchies/SystemComponentsHierarchies.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentsHierarchyBodyPart())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponentsHierarchies.modelName"),
      pageIcon: "systemComponentsHierarchies.svg",
      systemTypeToken: SYSTEM_TYPE.BodyPart,
      modelName: "systemComponentsHierarchyBodyPart",
    },
    props: true,
  },
  {
    path: "/system-components-geographical-distributions",
    name: "SystemComponentBodyPart",
    component: () =>
      import(
        "../views/systemConfiguration/systemComponents/SystemComponents.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasSystemComponentBodyPart())
      );
    },
    meta: {
      pageName: i18n.t("SystemComponents.modelName"),
      pageIcon: "systemComponents.svg",
      systemTypeToken: SYSTEM_TYPE.BodyPart,
      modelName: "systemComponentBodyPart",
    },
    props: true,
  },
  //#endregion BodyParts

  //#region InsuranceCompanies
  {
    path: "/settings/settings-others/insuranceCompanies",
    name: "InsuranceCompanies",
    component: () =>
      import(
        "./../views/settings/settingsOthers/insuranceCompanies/InsuranceCompanies.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasInsuranceCompany())
      );
    },
    meta: {
      pageName: i18n.t("InsuranceCompanies.modelName"),
      pageIcon: "insuranceCompanies.svg",
      currentPage: "theSettings",
      currentSubPage: "settings-others",
    },
  },

  //#endregion InsuranceCompanies

  //#region GradingPlans
  {
    path: "/settings/settings-others/gradingPlans",
    name: "GradingPlans",
    component: () =>
      import(
        "./../views/settings/settingsOthers/gradingPlans/GradingPlans.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasGradingPlan())
      );
    },
    meta: {
      pageName: i18n.t("GradingPlans.modelName"),
      pageIcon: "GradingPlans.svg",
    },
  },
  //#endregion GradingPlans

  //#region PriceLists
  {
    path: "/educational/price-list/:educationalCategoryToken?",
    name: "PriceLists",
    component: () =>
      import("./../views/settings/settingsOthers/priceLists/PriceLists.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasPriceList())
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("PriceLists.modelName"),
      pageIcon: "PriceLists.svg",
    },
  },
  //#endregion PriceLists

  //#region ServiceTypes
  {
    path: "/settings/services-and-counted-services/ServiceType",
    name: "ServiceTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/serviceTypes/ServiceTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasServiceType())
      );
    },
    meta: {
      pageName: i18n.t("ServiceTypes.modelName"),
      pageIcon: "serviceTypes.svg",
    },
  },
  //#endregion ServiceTypes

  //#region CountedServiceTypes
  {
    path: "/settings/services-and-counted-services/CountedServiceType",
    name: "CountedServiceTypes",
    component: () =>
      import(
        "./../views/settings/settingsOthers/countedServiceTypes/CountedServiceTypes.vue"
      ),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasCountedServiceType())
      );
    },
    meta: {
      pageName: i18n.t("CountedServiceTypes.modelName"),
      pageIcon: "countedServiceTypes.svg",
    },
  },
  //#endregion CountedServiceTypes

  //#endregion SettingsOther

  //#endregion Settings

  //#region UserSettings

  //#region UserSettingsTabs

  {
    path: "/user-settings/master-admin/",
    name: "UserValidSettingsTabsMasterAdmin",
    component: () => import("./../views/settings/UserSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasUserValidSettingsTabsMasterAdmin())
      );
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      userTypeToken: USER_TYPE.MasterAdmin,
    },
    props: true,
  },
  {
    path: "/user-settings/employee/",
    name: "UserValidSettingsTabsEmployee",
    component: () => import("./../views/settings/UserSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasUserValidSettingsTabsEmployee())
      );
    },
    meta: {
      pageName: i18n.t("employees.modelName"),
      pageIcon: "employees.svg",
      userTypeToken: USER_TYPE.Employee,
    },
    props: true,
  },
  {
    path: "/user-settings/student/",
    name: "UserValidSettingsTabsStudent",
    component: () => import("./../views/settings/UserSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasUserValidSettingsTabsStudent())
      );
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      userTypeToken: USER_TYPE.Student,
    },
    props: true,
  },
  // {
  //   path: "/user-settings/supplier/",
  //   name: "UserValidSettingsTabsSupplier",
  //   component: () => import("./../views/settings/UserSettings.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasUserValidSettingsTabsSupplier())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("suppliers.modelName"),
  //     pageIcon: "suppliers.svg",
  //     userTypeToken: USER_TYPE.Supplier,
  //   },
  //   props: true,
  // },
  {
    path: "/user-settings/parent/",
    name: "UserValidSettingsTabsParent",
    component: () => import("./../views/settings/UserSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasUserValidSettingsTabsParent())
      );
    },
    meta: {
      pageName: i18n.t("parents.modelName"),
      pageIcon: "parents.svg",
      userTypeToken: USER_TYPE.Parent,
    },
    props: true,
  },
  // {
  //   path: "/user-settings/client/",
  //   name: "UserValidSettingsTabsClient",
  //   component: () => import("./../views/settings/UserSettings.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasUserValidSettingsTabsClient())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("clients.modelName"),
  //     pageIcon: "clients.svg",
  //     userTypeToken: USER_TYPE.Client,
  //   },
  //   props: true,
  // },

  //#endregion UserSettingsTabs

  //#endregion UserSettings

  //#region EstablishmentRoles

  {
    path: "/user-settings/establishment-roles/admins-egypt",
    name: "AdminsEgyptEstablishmentsRole",
    component: () =>
      import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasAdminsEgyptEstablishmentsRole())
      );
    },
    meta: {
      pageName: i18n.t("EstablishmentRoles.adminsEgypt.modelName"),
      pageIcon: "adminsEgypt.svg",
      userTypeToken: USER_TYPE.AdminsEgypt,
      modelName: "adminsEgyptEstablishmentsRole",
    },
    props: true,
  },
  {
    path: "/user-settings/establishment-roles/master-admin",
    name: "MasterAdminEstablishmentsRole",
    component: () =>
      import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMasterAdminEstablishmentsRole())
      );
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: "masterAdminEstablishmentsRole",
    },
    props: true,
  },
  {
    path: "/user-settings/establishment-roles/employee",
    name: "EmployeeEstablishmentsRole",
    component: () =>
      import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEmployeeEstablishmentsRole())
      );
    },
    meta: {
      pageName: i18n.t("employees.modelName"),
      pageIcon: "employees.svg",
      userTypeToken: USER_TYPE.Employee,
      modelName: "employeeEstablishmentsRole",
    },
    props: true,
  },
  {
    path: "/user-settings/establishment-roles/student",
    name: "StudentEstablishmentsRole",
    component: () =>
      import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudentEstablishmentsRole())
      );
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      userTypeToken: USER_TYPE.Student,
      modelName: "studentEstablishmentsRole",
    },
    props: true,
  },
  // {
  //   path: "/user-settings/establishment-roles/supplier",
  //   name: "SupplierEstablishmentsRole",
  //   component: () =>
  //     import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasSupplierEstablishmentsRole())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("suppliers.modelName"),
  //     pageIcon: "suppliers.svg",
  //     userTypeToken: USER_TYPE.Supplier,
  //     modelName: "supplierEstablishmentsRole",
  //   },
  //   props: true,
  // },
  {
    path: "/user-settings/establishment-roles/parent",
    name: "ParentEstablishmentsRole",
    component: () =>
      import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasParentEstablishmentsRole())
      );
    },
    meta: {
      pageName: i18n.t("parents.modelName"),
      pageIcon: "parents.svg",
      userTypeToken: USER_TYPE.Parent,
      modelName: "parentEstablishmentsRole",
    },
    props: true,
  },
  // {
  //   path: "/user-settings/establishment-roles/client",
  //   name: "ClientEstablishmentsRole",
  //   component: () =>
  //     import("./../views/settings/establishmentRoles/EstablishmentRoles.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasClientEstablishmentsRole())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("clients.modelName"),
  //     pageIcon: "clients.svg",
  //     userTypeToken: USER_TYPE.Client,
  //     modelName: "clientEstablishmentsRole",
  //   },
  //   props: true,
  // },

  //#endregion EstablishmentRoles

  //#region UserValidSettings

  {
    path: "/user-settings/user-valid-settings/admins-egypt",
    name: "AdminsEgyptValidSetting",
    component: () =>
      import("./../views/settings/userValidSettings/UserValidSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasAdminsEgyptValidSetting())
      );
    },
    meta: {
      pageName: i18n.t("UserValidSettings.adminsEgypt.modelName"),
      pageIcon: "adminsEgypt.svg",
      userTypeToken: USER_TYPE.AdminsEgypt,
      modelName: "adminsEgyptValidSetting",
    },
    props: true,
  },
  {
    path: "/user-settings/user-valid-settings/master-admin",
    name: "MasterAdminValidSetting",
    component: () =>
      import("./../views/settings/userValidSettings/UserValidSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMasterAdminValidSetting())
      );
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: "masterAdminValidSetting",
    },
    props: true,
  },
  {
    path: "/user-settings/user-valid-settings/employee",
    name: "EmployeeValidSetting",
    component: () =>
      import("./../views/settings/userValidSettings/UserValidSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEmployeeValidSetting())
      );
    },
    meta: {
      pageName: i18n.t("employees.modelName"),
      pageIcon: "employees.svg",
      userTypeToken: USER_TYPE.Employee,
      modelName: "employeeValidSetting",
    },
    props: true,
  },
  {
    path: "/user-settings/user-valid-settings/student",
    name: "StudentValidSetting",
    component: () =>
      import("./../views/settings/userValidSettings/UserValidSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudentValidSetting())
      );
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      userTypeToken: USER_TYPE.Student,
      modelName: "studentValidSetting",
    },
    props: true,
  },
  // {
  //   path: "/user-settings/user-valid-settings/supplier",
  //   name: "SupplierValidSetting",
  //   component: () =>
  //     import("./../views/settings/userValidSettings/UserValidSettings.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasSupplierValidSetting())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("suppliers.modelName"),
  //     pageIcon: "suppliers.svg",
  //     userTypeToken: USER_TYPE.Supplier,
  //     modelName: "supplierValidSetting",
  //   },
  //   props: true,
  // },
  {
    path: "/user-settings/user-valid-settings/parent",
    name: "ParentValidSetting",
    component: () =>
      import("./../views/settings/userValidSettings/UserValidSettings.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasParentValidSetting())
      );
    },
    meta: {
      pageName: i18n.t("parents.modelName"),
      pageIcon: "parents.svg",
      userTypeToken: USER_TYPE.Parent,
      modelName: "parentValidSetting",
    },
    props: true,
  },
  // {
  //   path: "/user-settings/user-valid-settings/client",
  //   name: "ClientValidSetting",
  //   component: () =>
  //     import("./../views/settings/userValidSettings/UserValidSettings.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasClientValidSetting())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("clients.modelName"),
  //     pageIcon: "clients.svg",
  //     userTypeToken: USER_TYPE.Client,
  //     modelName: "clientValidSetting",
  //   },
  //   props: true,
  // },

  //#endregion UserValidSettings

  //#region UserLoginCodes

  {
    path: "/user-settings/user-login-codes/admins-egypt/:userToken?",
    name: "AdminsEgyptLoginCode",
    component: () =>
      import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasAdminsEgyptLoginCode())
      );
    },
    meta: {
      pageName: i18n.t("UserLoginCodes.adminsEgypt.modelName"),
      pageIcon: "adminsEgypt.svg",
      userTypeToken: USER_TYPE.AdminsEgypt,
      modelName: "adminsEgyptLoginCode",
    },
    props: true,
  },
  {
    path: "/user-settings/user-login-codes/master-admin/:userToken?",
    name: "MasterAdminLoginCode",
    component: () =>
      import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasMasterAdminLoginCode())
      );
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: "masterAdminLoginCode",
    },
    props: true,
  },
  {
    path: "/user-settings/user-login-codes/employee/:userToken?",
    name: "EmployeeLoginCode",
    component: () =>
      import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasEmployeeLoginCode())
      );
    },
    meta: {
      pageName: i18n.t("employees.modelName"),
      pageIcon: "employees.svg",
      userTypeToken: USER_TYPE.Employee,
      modelName: "employeeLoginCode",
    },
    props: true,
  },
  {
    path: "/user-settings/user-login-codes/student/:userToken?",
    name: "StudentLoginCode",
    component: () =>
      import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasStudentLoginCode())
      );
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      userTypeToken: USER_TYPE.Student,
      modelName: "studentLoginCode",
    },
    props: true,
  },
  // {
  //   path: "/user-settings/user-login-codes/supplier/:userToken?",
  //   name: "SupplierLoginCode",
  //   component: () =>
  //     import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasSupplierLoginCode())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("suppliers.modelName"),
  //     pageIcon: "suppliers.svg",
  //     userTypeToken: USER_TYPE.Supplier,
  //     modelName: "supplierLoginCode",
  //   },
  //   props: true,
  // },
  {
    path: "/user-settings/user-login-codes/parent/:userToken?",
    name: "ParentLoginCode",
    component: () =>
      import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
    beforeEnter: (to, from, next) => {
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(privilegeHelper.hasParentLoginCode())
      );
    },
    meta: {
      pageName: i18n.t("parents.modelName"),
      pageIcon: "parents.svg",
      userTypeToken: USER_TYPE.Parent,
      modelName: "parentLoginCode",
    },
    props: true,
  },
  // {
  //   path: "/user-settings/user-login-codes/client/:userToken?",
  //   name: "ClientLoginCode",
  //   component: () =>
  //     import("./../views/settings/userLoginCodes/UserLoginCodes.vue"),
  //   beforeEnter: (to, from, next) => {
  //     handlePrivilege(
  //       to,
  //       from,
  //       next,
  //       checkPrivilege(privilegeHelper.hasClientLoginCode())
  //     );
  //   },
  //   meta: {
  //     pageName: i18n.t("clients.modelName"),
  //     pageIcon: "clients.svg",
  //     userTypeToken: USER_TYPE.Client,
  //     modelName: "clientLoginCode",
  //   },
  //   props: true,
  // },

  //#endregion UserLoginCodes

  //#region ModulePrivilege
  {
    path: "/privileges/edit/:establishmentRoleToken?/:modelName?",
    name: "Privileges",
    component: () =>
      import("./../views/modulePrivileges/ModulePrivilegeEdit.vue"),
    beforeEnter: (to, from, next) => {
      // console.log(to.params.modelName);
      handlePrivilege(
        to,
        from,
        next,
        checkPrivilege(
          privilegeHelper.hasEstablishmentRoleEdit(to.params.modelName)
        )
      );
    },
    props: true,
    meta: {
      pageName: i18n.t("Privileges.modelName"),
      pageIcon: "privileges.svg",
      currentPage: "Privilege",
      currentSubPage: "",
    },
  },
  //#endregion ModulePrivilege

  //#region Error
  {
    path: "/error-404",
    name: "Error404",
    component: () => import("./../views/errors/Error-404.vue"),
    meta: {
      pageName: i18n.t("pageNotFound"),
      pageIcon: "404-icon.svg",
      currentPage: "",
      currentSubPage: "",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "Error404" },
  },
  //#endregion Error
];

export default routes;
