<template>
  <div class="dashboard-sidebar" :class="{ closed: sidebarIsClosed }">
    <div class="v-overlay" @click="toggleSidebarStatus()">
      <div class="v-overlay__scrim"></div>
    </div>

    <div class="sidebar">
      <header>
        <span class="header-image">
          <img src="./../../assets/images/logo.png" alt="" />
        </span>

        <div class="header-text">
          <span class="name">{{ $t("projectName") }}</span>
          <!-- <span class="name">Admins Egypt</span>
        <span class="profession">Move To Cloud</span> -->
        </div>
      </header>

      <div class="menu">
        <ul class="menu-links">
          <li
            v-for="(route, index) in routes"
            :key="index"
            :class="
              !route.childrens || route.childrens.length == 0 ? '' : 'sub-menu'
            "
          >
            <router-link
              v-if="!route.childrens || route.childrens.length == 0"
              :to="{ name: route.name }"
            >
              <span class="icon"
                ><img :src="route.icon" v-b-popover.hover.top="route.title"
              /></span>
              <span class="text">{{ route.title }}</span>
            </router-link>

            <template v-else>
              <b-button v-b-toggle="route.name">
                <span class="icon"
                  ><img :src="route.icon" v-b-popover.hover.top="route.title"
                /></span>
                <span class="text">
                  <span class="sub-text">{{ route.title }}</span>
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </span>
              </b-button>
              <b-collapse :id="route.name">
                <li v-for="(route, index) in route.childrens" :key="index">
                  <router-link :to="{ name: route.name }">
                    <span class="icon"
                      ><img
                        :src="route.icon"
                        v-b-popover.hover.top="route.title"
                    /></span>
                    <span class="text">{{ route.title }}</span>
                  </router-link>
                </li>
              </b-collapse>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { checkPrivilege } from "./../../utils/functions";
import {
  hasEducational,
  hasEducationalPeriod,
  hasEducationalCategory,
  hasSystemComponentEducationalCategory,
  hasSystemComponentsHierarchyEducationalCategory,
  hasPriceList,
  hasEducationalJoiningApplication,
  hasEducationalGroup,
  hasGroup,
  hasExam,
  hasDebt,
  hasInstallment,
  hasInstallmentPayment,
  hasServiceEntitlement,
  hasEducationalScheduleTime,
  // hasEducationalGroupStudent,
  hasEducationalGroupTransfer,
  hasExpensesType,
  hasRevenuesType,
  hasSimpleExamModel,
  hasGroupScheduleExam,
  hasStudentScheduleExamTime,
  hasUsers,
  hasUserSettings,
  hasMasterAdmin,
  hasPlaceMasterAdmin,
  hasEmployee,
  hasPlaceEmployee,
  hasStudent,
  hasPlaceStudent,
  // hasSupplier,
  // hasPlaceSupplier,
  hasParent,
  hasPlaceParent,
  // hasClient,
  // hasPlaceClient,
  // hasPlaceOther,
  // hasSystemComponentPlace,
  // hasSystemComponentsHierarchyPlace,
  hasReports,
  hasSharedMediaFolder,
  hasMediaPackage,
  hasNews,
  hasServicesAndCountedServices,
  hasService,
  hasServiceType,
  hasCountedService,
  hasCountedServiceType,
  hasFinance,
  hasAccount,
  hasAccountTransaction,
  hasCountedServiceTransaction,
  hasExpense,
  hasRevenue,
  hasAlerts,
  hasComplaint,
  hasReminder,
  hasSettingsOthers,
  // hasEmployeePayrollSetting,
  hasUserValidSettingsTabsMasterAdmin,
  hasMasterAdminEstablishmentsRole,
  hasMasterAdminValidSetting,
  hasMasterAdminLoginCode,
  hasUserValidSettingsTabsEmployee,
  hasEmployeeEstablishmentsRole,
  hasEmployeeValidSetting,
  hasEmployeeLoginCode,
  hasUserValidSettingsTabsStudent,
  hasStudentEstablishmentsRole,
  hasStudentValidSetting,
  hasStudentLoginCode,
  // hasUserValidSettingsTabsSupplier,
  // hasSupplierEstablishmentsRole,
  // hasSupplierValidSetting,
  // hasSupplierLoginCode,
  hasUserValidSettingsTabsParent,
  hasParentEstablishmentsRole,
  hasParentValidSetting,
  hasParentLoginCode,
  // hasUserValidSettingsTabsClient,
  // hasClientEstablishmentsRole,
  // hasClientValidSetting,
} from "./../../utils/privilegeHelper";

