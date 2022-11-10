<template>
  <b-tabs content-class="">
    <b-tab
      v-for="(option, index) in userSettingsTabsLis"
      :key="index"
      @click="goTo(option.to)"
      :title-item-class="'custom-tab-outer-li'"
      :active="option.currentTab == $route.name ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span>
        </span>
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import imgMasterAdmins from "@/assets/images/masterAdmins.svg";
import imgEmployees from "@/assets/images/employees.svg";
import imgStudents from "@/assets/images/students.svg";
import imgSuppliers from "@/assets/images/suppliers.svg";
import imgParents from "@/assets/images/parents.svg";
import imgClients from "@/assets/images/clients.svg";
import imgEstablishmentsRole from "@/assets/images/establishment-role.svg";
import imgValidSetting from "@/assets/images/UserValidSettings.svg";
import imgLoginCode from "@/assets/images/UserLoginCodes.svg";
import imgPlace from "@/assets/images/places.svg";

import { checkPrivilege } from "./../../utils/functions";
import { USER_TYPE } from "./../../utils/constantLists";

import {
  hasMasterAdmin,
  hasMasterAdminEstablishmentsRole,
  hasMasterAdminValidSetting,
  hasMasterAdminLoginCode,
  hasPlaceMasterAdmin,
  hasEmployee,
  hasEmployeeEstablishmentsRole,
  hasEmployeeValidSetting,
  hasEmployeeLoginCode,
  hasPlaceEmployee,
  hasStudent,
  hasStudentEstablishmentsRole,
  hasStudentValidSetting,
  hasStudentLoginCode,
  hasPlaceStudent,
  hasSupplier,
  hasSupplierEstablishmentsRole,
  hasSupplierValidSetting,
  hasSupplierLoginCode,
  hasPlaceSupplier,
  hasParent,
  hasParentEstablishmentsRole,
  hasParentValidSetting,
  hasParentLoginCode,
  hasPlaceParent,
  hasClient,
  hasClientEstablishmentsRole,
  hasClientValidSetting,
  hasClientLoginCode,
  hasPlaceClient,
} from "./../../utils/privilegeHelper";

