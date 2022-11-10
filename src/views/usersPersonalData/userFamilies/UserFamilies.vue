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
      :btnAddTitle="$t('UserFamilies.add')"
      :btnAddName="'UserFamilyAdd'"
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
      <!-- <MainTabs
        v-if="tabPrivilages"
        :tabPrivilages="tabPrivilages"
        :mainCurrentTab="mainCurrentTab"
        @mainCurrentTabUpdated="mainCurrentTab = $event"
      />
      <UserDataTabs
        :key="mainCurrentTab"
        :mainCurrentTab="mainCurrentTab"
        @tabPrivilages="tabPrivilages = $event"
      /> -->
      <UserDataTabs />

      <template v-if="hasData">
        <UserFamilyTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserFamilyData="userFamilies.userFamily.fillData($event)"
          :userFamiliesData="userFamilies.userFamiliesData"
          :defaultImg="userFamilies.userFamily.defaultImg"
          :filterData="userFamilies.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserFamilyCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserFamilyData="userFamilies.userFamily.fillData($event)"
          :userFamiliesData="userFamilies.userFamiliesData"
          :defaultImg="userFamilies.userFamily.defaultImg"
          :filterData="userFamilies.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userFamilies.userFamily" />
        <UserFamilyInfo :token="userFamilies.userFamily.userFamilyToken" />
        <UserFamilyDelete
          :userFamily="userFamilies.userFamily"
          v-on:refresh="getAllUserFamilies()"
        />
        <UserFamilyChangeActivationType
          :userFamily="userFamilies.userFamily"
          v-on:refresh="getAllUserFamilies()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserFamilyQRCode'"
          :code="userFamilies.userFamily.fullCode"
          :codeTitle="$t('UserFamilies.code')"
          :name="userFamilies.userFamily.userFamilyNameCurrent"
          :nameTitle="$t('UserFamilies.name')"
          :nameIcon="'UserFamilies.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userFamilies.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserFamilyFilter
        :theFilterData="userFamilies.filterData"
        v-on:search="search($event)"
      />

      <UserFamilyAdd
        :userFamily="userFamilies.userFamily"
        v-on:refresh="getAllUserFamilies()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
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
import UserDataTabs from "./../components/UserDataTabs.vue";
import UserInfo from "./../../../components/users/UserInfo.vue";
// import MainTabs from "./../components/MainTabs.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import UserFamilyAdd from "./components/UserFamilyAdd.vue";
import UserFamilyCards from "./components/UserFamilyCards.vue";
import UserFamilyTable from "./components/UserFamilyTable.vue";
import UserFamilyInfo from "./components/UserFamilyInfo.vue";
import UserFamilyDelete from "./components/UserFamilyDelete.vue";
import UserFamilyChangeActivationType from "./components/UserFamilyChangeActivationType.vue";
import UserFamilyFilter from "./components/UserFamilyFilter.vue";
import UserFamilies from "./../../../models/usersPersonalData/userFamilies/UserFamilies";
import apiUserFamily from "./../../../api/usersPersonalData/userFamilies";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptFamilyAdd,
  hasAdminsEgyptFamilyViewActive,
  hasAdminsEgyptFamilyViewBlocked,
  hasAdminsEgyptFamilyViewArchive,
  hasMasterAdminFamilyAdd,
  hasMasterAdminFamilyViewActive,
  hasMasterAdminFamilyViewArchive,
  hasMasterAdminFamilyViewBlocked,
  hasEmployeeFamilyAdd,
  hasEmployeeFamilyViewActive,
  hasEmployeeFamilyViewArchive,
  hasEmployeeFamilyViewBlocked,
  hasStudentFamilyAdd,
  hasStudentFamilyViewActive,
  hasStudentFamilyViewArchive,
  hasStudentFamilyViewBlocked,
  hasSupplierFamilyAdd,
  hasSupplierFamilyViewActive,
  hasSupplierFamilyViewArchive,
  hasSupplierFamilyViewBlocked,
  hasClientFamilyAdd,
  hasClientFamilyViewActive,
  hasClientFamilyViewArchive,
  hasClientFamilyViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [UserDataMixin, generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    UserInfo,
    UserDataTabs,
    // MainTabs,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    UserFamilyAdd,
    UserFamilyCards,
    UserFamilyTable,
    UserFamilyInfo,
    UserFamilyDelete,
    UserFamilyChangeActivationType,
    UserFamilyFilter,
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
      return this.userFamilies.userFamiliesData.length != 0;
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
          status = checkPrivilege(hasAdminsEgyptFamilyAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminFamilyAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeFamilyAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentFamilyAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierFamilyAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientFamilyAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptFamily";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminFamily";
          break;
        case USER_TYPE.Employee:
          name = "employeeFamily";
          break;
        case USER_TYPE.Student:
          name = "studentFamily";
          break;
        case USER_TYPE.Supplier:
          name = "supplierFamily";
          break;
        case USER_TYPE.Client:
          name = "clientFamily";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userFamilies: new UserFamilies(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptFamilyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptFamilyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptFamilyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminFamilyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminFamilyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminFamilyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeFamilyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeFamilyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeFamilyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentFamilyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentFamilyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentFamilyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierFamilyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierFamilyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierFamilyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientFamilyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientFamilyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientFamilyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userFamilies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userFamilies.filterData.fillData(pagination);
      this.getAllUserFamilies();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userFamilies.filterData.activationTypeTokens = data;
      this.getAllUserFamilies();
    },
    search(data) {
      this.userFamilies.filterData.fillData(data);
      this.getAllUserFamilies();
    },
    async getAllUserFamilies() {
      this.isLoading = true;
      try {
        this.userFamilies.filterData.userTypeToken = this.userTypeToken;
        this.userFamilies.filterData.userToken = this.userToken;
        this.userFamilies.filterData.userDataInclude = true;
        this.userFamilies.filterData.relativeRelationTypeDataInclude = true;

        this.userFamilies.userFamiliesData = [];
        const response = await apiUserFamily.getAll(
          this.userFamilies.filterData
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
        this.userFamilies.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userFamilies.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserFamilies();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserFamilies();
      }
    },
  },
};
</script>