import iconEducational from "./../../assets/images/Educational.svg";
import iconGroups from "./../../assets/images/Groups.svg";
import iconExams from "./../../assets/images/Exams.svg";
import iconEducationalPeriods from "./../../assets/images/educationalPeriods.svg";
import iconEducationalCategories from "./../../assets/images/EducationalCategories.svg";
import iconEducationalJoiningApplications from "./../../assets/images/EducationalJoiningApplications.svg";
import iconPriceLists from "./../../assets/images/PriceLists.svg";
import iconDebts from "./../../assets/images/debts.svg";
// import iconInstallments from "./../../assets/images/installments.svg";
import iconInstallmentPayments from "./../../assets/images/installmentPayments.svg";
// import iconServiceEntitlements from "./../../assets/images/serviceEntitlements.svg";
import iconEducationalGroups from "./../../assets/images/EducationalGroups.svg";
import iconEducationalScheduleTimes from "./../../assets/images/EducationalScheduleTimes.svg";
// import iconEducationalGroupStudents from "./../../assets/images/EducationalGroupStudents.svg";
import iconEducationalGroupTransfers from "./../../assets/images/EducationalGroupTransfers.svg";
// import iconEducationalGroupAttendances from "./../../assets/images/EducationalGroupAttendances.svg";
import iconSimpleExamModels from "./../../assets/images/SimpleExamModels.svg";
import iconGroupScheduleExams from "./../../assets/images/GroupScheduleExams.svg";
import iconStudentScheduleExamTimes from "./../../assets/images/StudentScheduleExamTimes.svg";
// import iconPlaces from "./../../assets/images/places.svg";
// import iconUserInterests from "./../../assets/images/UserInterests.svg";
import iconSharedMediaFolders from "./../../assets/images/sharedMediaFolders.svg";
import iconMediaPackages from "./../../assets/images/mediaPackages.svg";
import iconNewss from "./../../assets/images/news.svg";
import iconReports from "./../../assets/images/reports.svg";
import iconSettingsOthers from "./../../assets/images/settings-other.svg";
// import iconEmployeePayrollSettings from "./../../assets/images/employeePayrollSettings.svg";
import iconServicesAndCountedServices from "./../../assets/images/ServicesAndCountedServices.svg";
import iconServices from "./../../assets/images/services.svg";
import iconCountedServices from "./../../assets/images/countedServices.svg";
import iconUsers from "./../../assets/images/users.svg";
import iconMasterAdmins from "./../../assets/images/masterAdmins.svg";
import iconEmployees from "./../../assets/images/employees.svg";
import iconStudents from "./../../assets/images/students.svg";
// import iconSuppliers from "./../../assets/images/suppliers.svg";
import iconParents from "./../../assets/images/parents.svg";
// import iconClients from "./../../assets/images/clients.svg";
import iconFinance from "./../../assets/images/finance.svg";
import iconMedia from "./../../assets/images/media.svg";
import iconAlerts from "./../../assets/images/alerts.svg";
import iconComplaints from "./../../assets/images/complaints.svg";
import iconReminders from "./../../assets/images/reminders.svg";
import iconAccounts from "./../../assets/images/accounts.svg";
// import iconAccountTransactions from "./../../assets/images/accountTransactions.svg";
import iconCountedServiceTransactions from "./../../assets/images/countedServiceTransactions.svg";
import iconExpenses from "./../../assets/images/expenses.svg";
import iconRevenues from "./../../assets/images/revenues.svg";

