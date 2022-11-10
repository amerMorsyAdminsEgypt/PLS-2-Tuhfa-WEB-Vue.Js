<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType(modelName, $event)"
      :viewType="viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypesTokensOptions="getActivationTypeTokenOptions"
      :activationTypeTokens="activationTypeTokens"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Users.add')"
      :btnAddName="'UserAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserSettingsTabs :key="userTypeToken" :userTypeToken="userTypeToken" />

      <template v-if="hasData">
        <UsersTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserTokenReset="userTokenReset = $event"
          v-on:setIsResetTypeLoginCode="isResetTypeLoginCode = $event"
          v-on:setUserData="
            setUserData($event);
            filterReportEmployee.employeeUserToken = $event.userToken;
            filterReportStudent.studentUserToken = $event.userToken;
          "
          v-on:updateAndGetUserFinanceStatistic="
            updateAndGetUserFinanceStatistic($event)
          "
          :usersData="users.usersData"
          :defaultImg="users.user.defaultImg"
          :filterData="users.filterData"
          :modelName="modelName"
        />
        <UsersCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserTokenReset="userTokenReset = $event"
          v-on:setIsResetTypeLoginCode="isResetTypeLoginCode = $event"
          v-on:setUserData="
            setUserData($event);
            filterReportEmployee.employeeUserToken = $event.userToken;
            filterReportStudent.studentUserToken = $event.userToken;
          "
          v-on:updateAndGetUserFinanceStatistic="
            updateAndGetUserFinanceStatistic($event)
          "
          :usersData="users.usersData"
          :defaultImg="users.user.defaultImg"
          :filterData="users.filterData"
          :modelName="modelName"
        />

        <StudentCardIdsReportFilter
          :userToken="users.user.userToken"
          v-on:isLoading="isLoading = $event"
        />
        <StudentScheduleExamTimesReportFilter
          :studentUserToken="users.user.userToken"
          v-on:isLoading="isLoading = $event"
        />
        <EducationalScheduleTimeEmployeeReportFilter
          :filterReport="filterReportEmployee"
          v-on:isLoading="isLoading = $event"
        />

        <EducationalScheduleTimeStudentReportFilter
          :filterReport="filterReportStudent"
          v-on:isLoading="isLoading = $event"
        />

        <ActionsData :actionsData="users.user" />

        <UserFinanceStatistic
          :token="userTokenKey"
          :userFinanceStatistic="userFinanceStatisticData"
        />
        <UserInfo :userToken="users.user.userToken" />
        <UserDelete :user="users.user" v-on:refresh="refresh()" />
        <UserChangeActivationType :user="users.user" v-on:refresh="refresh()" />
        <CustomBottomSheetQRCode
          :refName="'UserQRCode'"
          :code="users.user.fullCode"
          :codeTitle="$t('Users.code')"
          :name="users.user.userNameCurrent"
          :nameTitle="$t('Users.name')"
          :nameIcon="'users.svg'"
        />
        <UserLoginCodeReset
          :userTypeToken="userTypeToken"
          :modelName="modelNameReset"
          :userToken="userTokenReset"
          :isResetTypeLoginCode="isResetTypeLoginCode"
          v-on:refresh="refresh()"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="users.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserFilter
        :theFilterData="users.filterData"
        v-on:search="search($event)"
      />

      <UserAdd
        :user="users.userModel"
        :userTypeToken="userTypeToken"
        v-on:refresh="refresh()"
      />
      <UserUpdate
        :userToken="users.user.userToken"
        :userTypeToken="userTypeToken"
        v-on:refresh="refresh()"
      />
      <UserChangePassword :userToken="users.user.userToken" />
    </div>
  </div>
</template>

