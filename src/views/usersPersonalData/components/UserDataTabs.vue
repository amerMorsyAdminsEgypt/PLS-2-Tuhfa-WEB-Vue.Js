<template>
  <div>
    <b-tabs v-if="outerTabs" content-class="">
      <b-tab
        v-for="(option, index) in outerTabs"
        :key="index"
        @click="
          outerCurrentTab = option.currentTab;
          goToFirstInnerTab();
        "
        :title-item-class="'custom-tab-outer-li'"
        :active="outerCurrentTab == option.currentTab ? true : false"
      >
        <template #title>
          <span v-b-popover.hover.bottomright="`${option.itemName}`">
            <img :src="`${option.itemImagePath}`" class="icon-tab" />
            <span>{{ option.itemName }}</span></span
          >
        </template>
      </b-tab>
    </b-tabs>
    <b-tabs v-if="userTabs" content-class="">
      <b-tab
        v-for="(option, index) in userTabs"
        :key="index"
        @click="goTo(option.to)"
        :title-item-class="'custom-tab-inner-li'"
        :active="option.currentTab == $route.name ? true : false"
      >
        <template #title>
          <span v-b-popover.hover.bottomright="`${option.itemName}`">
            <img :src="`${option.itemImagePath}`" class="icon-tab" />
            <span>{{ option.itemName }}</span></span
          >
        </template>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import imgPersonalData from "@/assets/images/UsersPersonalData.svg";
import imgScientificDegrees from "@/assets/images/scientificDegrees.svg";
import imgMedicalData from "@/assets/images/medical-tests.svg";
import { USER_TYPE } from "./../../../utils/constantLists";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptFamily,
  hasMasterAdminFamily,
  hasEmployeeFamily,
  hasStudentFamily,
  hasSupplierFamily,
  hasClientFamily,
  hasAdminsEgyptQualification,
  hasMasterAdminQualification,
  hasEmployeeQualification,
  hasStudentQualification,
  hasSupplierQualification,
  hasParentQualification,
  hasClientQualification,
  hasAdminsEgyptPersonalCard,
  hasMasterAdminPersonalCard,
  hasEmployeePersonalCard,
  hasStudentPersonalCard,
  hasSupplierPersonalCard,
  hasParentPersonalCard,
  hasClientPersonalCard,
  hasAdminsEgyptTrainingCourse,
  hasMasterAdminTrainingCourse,
  hasEmployeeTrainingCourse,
  hasStudentTrainingCourse,
  hasSupplierTrainingCourse,
  hasParentTrainingCourse,
  hasClientTrainingCourse,
  hasAdminsEgyptExperience,
  hasMasterAdminExperience,
  hasEmployeeExperience,
  hasStudentExperience,
  hasSupplierExperience,
  hasParentExperience,
  hasClientExperience,
  hasAdminsEgyptInjury,
  hasMasterAdminInjury,
  hasEmployeeInjury,
  hasStudentInjury,
  hasSupplierInjury,
  hasParentInjury,
  hasClientInjury,
  hasAdminsEgyptOperation,
  hasMasterAdminOperation,
  hasEmployeeOperation,
  hasStudentOperation,
  hasSupplierOperation,
  hasParentOperation,
  hasClientOperation,
  hasAdminsEgyptScientificDegree,
  hasMasterAdminScientificDegree,
  hasEmployeeScientificDegree,
  hasStudentScientificDegree,
  hasSupplierScientificDegree,
  hasParentScientificDegree,
  hasClientScientificDegree,
} from "./../../../utils/privilegeHelper";
import imgUserFamilies from "@/assets/images/UserFamilies.svg";
import imgUserQualifications from "@/assets/images/UserQualifications.svg";
import imgUserPersonalCards from "@/assets/images/UserPersonalCards.svg";
import imgUserTrainingCourses from "@/assets/images/UserTrainingCourses.svg";
import imgUserExperiences from "@/assets/images/UserExperiences.svg";
import imgUserInjuries from "@/assets/images/UserInjuries.svg";
import imgUserOperations from "@/assets/images/UserOperations.svg";
import imgUserScientificDegrees from "@/assets/images/UserScientificDegrees.svg";