export default {
  name: "UserSettingsTabs",
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userTypeTokenData: this.userTypeToken || this.$route.meta.userTypeToken,
    };
  },
  computed: {
    userSettingsTabsLis() {
      let tabs = [];

      switch (this.userTypeTokenData) {
        case USER_TYPE.MasterAdmin:
          tabs = this.userSettingsTabsListMasterAdmin;
          break;
        case USER_TYPE.Employee:
          tabs = this.userSettingsTabsListEmployee;
          break;
        case USER_TYPE.Student:
          tabs = this.userSettingsTabsListStudent;
          break;
        case USER_TYPE.Supplier:
          tabs = this.userSettingsTabsListSupplier;
          break;
        case USER_TYPE.Parent:
          tabs = this.userSettingsTabsListParent;
          break;
        case USER_TYPE.Client:
          tabs = this.userSettingsTabsListClient;
          break;
      }

      return tabs;
    },
    userSettingsTabsListMasterAdmin: function () {
      let tabs = [];
      if (checkPrivilege(hasMasterAdmin())) {
        tabs.push({
          to: {
            name: "MasterAdmin",
          },
          itemName: this.$t("masterAdmins.modelName"),
          itemImagePath: imgMasterAdmins,
          currentTab: "MasterAdmin",
        });
      }
      if (checkPrivilege(hasMasterAdminEstablishmentsRole())) {
        tabs.push({
          to: {
            name: "MasterAdminEstablishmentsRole",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "MasterAdminEstablishmentsRole",
        });
      }
      if (checkPrivilege(hasMasterAdminValidSetting())) {
        tabs.push({
          to: {
            name: "MasterAdminValidSetting",
          },
          itemName: this.$t("UserSettings.validSetting"),
          itemImagePath: imgValidSetting,
          currentTab: "MasterAdminValidSetting",
        });
      }
      if (checkPrivilege(hasMasterAdminLoginCode())) {
        tabs.push({
          to: {
            name: "MasterAdminLoginCode",
          },
          itemName: this.$t("UserSettings.loginCode"),
          itemImagePath: imgLoginCode,
          currentTab: "MasterAdminLoginCode",
        });
      }
      if (checkPrivilege(hasPlaceMasterAdmin())) {
        tabs.push({
          to: {
            name: "PlaceMasterAdmin",
          },
          itemName: this.$t("Places.modelName"),
          itemImagePath: imgPlace,
          currentTab: "PlaceMasterAdmin",
        });
      }

      return tabs;
    },
    userSettingsTabsListEmployee: function () {
      let tabs = [];
      if (checkPrivilege(hasEmployee())) {
        tabs.push({
          to: {
            name: "Employees",
          },
          itemName: this.$t("employees.modelName"),
          itemImagePath: imgEmployees,
          currentTab: "Employee",
        });
      }
      if (checkPrivilege(hasEmployeeEstablishmentsRole())) {
        tabs.push({
          to: {
            name: "EmployeeEstablishmentsRole",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "EmployeeEstablishmentsRole",
        });
      }
      if (checkPrivilege(hasEmployeeValidSetting())) {
        tabs.push({
          to: {
            name: "EmployeeValidSetting",
          },
          itemName: this.$t("UserSettings.validSetting"),
          itemImagePath: imgValidSetting,
          currentTab: "EmployeeValidSetting",
        });
      }
      if (checkPrivilege(hasEmployeeLoginCode())) {
        tabs.push({
          to: {
            name: "EmployeeLoginCode",
          },
          itemName: this.$t("UserSettings.loginCode"),
          itemImagePath: imgLoginCode,
          currentTab: "EmployeeLoginCode",
        });
      }
      if (checkPrivilege(hasPlaceEmployee())) {
        tabs.push({
          to: {
            name: "PlaceEmployees",
          },
          itemName: this.$t("Places.modelName"),
          itemImagePath: imgPlace,
          currentTab: "PlaceEmployees",
        });
      }

      return tabs;
    },
    userSettingsTabsListStudent: function () {
      let tabs = [];
      if (checkPrivilege(hasStudent())) {
        tabs.push({
          to: {
            name: "Students",
          },
          itemName: this.$t("students.modelName"),
          itemImagePath: imgStudents,
          currentTab: "Student",
        });
      }
      if (checkPrivilege(hasStudentEstablishmentsRole())) {
        tabs.push({
          to: {
            name: "StudentEstablishmentsRole",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "StudentEstablishmentsRole",
        });
      }
      if (checkPrivilege(hasStudentValidSetting())) {
        tabs.push({
          to: {
            name: "StudentValidSetting",
          },
          itemName: this.$t("UserSettings.validSetting"),
          itemImagePath: imgValidSetting,
          currentTab: "StudentValidSetting",
        });
      }
      if (checkPrivilege(hasStudentLoginCode())) {
        tabs.push({
          to: {
            name: "StudentLoginCode",
          },
          itemName: this.$t("UserSettings.loginCode"),
          itemImagePath: imgLoginCode,
          currentTab: "StudentLoginCode",
        });
      }
      if (checkPrivilege(hasPlaceStudent())) {
        tabs.push({
          to: {
            name: "PlaceStudents",
          },
          itemName: this.$t("Places.modelName"),
          itemImagePath: imgPlace,
          currentTab: "PlaceStudents",
        });
      }

      return tabs;
    },
    userSettingsTabsListSupplier: function () {
      let tabs = [];
      if (checkPrivilege(hasSupplier())) {
        tabs.push({
          to: {
            name: "Suppliers",
          },
          itemName: this.$t("suppliers.modelName"),
          itemImagePath: imgSuppliers,
          currentTab: "Supplier",
        });
      }
      if (checkPrivilege(hasSupplierEstablishmentsRole())) {
        tabs.push({
          to: {
            name: "SupplierEstablishmentsRole",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "SupplierEstablishmentsRole",
        });
      }
      if (checkPrivilege(hasSupplierValidSetting())) {
        tabs.push({
          to: {
            name: "SupplierValidSetting",
          },
          itemName: this.$t("UserSettings.validSetting"),
          itemImagePath: imgValidSetting,
          currentTab: "SupplierValidSetting",
        });
      }
      if (checkPrivilege(hasSupplierLoginCode())) {
        tabs.push({
          to: {
            name: "SupplierLoginCode",
          },
          itemName: this.$t("UserSettings.loginCode"),
          itemImagePath: imgLoginCode,
          currentTab: "SupplierLoginCode",
        });
      }
      if (checkPrivilege(hasPlaceSupplier())) {
        tabs.push({
          to: {
            name: "PlaceSuppliers",
          },
          itemName: this.$t("Places.modelName"),
          itemImagePath: imgPlace,
          currentTab: "PlaceSuppliers",
        });
      }

      return tabs;
    },
    userSettingsTabsListParent: function () {
      let tabs = [];
      if (checkPrivilege(hasParent())) {
        tabs.push({
          to: {
            name: "Parents",
          },
          itemName: this.$t("parents.modelName"),
          itemImagePath: imgParents,
          currentTab: "Parent",
        });
      }
      if (checkPrivilege(hasParentEstablishmentsRole())) {
        tabs.push({
          to: {
            name: "ParentEstablishmentsRole",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "ParentEstablishmentsRole",
        });
      }
      if (checkPrivilege(hasParentValidSetting())) {
        tabs.push({
          to: {
            name: "ParentValidSetting",
          },
          itemName: this.$t("UserSettings.validSetting"),
          itemImagePath: imgValidSetting,
          currentTab: "ParentValidSetting",
        });
      }
      if (checkPrivilege(hasParentLoginCode())) {
        tabs.push({
          to: {
            name: "ParentLoginCode",
          },
          itemName: this.$t("UserSettings.loginCode"),
          itemImagePath: imgLoginCode,
          currentTab: "ParentLoginCode",
        });
      }
      if (checkPrivilege(hasPlaceParent())) {
        tabs.push({
          to: {
            name: "PlaceParents",
          },
          itemName: this.$t("Places.modelName"),
          itemImagePath: imgPlace,
          currentTab: "PlaceParents",
        });
      }

      return tabs;
    },
    userSettingsTabsListClient: function () {
      let tabs = [];
      if (checkPrivilege(hasClient())) {
        tabs.push({
          to: {
            name: "Clients",
          },
          itemName: this.$t("clients.modelName"),
          itemImagePath: imgClients,
          currentTab: "Client",
        });
      }
      if (checkPrivilege(hasClientEstablishmentsRole())) {
        tabs.push({
          to: {
            name: "ClientEstablishmentsRole",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "ClientEstablishmentsRole",
        });
      }
      if (checkPrivilege(hasClientValidSetting())) {
        tabs.push({
          to: {
            name: "ClientValidSetting",
          },
          itemName: this.$t("UserSettings.validSetting"),
          itemImagePath: imgValidSetting,
          currentTab: "ClientValidSetting",
        });
      }
      if (checkPrivilege(hasClientLoginCode())) {
        tabs.push({
          to: {
            name: "ClientLoginCode",
          },
          itemName: this.$t("UserSettings.loginCode"),
          itemImagePath: imgLoginCode,
          currentTab: "ClientLoginCode",
        });
      }
      if (checkPrivilege(hasPlaceClient())) {
        tabs.push({
          to: {
            name: "PlaceClients",
          },
          itemName: this.$t("Places.modelName"),
          itemImagePath: imgPlace,
          currentTab: "PlaceClients",
        });
      }

      return tabs;
    },
  },
  watch: {},
  methods: {
    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
  },

  async created() {},
};
</script>
