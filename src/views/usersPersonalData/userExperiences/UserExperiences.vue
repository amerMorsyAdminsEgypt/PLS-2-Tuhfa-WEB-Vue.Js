<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType(modelName, $event)"
      :viewType="viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting[modelName].activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('UserExperiences.add')"
      :btnAddName="'UserExperienceAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
      :additionalSheetName="'UserInfo'"
      :additionalSheetTitle="$t('Users.data')"
      :additionalSheetIcon="'info.svg'"
      :additionalSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserInfo :userToken="user.userToken" />
      <UserDataTabs />

      <template v-if="hasData">
        <UserExperienceTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserExperienceData="
            userExperiences.userExperience.fillData($event)
          "
          :userExperiencesData="userExperiences.userExperiencesData"
          :defaultImg="userExperiences.userExperience.defaultImg"
          :filterData="userExperiences.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserExperienceCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserExperienceData="
            userExperiences.userExperience.fillData($event)
          "
          :userExperiencesData="userExperiences.userExperiencesData"
          :defaultImg="userExperiences.userExperience.defaultImg"
          :filterData="userExperiences.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userExperiences.userExperience" />
        <UserExperienceInfo :userExperience="userExperiences.userExperience" />
        <UserExperienceDelete
          :userExperience="userExperiences.userExperience"
          v-on:refresh="getAllUserExperiences()"
        />
        <UserExperienceChangeActivationType
          :userExperience="userExperiences.userExperience"
          v-on:refresh="getAllUserExperiences()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserExperienceQRCode'"
          :code="userExperiences.userExperience.fullCode"
          :codeTitle="$t('UserExperiences.code')"
          :name="userExperiences.userExperience.userExperienceNameCurrent"
          :nameTitle="$t('UserExperiences.name')"
          :nameIcon="'UserExperiences.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userExperiences.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserExperienceFilter
        :theFilterData="userExperiences.filterData"
        v-on:search="search($event)"
      />

      <UserExperienceAdd
        :userExperience="userExperiences.userExperience"
        v-on:refresh="getAllUserExperiences()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserExperienceUpdate
        :userExperience="userExperiences.userExperience"
        v-on:refresh="getAllUserExperiences()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE, USER_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import UserInfo from "./../../../components/users/UserInfo.vue";
// import MainTabs from "./../components/MainTabs.vue";
import UserDataTabs from "./../components/UserDataTabs.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import UserExperienceAdd from "./components/UserExperienceAdd.vue";
import UserExperienceUpdate from "./components/UserExperienceUpdate.vue";
import UserExperienceCards from "./components/UserExperienceCards.vue";
import UserExperienceTable from "./components/UserExperienceTable.vue";
import UserExperienceInfo from "./components/UserExperienceInfo.vue";
import UserExperienceDelete from "./components/UserExperienceDelete.vue";
import UserExperienceChangeActivationType from "./components/UserExperienceChangeActivationType.vue";
import UserExperienceFilter from "./components/UserExperienceFilter.vue";
import UserExperiences from "./../../../models/usersPersonalData/userExperiences/UserExperiences";
import apiUserExperience from "./../../../api/usersPersonalData/userExperiences";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptExperienceAdd,
  hasAdminsEgyptExperienceViewActive,
  hasAdminsEgyptExperienceViewBlocked,
  hasAdminsEgyptExperienceViewArchive,
  hasMasterAdminExperienceAdd,
  hasMasterAdminExperienceViewActive,
  hasMasterAdminExperienceViewArchive,
  hasMasterAdminExperienceViewBlocked,
  hasEmployeeExperienceAdd,
  hasEmployeeExperienceViewActive,
  hasEmployeeExperienceViewArchive,
  hasEmployeeExperienceViewBlocked,
  hasStudentExperienceAdd,
  hasStudentExperienceViewActive,
  hasStudentExperienceViewArchive,
  hasStudentExperienceViewBlocked,
  hasSupplierExperienceAdd,
  hasSupplierExperienceViewActive,
  hasSupplierExperienceViewArchive,
  hasSupplierExperienceViewBlocked,
  hasParentExperienceAdd,
  hasParentExperienceViewActive,
  hasParentExperienceViewArchive,
  hasParentExperienceViewBlocked,
  hasClientExperienceAdd,
  hasClientExperienceViewActive,
  hasClientExperienceViewArchive,
  hasClientExperienceViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [UserDataMixin, generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    UserInfo,
    // MainTabs,
    UserDataTabs,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    UserExperienceAdd,
    UserExperienceUpdate,
    UserExperienceCards,
    UserExperienceTable,
    UserExperienceInfo,
    UserExperienceDelete,
    UserExperienceChangeActivationType,
    UserExperienceFilter,
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.userExperiences.userExperiencesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.modelName].viewType;
    },
    activationTypesTokensOptions: function () {
      let options = [];
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case USER_TYPE.MasterAdmin:
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case USER_TYPE.Employee:
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case USER_TYPE.Student:
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case USER_TYPE.Supplier:
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case USER_TYPE.Parent:
          options = this.getActivationTypeTokenOptionParent();
          break;
        case USER_TYPE.Client:
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },

    hasPrivilegeAdd() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptExperienceAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminExperienceAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeExperienceAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentExperienceAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierExperienceAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentExperienceAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientExperienceAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptExperience";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminExperience";
          break;
        case USER_TYPE.Employee:
          name = "employeeExperience";
          break;
        case USER_TYPE.Student:
          name = "studentExperience";
          break;
        case USER_TYPE.Supplier:
          name = "supplierExperience";
          break;
        case USER_TYPE.Parent:
          name = "parentExperience";
          break;
        case USER_TYPE.Client:
          name = "clientExperience";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userExperiences: new UserExperiences(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientExperienceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientExperienceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientExperienceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userExperiences.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userExperiences.filterData.fillData(pagination);
      this.getAllUserExperiences();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userExperiences.filterData.activationTypeTokens = data;
      this.getAllUserExperiences();
    },
    search(data) {
      this.userExperiences.filterData.fillData(data);
      this.getAllUserExperiences();
    },
    async getAllUserExperiences() {
      this.isLoading = true;
      try {
        this.userExperiences.filterData.userTypeToken = this.userTypeToken;
        this.userExperiences.filterData.userToken = this.userToken;
        this.userExperiences.filterData.userDataInclude = true;
        this.userExperiences.filterData.relativeRelationTypeDataInclude = true;

        this.userExperiences.userExperiencesData = [];
        const response = await apiUserExperience.getAll(
          this.userExperiences.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.userExperiences.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userExperiences.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserExperiences();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserExperiences();
      }
    },
  },
};
</script>