export default {
  name: "UserDataTabs",
  data() {
    return {
      outerCurrentTabData: "",
      userToken: this.$route.params.userToken,
      userTypeToken: this.$route.params.userTypeToken,
    };
  },
  computed: {
    outerCurrentTab: {
      get: function () {
        let outerCurrentTab = this.outerCurrentTabData || "";
        if (!outerCurrentTab) {
          let routeName = this.$route.name;
          switch (routeName) {
            case "UserFamilies":
            case "UserPersonalCards":
              outerCurrentTab = "PersonalData";
              break;
            case "UserQualifications":
            case "UserTrainingCourses":
            case "UserExperiences":
            case "UserScientificDegrees":
              outerCurrentTab = "ScientificData";
              break;
            case "UserInjuries":
            case "UserOperations":
              outerCurrentTab = "MedicalData";
              break;
          }
        }
        return outerCurrentTab;
      },
      set: function (tab) {
        this.updateOuterCurrentTab(tab);
      },
    },
    outerTabs: function () {
      let tabs = [];
      let hasPersonalData = this.hasUserFamily() || this.hasUserPersonalCard();

      let hasScientificData =
        this.hasUserQualification() ||
        this.hasUserTrainingCourse() ||
        this.hasUserExperience() ||
        this.hasUserScientificDegree();

      let hasMedicalData = this.hasUserInjury() || this.hasUserOperation();

      if (hasPersonalData) {
        tabs.push({
          itemName: this.$t("Users.mainTabs.personalData"),
          itemImagePath: imgPersonalData,
          currentTab: "PersonalData",
        });
      }
      if (hasScientificData) {
        tabs.push({
          itemName: this.$t("Users.mainTabs.scientificData"),
          itemImagePath: imgScientificDegrees,
          currentTab: "ScientificData",
        });
      }
      if (hasMedicalData) {
        tabs.push({
          itemName: this.$t("Users.mainTabs.medicalData"),
          itemImagePath: imgMedicalData,
          currentTab: "MedicalData",
        });
      }

      return tabs;
    },
    userTabs: function () {
      let tabs = [];
      if (this.outerCurrentTab == "PersonalData") {
        if (this.hasUserFamily()) {
          tabs.push({
            to: {
              name: "UserFamilies",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserFamilies.modelName"),
            itemImagePath: imgUserFamilies,
            currentTab: "UserFamilies",
          });
        }
        if (this.hasUserPersonalCard()) {
          tabs.push({
            to: {
              name: "UserPersonalCards",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserPersonalCards.modelName"),
            itemImagePath: imgUserPersonalCards,
            currentTab: "UserPersonalCards",
          });
        }
      } else if (this.outerCurrentTab == "ScientificData") {
        if (this.hasUserQualification()) {
          tabs.push({
            to: {
              name: "UserQualifications",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserQualifications.modelName"),
            itemImagePath: imgUserQualifications,
            currentTab: "UserQualifications",
          });
        }
        if (this.hasUserTrainingCourse()) {
          tabs.push({
            to: {
              name: "UserTrainingCourses",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserTrainingCourses.modelName"),
            itemImagePath: imgUserTrainingCourses,
            currentTab: "UserTrainingCourses",
          });
        }
        if (this.hasUserExperience()) {
          tabs.push({
            to: {
              name: "UserExperiences",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserExperiences.modelName"),
            itemImagePath: imgUserExperiences,
            currentTab: "UserExperiences",
          });
        }
        if (this.hasUserScientificDegree()) {
          tabs.push({
            to: {
              name: "UserScientificDegrees",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserScientificDegrees.modelName"),
            itemImagePath: imgUserScientificDegrees,
            currentTab: "UserScientificDegrees",
          });
        }
      } else if (this.outerCurrentTab == "MedicalData") {
        if (this.hasUserInjury()) {
          tabs.push({
            to: {
              name: "UserInjuries",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserInjuries.modelName"),
            itemImagePath: imgUserInjuries,
            currentTab: "UserInjuries",
          });
        }
        if (this.hasUserOperation()) {
          tabs.push({
            to: {
              name: "UserOperations",
              params: {
                userToken: this.userToken,
                userTypeToken: this.userTypeToken,
              },
            },
            itemName: this.$t("UserOperations.modelName"),
            itemImagePath: imgUserOperations,
            currentTab: "UserOperations",
          });
        }
      }
      return tabs;
    },
  },
  methods: {
    checkPrivilege,
    hasUserFamily() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptFamily());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminFamily());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeFamily());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentFamily());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierFamily());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientFamily());
          break;
      }
      return status;
    },
    hasUserQualification() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptQualification());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminQualification());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeQualification());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentQualification());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierQualification());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentQualification());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientQualification());
          break;
      }
      return status;
    },
    hasUserPersonalCard() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptPersonalCard());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminPersonalCard());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeePersonalCard());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCard());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierPersonalCard());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCard());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCard());
          break;
      }
      return status;
    },
    hasUserTrainingCourse() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptTrainingCourse());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminTrainingCourse());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeTrainingCourse());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentTrainingCourse());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierTrainingCourse());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentTrainingCourse());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientTrainingCourse());
          break;
      }
      return status;
    },
    hasUserExperience() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptExperience());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminExperience());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperience());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperience());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperience());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperience());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperience());
          break;
      }
      return status;
    },
    hasUserInjury() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptInjury());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminInjury());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeInjury());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentInjury());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierInjury());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentInjury());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientInjury());
          break;
      }
      return status;
    },
    hasUserOperation() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptOperation());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminOperation());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeOperation());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentOperation());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierOperation());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentOperation());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientOperation());
          break;
      }
      return status;
    },
    hasUserScientificDegree() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptScientificDegree());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminScientificDegree());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeScientificDegree());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentScientificDegree());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierScientificDegree());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentScientificDegree());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientScientificDegree());
          break;
      }
      return status;
    },

    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
    goToFirstInnerTab() {
      let firstInnerTabPath = this.userTabs[0].to;
      this.goTo(firstInnerTabPath);
    },
    updateOuterCurrentTab(tab) {
      this.outerCurrentTabData = tab;
    },
  },
  watch: {},
  async created() {},
};
</script>