<script>
import UserLoginCodeReset from "./../../views/settings/userLoginCodes/components/UserLoginCodeReset.vue";
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import { ACTIVATION_TYPE } from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import UserAdd from "./../../components/users/UserAdd.vue";
import UserChangePassword from "./../../components/users/UserChangePassword.vue";
import UserUpdate from "./../../components/users/UserUpdate.vue";
import UsersCards from "./../../components/users/UsersCards.vue";
import UsersTable from "./../../components/users/UsersTable.vue";
import UserSettingsTabs from "./../../views/settings/UserSettingsTabs.vue";
import StudentScheduleExamTimesReportFilter from "./../../views/reports/components/StudentScheduleExamTimesReportFilter.vue";
import StudentCardIdsReportFilter from "./../../views/reports/components/StudentCardIdsReportFilter.vue";
import EducationalScheduleTimeEmployeeReportFilter from "./../../views/reports/components/EducationalScheduleTimeEmployeeReportFilter.vue";
import EducationalScheduleTimeStudentReportFilter from "./../../views/reports/components/EducationalScheduleTimeStudentReportFilter.vue";
import UserFinanceStatistic from "./../../components/users/UserFinanceStatistic.vue";
import UserInfo from "./../../components/users/UserInfo.vue";
import UserDelete from "./../../components/users/UserDelete.vue";
import UserChangeActivationType from "./../../components/users/UserChangeActivationType.vue";
import UserFilter from "./../../components/users/UserFilter.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import Users from "./../../models/users/Users";
import UserFinanceStatisticData from "./../../models/users/UserFinanceStatisticData";
import EducationalScheduleTimes from "./../../models/educational/educationalScheduleTimes/EducationalScheduleTimes";
import apiUser from "./../../api/user";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import { checkPrivilege, objectToFormData } from "./../../utils/functions";
import { FILTER_REPORT_TYPES } from "./../../utils/constants";

