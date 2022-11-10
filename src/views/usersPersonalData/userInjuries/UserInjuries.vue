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
      :btnAddTitle="$t('UserInjuries.add')"
      :btnAddName="'UserInjuryAdd'"
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
        <UserInjuryTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserInjuryData="userInjuries.userInjury.fillData($event)"
          :userInjuriesData="userInjuries.userInjuriesData"
          :defaultImg="userInjuries.userInjury.defaultImg"
          :filterData="userInjuries.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserInjuryCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserInjuryData="userInjuries.userInjury.fillData($event)"
          :userInjuriesData="userInjuries.userInjuriesData"
          :defaultImg="userInjuries.userInjury.defaultImg"
          :filterData="userInjuries.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userInjuries.userInjury" />
        <UserInjuryInfo :userInjury="userInjuries.userInjury" />
        <UserInjuryDelete
          :userInjury="userInjuries.userInjury"
          :userTypeToken="userTypeToken"
          v-on:refresh="getAllUserInjuries()"
        />
        <UserInjuryChangeActivationType
          :userInjury="userInjuries.userInjury"
          v-on:refresh="getAllUserInjuries()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserInjuryQRCode'"
          :code="userInjuries.userInjury.fullCode"
          :codeTitle="$t('UserInjuries.code')"
          :name="userInjuries.userInjury.userInjuryNameCurrent"
          :nameTitle="$t('UserInjuries.name')"
          :nameIcon="'UserInjuries.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userInjuries.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserInjuryFilter
        :theFilterData="userInjuries.filterData"
        v-on:search="search($event)"
      />

      <UserInjuryAdd
        :userInjury="userInjuries.userInjury"
        v-on:refresh="getAllUserInjuries()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserInjuryUpdate
        :userInjury="userInjuries.userInjury"
        v-on:refresh="getAllUserInjuries()"
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
import UserInjuryAdd from "./components/UserInjuryAdd.vue";
import UserInjuryUpdate from "./components/UserInjuryUpdate.vue";
import UserInjuryCards from "./components/UserInjuryCards.vue";
import UserInjuryTable from "./components/UserInjuryTable.vue";
import UserInjuryInfo from "./components/UserInjuryInfo.vue";
import UserInjuryDelete from "./components/UserInjuryDelete.vue";
import UserInjuryChangeActivationType from "./components/UserInjuryChangeActivationType.vue";
import UserInjuryFilter from "./components/UserInjuryFilter.vue";
import UserInjuries from "./../../../models/usersPersonalData/userInjuries/UserInjuries";
import apiUserInjury from "./../../../api/usersPersonalData/userInjuries";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptInjuryAdd,
  hasAdminsEgyptInjuryViewActive,
  hasAdminsEgyptInjuryViewBlocked,
  hasAdminsEgyptInjuryViewArchive,
  hasMasterAdminInjuryAdd,
  hasMasterAdminInjuryViewActive,
  hasMasterAdminInjuryViewArchive,
  hasMasterAdminInjuryViewBlocked,
  hasEmployeeInjuryAdd,
  hasEmployeeInjuryViewActive,
  hasEmployeeInjuryViewArchive,
  hasEmployeeInjuryViewBlocked,
  hasStudentInjuryAdd,
  hasStudentInjuryViewActive,
  hasStudentInjuryViewArchive,
  hasStudentInjuryViewBlocked,
  hasSupplierInjuryAdd,
  hasSupplierInjuryViewActive,
  hasSupplierInjuryViewArchive,
  hasSupplierInjuryViewBlocked,
  hasParentInjuryAdd,
  hasParentInjuryViewActive,
  hasParentInjuryViewArchive,
  hasParentInjuryViewBlocked,
  hasClientInjuryAdd,
  hasClientInjuryViewActive,
  hasClientInjuryViewArchive,
  hasClientInjuryViewBlocked,
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
    UserInjuryAdd,
    UserInjuryUpdate,
    UserInjuryCards,
    UserInjuryTable,
    UserInjuryInfo,
    UserInjuryDelete,
    UserInjuryChangeActivationType,
    UserInjuryFilter,
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
      return this.userInjuries.userInjuriesData.length != 0;
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
          status = checkPrivilege(hasAdminsEgyptInjuryAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminInjuryAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeInjuryAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentInjuryAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierInjuryAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentInjuryAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientInjuryAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptInjury";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminInjury";
          break;
        case USER_TYPE.Employee:
          name = "employeeInjury";
          break;
        case USER_TYPE.Student:
          name = "studentInjury";
          break;
        case USER_TYPE.Supplier:
          name = "supplierInjury";
          break;
        case USER_TYPE.Parent:
          name = "parentInjury";
          break;
        case USER_TYPE.Client:
          name = "clientInjury";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userInjuries: new UserInjuries(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientInjuryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientInjuryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientInjuryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userInjuries.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userInjuries.filterData.fillData(pagination);
      this.getAllUserInjuries();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userInjuries.filterData.activationTypeTokens = data;
      this.getAllUserInjuries();
    },
    search(data) {
      this.userInjuries.filterData.fillData(data);
      this.getAllUserInjuries();
    },
    async getAllUserInjuries() {
      this.isLoading = true;
      try {
        this.userInjuries.filterData.userTypeToken = this.userTypeToken;
        this.userInjuries.filterData.userToken = this.userToken;
        this.userInjuries.filterData.userDataInclude = true;
        this.userInjuries.filterData.injuryTypeDataInclude = true;
        this.userInjuries.filterData.bodyPartDataInclude = true;

        this.userInjuries.userInjuriesData = [];
        const response = await apiUserInjury.getAll(
          this.userInjuries.filterData
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
        this.userInjuries.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userInjuries.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserInjuries();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserInjuries();
      }
    },
  },
};
</script>