export default {
  computed: {
    ...mapGetters(["sidebarIsClosed"]),

    routes: function () {
      let theRoutes = [];

      //#region Educational
      if (checkPrivilege(hasEducational())) {
        let childrens = [];

        if (checkPrivilege(hasEducationalJoiningApplication()))
          childrens.push({
            name: "EducationalJoiningApplications",
            icon: iconEducationalJoiningApplications,
            title: this.$t("EducationalJoiningApplications.modelName"),
          });

        if (
          checkPrivilege(
            hasEducationalCategory() ||
              hasSystemComponentEducationalCategory() ||
              hasSystemComponentsHierarchyEducationalCategory()
          )
        ) {
          let tabName = "";

          if (checkPrivilege(hasEducationalCategory())) {
            tabName = "EducationalCategories";
          } else if (
            checkPrivilege(hasSystemComponentsHierarchyEducationalCategory())
          ) {
            tabName = "SystemComponentsHierarchyEducationalCategory";
          } else if (checkPrivilege(hasSystemComponentEducationalCategory())) {
            tabName = "SystemComponentEducationalCategory";
          }

          childrens.push({
            name: tabName,
            icon: iconEducationalCategories,
            title: this.$t("EducationalCategories.modelName"),
          });
        }

        if (checkPrivilege(hasPriceList()))
          childrens.push({
            name: "PriceLists",
            icon: iconPriceLists,
            title: this.$t("PriceLists.modelName"),
          });

        if (checkPrivilege(hasEducationalPeriod()))
          childrens.push({
            name: "EducationalPeriods",
            icon: iconEducationalPeriods,
            title: this.$t("EducationalPeriods.modelName"),
          });

        theRoutes.push({
          name: "Educational",
          icon: iconEducational,
          title: this.$t("Educational.modelName"),
          childrens: childrens,
        });
      }
      //#endregion Educational

      //#region Groups
      if (checkPrivilege(hasGroup())) {
        let childrens = [];

        if (checkPrivilege(hasEducationalGroup()))
          childrens.push({
            name: "EducationalGroups",
            icon: iconEducationalGroups,
            title: this.$t("EducationalGroups.modelName"),
          });

        if (checkPrivilege(hasEducationalScheduleTime()))
          childrens.push({
            name: "EducationalScheduleTimes",
            icon: iconEducationalScheduleTimes,
            title: this.$t("EducationalScheduleTimes.modelName"),
          });

        // if (checkPrivilege(hasEducationalGroupStudent()))
        //   childrens.push({
        //     name: "EducationalGroupStudents",
        //     icon: iconEducationalGroupStudents,
        //     title: this.$t("EducationalGroupStudents.modelName"),
        //   });

        if (checkPrivilege(hasEducationalGroupTransfer()))
          childrens.push({
            name: "EducationalGroupTransfers",
            icon: iconEducationalGroupTransfers,
            title: this.$t("EducationalGroupTransfers.modelName"),
          });

        // if (checkPrivilege(hasEducationalGroupAttendance()))
        //   childrens.push({
        //     name: "EducationalGroupAttendances",
        //     icon: iconEducationalGroupAttendances,
        //     title: this.$t("EducationalGroupAttendances.modelName"),
        //   });

        theRoutes.push({
          name: "Groups",
          icon: iconGroups,
          title: this.$t("Groups.modelName"),
          childrens: childrens,
        });
      }
      //#endregion Groups

      //#region Exams
      if (checkPrivilege(hasExam())) {
        let childrens = [];

        if (checkPrivilege(hasSimpleExamModel()))
          childrens.push({
            name: "SimpleExamModels",
            icon: iconSimpleExamModels,
            title: this.$t("SimpleExamModels.modelName"),
          });

        if (checkPrivilege(hasGroupScheduleExam()))
          childrens.push({
            name: "GroupScheduleExams",
            icon: iconGroupScheduleExams,
            title: this.$t("GroupScheduleExams.modelName"),
          });

        if (checkPrivilege(hasStudentScheduleExamTime()))
          childrens.push({
            name: "StudentScheduleExamTimes",
            icon: iconStudentScheduleExamTimes,
            title: this.$t("StudentScheduleExamTimes.modelName"),
          });

        theRoutes.push({
          name: "Exams",
          icon: iconExams,
          title: this.$t("Exams.modelName"),
          childrens: childrens,
        });
      }
      //#endregion Exams

      //#region UsersModule
      if (checkPrivilege(hasUsers() || hasUserSettings())) {
        let childrensOfUsers = [];
        if (checkPrivilege(hasStudent() || hasUserValidSettingsTabsStudent())) {
          if (checkPrivilege(hasStudent())) {
            childrensOfUsers.push({
              name: "Students",
              icon: iconStudents,
              title: this.$t("students.modelName"),
            });
          } else if (checkPrivilege(hasStudentEstablishmentsRole())) {
            childrensOfUsers.push({
              name: "StudentEstablishmentsRole",
              icon: iconStudents,
              title: this.$t("students.modelName"),
            });
          } else if (checkPrivilege(hasStudentValidSetting())) {
            childrensOfUsers.push({
              name: "StudentValidSetting",
              icon: iconStudents,
              title: this.$t("students.modelName"),
            });
          } else if (checkPrivilege(hasStudentLoginCode())) {
            childrensOfUsers.push({
              name: "StudentLoginCode",
              icon: iconStudents,
              title: this.$t("students.modelName"),
            });
          } else if (checkPrivilege(hasPlaceStudent())) {
            childrensOfUsers.push({
              name: "PlaceStudents",
              icon: iconStudents,
              title: this.$t("students.modelName"),
            });
          }
        }

        if (checkPrivilege(hasParent() || hasUserValidSettingsTabsParent())) {
          if (checkPrivilege(hasParent())) {
            childrensOfUsers.push({
              name: "Parents",
              icon: iconParents,
              title: this.$t("parents.modelName"),
            });
          } else if (checkPrivilege(hasParentEstablishmentsRole())) {
            childrensOfUsers.push({
              name: "ParentEstablishmentsRole",
              icon: iconParents,
              title: this.$t("parents.modelName"),
            });
          } else if (checkPrivilege(hasParentValidSetting())) {
            childrensOfUsers.push({
              name: "ParentValidSetting",
              icon: iconParents,
              title: this.$t("parents.modelName"),
            });
          } else if (checkPrivilege(hasParentLoginCode())) {
            childrensOfUsers.push({
              name: "ParentLoginCode",
              icon: iconParents,
              title: this.$t("parents.modelName"),
            });
          } else if (checkPrivilege(hasPlaceParent())) {
            childrensOfUsers.push({
              name: "PlaceParents",
              icon: iconParents,
              title: this.$t("parents.modelName"),
            });
          }
        }

        // if (checkPrivilege(hasClient() || hasUserValidSettingsTabsClient())) {
        //   if (checkPrivilege(hasClient())) {
        //     childrensOfUsers.push({
        //       name: "Clients",
        //       icon: iconClients,
        //       title: this.$t("clients.modelName"),
        //     });
        //   } else if (checkPrivilege(hasClientEstablishmentsRole())) {
        //     childrensOfUsers.push({
        //       name: "ClientEstablishmentsRole",
        //       icon: iconClients,
        //       title: this.$t("clients.modelName"),
        //     });
        //   } else if (checkPrivilege(hasClientValidSetting())) {
        //     childrensOfUsers.push({
        //       name: "ClientValidSetting",
        //       icon: iconClients,
        //       title: this.$t("clients.modelName"),
        //     });
        //   } else if (checkPrivilege(hasClientLoginCode())) {
        //     childrensOfUsers.push({
        //       name: "ClientLoginCode",
        //       icon: iconClients,
        //       title: this.$t("clients.modelName"),
        //     });
        //   } else if (checkPrivilege(hasPlaceClient())) {
        //     childrensOfUsers.push({
        //       name: "PlaceClients",
        //       icon: iconClients,
        //       title: this.$t("clients.modelName"),
        //     });
        //   }
        // }

        // if (
        //   checkPrivilege(hasSupplier() || hasUserValidSettingsTabsSupplier())
        // ) {
        //   if (checkPrivilege(hasSupplier())) {
        //     childrensOfUsers.push({
        //       name: "Suppliers",
        //       icon: iconSuppliers,
        //       title: this.$t("suppliers.modelName"),
        //     });
        //   } else if (checkPrivilege(hasSupplierEstablishmentsRole())) {
        //     childrensOfUsers.push({
        //       name: "SupplierEstablishmentsRole",
        //       icon: iconSuppliers,
        //       title: this.$t("suppliers.modelName"),
        //     });
        //   } else if (checkPrivilege(hasSupplierValidSetting())) {
        //     childrensOfUsers.push({
        //       name: "SupplierValidSetting",
        //       icon: iconSuppliers,
        //       title: this.$t("suppliers.modelName"),
        //     });
        //   } else if (checkPrivilege(hasSupplierLoginCode())) {
        //     childrensOfUsers.push({
        //       name: "SupplierLoginCode",
        //       icon: iconSuppliers,
        //       title: this.$t("suppliers.modelName"),
        //     });
        //   } else if (checkPrivilege(hasPlaceSupplier())) {
        //     childrensOfUsers.push({
        //       name: "PlaceSuppliers",
        //       icon: iconSuppliers,
        //       title: this.$t("suppliers.modelName"),
        //     });
        //   }
        // }

        if (
          checkPrivilege(hasEmployee() || hasUserValidSettingsTabsEmployee())
        ) {
          if (checkPrivilege(hasEmployee())) {
            childrensOfUsers.push({
              name: "Employees",
              icon: iconEmployees,
              title: this.$t("employees.modelName"),
            });
          } else if (checkPrivilege(hasEmployeeEstablishmentsRole())) {
            childrensOfUsers.push({
              name: "EmployeeEstablishmentsRole",
              icon: iconEmployees,
              title: this.$t("employees.modelName"),
            });
          } else if (checkPrivilege(hasEmployeeValidSetting())) {
            childrensOfUsers.push({
              name: "EmployeeValidSetting",
              icon: iconEmployees,
              title: this.$t("employees.modelName"),
            });
          } else if (checkPrivilege(hasEmployeeLoginCode())) {
            childrensOfUsers.push({
              name: "EmployeeLoginCode",
              icon: iconEmployees,
              title: this.$t("employees.modelName"),
            });
          } else if (checkPrivilege(hasPlaceEmployee())) {
            childrensOfUsers.push({
              name: "PlaceEmployees",
              icon: iconEmployees,
              title: this.$t("employees.modelName"),
            });
          }
        }

        if (
          checkPrivilege(
            hasMasterAdmin() || hasUserValidSettingsTabsMasterAdmin()
          )
        ) {
          if (checkPrivilege(hasMasterAdmin())) {
            childrensOfUsers.push({
              name: "MasterAdmin",
              icon: iconMasterAdmins,
              title: this.$t("masterAdmins.modelName"),
            });
          } else if (checkPrivilege(hasMasterAdminEstablishmentsRole())) {
            childrensOfUsers.push({
              name: "MasterAdminEstablishmentsRole",
              icon: iconMasterAdmins,
              title: this.$t("masterAdmins.modelName"),
            });
          } else if (checkPrivilege(hasMasterAdminValidSetting())) {
            childrensOfUsers.push({
              name: "MasterAdminValidSetting",
              icon: iconMasterAdmins,
              title: this.$t("masterAdmins.modelName"),
            });
          } else if (checkPrivilege(hasMasterAdminLoginCode())) {
            childrensOfUsers.push({
              name: "MasterAdminLoginCode",
              icon: iconMasterAdmins,
              title: this.$t("masterAdmins.modelName"),
            });
          } else if (checkPrivilege(hasPlaceMasterAdmin())) {
            childrensOfUsers.push({
              name: "PlaceMasterAdmin",
              icon: iconMasterAdmins,
              title: this.$t("masterAdmins.modelName"),
            });
          }
        }
        theRoutes.push({
          name: "Users",
          icon: iconUsers,
          title: this.$t("Users.modelName"),
          childrens: childrensOfUsers,
        });
      }
      //#endregion UsersModule

      //#region ServicesAndCountedServices
      if (checkPrivilege(hasServicesAndCountedServices())) {
        let childrens = [];

        if (checkPrivilege(hasService() || hasServiceType())) {
          childrens.push({
            name: checkPrivilege(hasService()) ? "Services" : "ServiceTypes",
            icon: iconServices,
            title: this.$t("Services.modelName"),
          });
        }

        if (checkPrivilege(hasCountedService() || hasCountedServiceType())) {
          childrens.push({
            name: checkPrivilege(hasCountedService())
              ? "CountedServices"
              : "CountedServiceTypes",
            icon: iconCountedServices,
            title: this.$t("CountedServices.modelName"),
          });
        }

        theRoutes.push({
          name: "ServicesAndCountedServices",
          icon: iconServicesAndCountedServices,
          title: this.$t("ServicesAndCountedServices.modelName"),
          childrens: childrens,
        });
      }
      //#endregion ServicesAndCountedServices

      //#region Alerts

      if (checkPrivilege(hasAlerts())) {
        let childrensOfAlert = [];
        if (checkPrivilege(hasComplaint()))
          childrensOfAlert.push({
            name: "Complaints",
            icon: iconComplaints,
            title: this.$t("Complaints.modelName"),
          });
        if (checkPrivilege(hasReminder()))
          childrensOfAlert.push({
            name: "Reminders",
            icon: iconReminders,
            title: this.$t("Reminders.modelName"),
          });

        theRoutes.push({
          name: "Alert",
          icon: iconAlerts,
          title: this.$t("Alerts.modelName"),
          childrens: childrensOfAlert,
        });
      }

      //#endregion Alerts

      //#region Finance
      if (checkPrivilege(hasFinance())) {
        let childrensOfFinance = [];
        if (checkPrivilege(hasAccount() || hasAccountTransaction())) {
          let tabName = "";

          if (checkPrivilege(hasAccount())) {
            tabName = "Accounts";
          } else if (checkPrivilege(hasAccountTransaction())) {
            tabName = "AccountTransactions";
          }

          childrensOfFinance.push({
            name: tabName,
            icon: iconAccounts,
            title: this.$t("Accounts.modelName"),
          });
        }

        if (checkPrivilege(hasDebt() || hasInstallment())) {
          let tabName = "";

          if (checkPrivilege(hasDebt())) {
            tabName = "Debts";
          } else if (checkPrivilege(hasInstallment())) {
            tabName = "Installments";
          }

          childrensOfFinance.push({
            name: tabName,
            icon: iconDebts,
            title: this.$t("Debts.modelName"),
          });
        }

        if (checkPrivilege(hasExpense() || hasExpensesType())) {
          let tabName = "";

          if (checkPrivilege(hasExpense())) {
            tabName = "Expenses";
          } else if (checkPrivilege(hasExpensesType())) {
            tabName = "ExpensesTypes";
          }

          childrensOfFinance.push({
            name: tabName,
            icon: iconExpenses,
            title: this.$t("Expenses.modelName"),
          });
        }

        if (checkPrivilege(hasRevenue() || hasRevenuesType())) {
          let tabName = "";

          if (checkPrivilege(hasRevenue())) {
            tabName = "Revenues";
          } else if (checkPrivilege(hasRevenuesType())) {
            tabName = "RevenuesTypes";
          }

          childrensOfFinance.push({
            name: tabName,
            icon: iconRevenues,
            title: this.$t("Revenues.modelName"),
          });
        }

        if (checkPrivilege(hasCountedServiceTransaction()))
          childrensOfFinance.push({
            name: "CountedServiceTransactions",
            icon: iconCountedServiceTransactions,
            title: this.$t("CountedServiceTransactions.modelName"),
          });

        if (
          checkPrivilege(hasInstallmentPayment() || hasServiceEntitlement())
        ) {
          let tabName = "";

          if (checkPrivilege(hasInstallmentPayment())) {
            tabName = "InstallmentPayments";
          } else if (checkPrivilege(hasServiceEntitlement())) {
            tabName = "ServiceEntitlements";
          }

          childrensOfFinance.push({
            name: tabName,
            icon: iconInstallmentPayments,
            title: this.$t("InstallmentPayments.modelName"),
          });
        }

        theRoutes.push({
          name: "Finance",
          icon: iconFinance,
          title: this.$t("Finance.modelName"),
          childrens: childrensOfFinance,
        });
      }
      //#endregion Finance

      //#region Media
      if (checkPrivilege(hasSharedMediaFolder() || hasMediaPackage())) {
        let childrensOfMedia = [];
        //#region SharedMediaFolders
        if (checkPrivilege(hasSharedMediaFolder()))
          childrensOfMedia.push({
            name: "SharedMediaFolders",
            icon: iconSharedMediaFolders,
            title: this.$t("SharedMediaFolders.modelName"),
          });
        //#endregion SharedMediaFolders

        //#region MediaPackages
        if (checkPrivilege(hasMediaPackage()))
          childrensOfMedia.push({
            name: "MediaPackages",
            icon: iconMediaPackages,
            title: this.$t("MediaPackages.modelName"),
          });
        //#endregion MediaPackages
        theRoutes.push({
          name: "Media",
          icon: iconMedia,
          title: this.$t("media"),
          childrens: childrensOfMedia,
        });
      }
      //#endregion Media

      //#region Newss
      if (checkPrivilege(hasNews()))
        theRoutes.push({
          name: "Newss",
          icon: iconNewss,
          title: this.$t("Newss.modelName"),
        });
      //#endregion Newss

      //#region Places
      // if (checkPrivilege(hasPlaceOther()))
      //   theRoutes.push({
      //     name: "PlaceOthers",
      //     icon: iconPlaces,
      //     title: this.$t("Places.modelName"),
      //   });

      //#endregion Places

      //#region UserInterests
      // if (checkPrivilege(hasStudent()))
      //   theRoutes.push({
      //     name: "UserInterests",
      //     icon: iconUserInterests,
      //     title: this.$t("UserInterests.modelName"),
      //   });

      //#endregion UserInterests

      //#region reports
      if (checkPrivilege(hasReports()))
        theRoutes.push({
          name: "Reports",
          icon: iconReports,
          title: this.$t("Reports.modelName"),
        });
      //#endregion reports

      //#region Settings

      if (checkPrivilege(hasSettingsOthers()))
        theRoutes.push({
          name: "SettingsOthers",
          icon: iconSettingsOthers,
          title: this.$t("settings-other"),
        });

      //#endregion Settings

      //#region EmployeePayrollSettings
      // if (checkPrivilege(hasEmployeePayrollSetting()))
      //   theRoutes.push({
      //     name: "EmployeePayrollSettings",
      //     icon: iconEmployeePayrollSettings,
      //     title: this.$t("EmployeePayrollSettings.modelName"),
      //   });
      //#endregion EmployeePayrollSettings

      return theRoutes;
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["toggleSidebarStatus"]),
    getCurrentActive() {
      setTimeout(() => {
        const allButtons = document.querySelectorAll(".menu-links li button");
        if (allButtons != undefined && allButtons.length != 0) {
          allButtons.forEach(function (item) {
            item.classList.remove("active");
          });
        }
        const allSelectors = document.querySelectorAll(".router-link-active");
        if (allSelectors != undefined && allSelectors.length != 0) {
          allSelectors.forEach(function (item) {
            if (item.parentNode.parentNode.previousSibling)
              item.parentNode.parentNode.previousSibling.classList.add(
                "active"
              );
          });
        }
      }, 1000);
    },
  },
  watch: {
    $route() {
      this.getCurrentActive();
    },
  },
  async created() {
    this.getCurrentActive();
  },
};
</script>