import {
  hasAdminsEgyptAdd,
  hasAdminsEgyptViewActive,
  hasAdminsEgyptViewBlocked,
  hasAdminsEgyptViewArchive,
  hasMasterAdminAdd,
  hasMasterAdminViewActive,
  hasMasterAdminViewArchive,
  hasMasterAdminViewBlocked,
  hasEmployeeAdd,
  hasEmployeeViewActive,
  hasEmployeeViewArchive,
  hasEmployeeViewBlocked,
  hasStudentAdd,
  hasStudentViewActive,
  hasStudentViewArchive,
  hasStudentViewBlocked,
  hasSupplierAdd,
  hasSupplierViewActive,
  hasSupplierViewArchive,
  hasSupplierViewBlocked,
  hasParentAdd,
  hasParentViewActive,
  hasParentViewArchive,
  hasParentViewBlocked,
  hasClientAdd,
  hasClientViewActive,
  hasClientViewArchive,
  hasClientViewBlocked,
} from "./../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    UserLoginCodeReset,
    StudentScheduleExamTimesReportFilter,
    StudentCardIdsReportFilter,
    EducationalScheduleTimeEmployeeReportFilter,
    EducationalScheduleTimeStudentReportFilter,
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    UserAdd,
    UserChangePassword,
    UserUpdate,
    UsersCards,
    UsersTable,
    UserSettingsTabs,
    UserFinanceStatistic,
    UserInfo,
    UserDelete,
    UserChangeActivationType,
    UserFilter,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["generalSetting", "usersPrivilegeData"]),
    hasData() {
      return this.users.usersData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.modelName].viewType;
    },
    activationTypeTokens() {
      return this.generalSetting[this.modelName].activationTypeTokens;
    },
    getActivationTypeTokenOptions() {
      let options = [];
      switch (this.modelName) {
        case "adminsEgypt":
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case "masterAdmins":
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case "employees":
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case "students":
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case "suppliers":
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case "parents":
          options = this.getActivationTypeTokenOptionParent();
          break;
        case "clients":
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },

    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgypt":
          status = checkPrivilege(this.hasAdminsEgyptAdd());
          break;
        case "masterAdmins":
          status = checkPrivilege(this.hasMasterAdminAdd());
          break;
        case "employees":
          status = checkPrivilege(this.hasEmployeeAdd());
          break;
        case "students":
          status = checkPrivilege(this.hasStudentAdd());
          break;
        case "suppliers":
          status = checkPrivilege(this.hasSupplierAdd());
          break;
        case "parents":
          status = checkPrivilege(this.hasParentAdd());
          break;
        case "clients":
          status = checkPrivilege(this.hasClientAdd());
          break;
      }
      return status;
    },

    modelNameReset() {
      let status = "";
      switch (this.modelName) {
        case "adminsEgypt":
          status = "adminsEgyptLoginCode";
          break;
        case "masterAdmins":
          status = "masterAdminLoginCode";
          break;
        case "employees":
          status = "employeeLoginCode";
          break;
        case "students":
          status = "studentLoginCode";
          break;
        case "suppliers":
          status = "supplierLoginCode";
          break;
        case "parents":
          status = "parentLoginCode";
          break;
        case "clients":
          status = "clientLoginCode";
          break;
      }
      return status;
    },
  },
  data() {
    return {
      filterReportEmployee: new EducationalScheduleTimes(
        FILTER_REPORT_TYPES.Employee
      ).filterReport,
      filterReportStudent: new EducationalScheduleTimes(
        FILTER_REPORT_TYPES.Student
      ).filterReport,
      users: new Users(this.modelName),
      userTokenKey: "",
      userTokenReset: "",
      isResetTypeLoginCode: true,
      userFinanceStatisticData: new UserFinanceStatisticData(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,
    objectToFormData,
    hasAdminsEgyptAdd,
    hasAdminsEgyptViewActive,
    hasAdminsEgyptViewBlocked,
    hasAdminsEgyptViewArchive,

    hasMasterAdminAdd,
    hasMasterAdminViewActive,
    hasMasterAdminViewArchive,
    hasMasterAdminViewBlocked,

    hasEmployeeAdd,
    hasEmployeeViewActive,
    hasEmployeeViewArchive,
    hasEmployeeViewBlocked,

    hasStudentAdd,
    hasStudentViewActive,
    hasStudentViewArchive,
    hasStudentViewBlocked,

    hasSupplierAdd,
    hasSupplierViewActive,
    hasSupplierViewArchive,
    hasSupplierViewBlocked,

    hasParentAdd,
    hasParentViewActive,
    hasParentViewArchive,
    hasParentViewBlocked,

    hasClientAdd,
    hasClientViewActive,
    hasClientViewArchive,
    hasClientViewBlocked,

    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(this.hasAdminsEgyptViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasAdminsEgyptViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasAdminsEgyptViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(this.hasMasterAdminViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasMasterAdminViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasMasterAdminViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(this.hasEmployeeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasEmployeeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasEmployeeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(this.hasStudentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasStudentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasStudentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(this.hasSupplierViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasSupplierViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasSupplierViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(this.hasParentViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasParentViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasParentViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(this.hasClientViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.users.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasClientViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.users.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(this.hasClientViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.users.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    async updateAndGetUserFinanceStatistic(userToken) {
      this.isLoading = true;
      try {
        let formData = objectToFormData({
          userToken: userToken,
        });
        const response = await apiUser.updateAndGetUserFinanceStatistic(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.userTokenKey = userToken;
          await this.userFinanceStatisticData.fillData(
            response.data.userFinanceStatisticData
          );
          this.openBottomSheet("UserFinanceStatistic");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    setUserData(data) {
      this.users.user.fillData(data);
      this.users.userModel.fillData(data);
    },
    changePagination(pagination) {
      this.users.filterData.fillData(pagination);
      this.getAllUsers();
    },
    async changeActivationType(data) {
      await this.updateActivationTypeTokens(this.modelName, data);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllUsers();
      }, 1);
    },
    refresh() {
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllUsers();
      }, 1);
    },
    search(data = null) {
      if (data) this.users.filterData.fillData(data);
      this.refresh();
    },
    async getAllUsers() {
      this.isLoading = true;
      try {
        // this.users.filterData.userStatisticDataInclude = true;
        this.users.usersData = [];
        const response = await apiUser.getAll(this.users.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.users.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.users.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.users.filterData.userTypeToken = this.userTypeToken;
      this.users.user.userTypeToken = this.userTypeToken;
    },
  },
  async created() {
    this.users.filterData.userToken = this.userToken;
    await this.updateFilterData();
    await this.getAllUsers();
  },

  watch: {},
};
</script>
