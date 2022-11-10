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
      :btnAddTitle="$t('UserTrainingCourses.add')"
      :btnAddName="'UserTrainingCourseAdd'"
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
        <UserTrainingCourseTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserTrainingCourseData="
            userTrainingCourses.userTrainingCourse.fillData($event)
          "
          :userTrainingCoursesData="userTrainingCourses.userTrainingCoursesData"
          :defaultImg="userTrainingCourses.userTrainingCourse.defaultImg"
          :filterData="userTrainingCourses.filterData"
          :userTypeToken="userTypeToken"
        />

        <UserTrainingCourseCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserTrainingCourseData="
            userTrainingCourses.userTrainingCourse.fillData($event)
          "
          :userTrainingCoursesData="userTrainingCourses.userTrainingCoursesData"
          :defaultImg="userTrainingCourses.userTrainingCourse.defaultImg"
          :filterData="userTrainingCourses.filterData"
          :userTypeToken="userTypeToken"
        />

        <ActionsData :actionsData="userTrainingCourses.userTrainingCourse" />
        <UserTrainingCourseInfo
          :userTrainingCourse="userTrainingCourses.userTrainingCourse"
        />
        <UserTrainingCourseDelete
          :userTrainingCourse="userTrainingCourses.userTrainingCourse"
          v-on:refresh="getAllUserTrainingCourses()"
        />
        <UserTrainingCourseChangeActivationType
          :userTrainingCourse="userTrainingCourses.userTrainingCourse"
          v-on:refresh="getAllUserTrainingCourses()"
          :userTypeToken="userTypeToken"
        />
        <CustomBottomSheetQRCode
          :refName="'UserTrainingCourseQRCode'"
          :code="userTrainingCourses.userTrainingCourse.fullCode"
          :codeTitle="$t('UserTrainingCourses.code')"
          :name="
            userTrainingCourses.userTrainingCourse.userTrainingCourseNameCurrent
          "
          :nameTitle="$t('UserTrainingCourses.name')"
          :nameIcon="'UserTrainingCourses.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userTrainingCourses.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserTrainingCourseFilter
        :theFilterData="userTrainingCourses.filterData"
        v-on:search="search($event)"
      />

      <UserTrainingCourseAdd
        :userTrainingCourse="userTrainingCourses.userTrainingCourse"
        v-on:refresh="getAllUserTrainingCourses()"
        :userToken="userToken"
        :userTypeToken="userTypeToken"
      />
      <UserTrainingCourseUpdate
        :userTrainingCourse="userTrainingCourses.userTrainingCourse"
        v-on:refresh="getAllUserTrainingCourses()"
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
import UserTrainingCourseAdd from "./components/UserTrainingCourseAdd.vue";
import UserTrainingCourseUpdate from "./components/UserTrainingCourseUpdate.vue";
import UserTrainingCourseCards from "./components/UserTrainingCourseCards.vue";
import UserTrainingCourseTable from "./components/UserTrainingCourseTable.vue";
import UserTrainingCourseInfo from "./components/UserTrainingCourseInfo.vue";
import UserTrainingCourseDelete from "./components/UserTrainingCourseDelete.vue";
import UserTrainingCourseChangeActivationType from "./components/UserTrainingCourseChangeActivationType.vue";
import UserTrainingCourseFilter from "./components/UserTrainingCourseFilter.vue";
import UserTrainingCourses from "./../../../models/usersPersonalData/userTrainingCourses/UserTrainingCourses";
import apiUserTrainingCourse from "./../../../api/usersPersonalData/userTrainingCourses";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import UserDataMixin from "./../UserDataMixin";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptTrainingCourseAdd,
  hasAdminsEgyptTrainingCourseViewActive,
  hasAdminsEgyptTrainingCourseViewBlocked,
  hasAdminsEgyptTrainingCourseViewArchive,
  hasMasterAdminTrainingCourseAdd,
  hasMasterAdminTrainingCourseViewActive,
  hasMasterAdminTrainingCourseViewArchive,
  hasMasterAdminTrainingCourseViewBlocked,
  hasEmployeeTrainingCourseAdd,
  hasEmployeeTrainingCourseViewActive,
  hasEmployeeTrainingCourseViewArchive,
  hasEmployeeTrainingCourseViewBlocked,
  hasStudentTrainingCourseAdd,
  hasStudentTrainingCourseViewActive,
  hasStudentTrainingCourseViewArchive,
  hasStudentTrainingCourseViewBlocked,
  hasSupplierTrainingCourseAdd,
  hasSupplierTrainingCourseViewActive,
  hasSupplierTrainingCourseViewArchive,
  hasSupplierTrainingCourseViewBlocked,
  hasParentTrainingCourseAdd,
  hasParentTrainingCourseViewActive,
  hasParentTrainingCourseViewArchive,
  hasParentTrainingCourseViewBlocked,
  hasClientTrainingCourseAdd,
  hasClientTrainingCourseViewActive,
  hasClientTrainingCourseViewArchive,
  hasClientTrainingCourseViewBlocked,
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
    UserTrainingCourseAdd,
    UserTrainingCourseUpdate,
    UserTrainingCourseCards,
    UserTrainingCourseTable,
    UserTrainingCourseInfo,
    UserTrainingCourseDelete,
    UserTrainingCourseChangeActivationType,
    UserTrainingCourseFilter,
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
      return this.userTrainingCourses.userTrainingCoursesData.length != 0;
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
          status = checkPrivilege(hasAdminsEgyptTrainingCourseAdd());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminTrainingCourseAdd());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeTrainingCourseAdd());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentTrainingCourseAdd());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierTrainingCourseAdd());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentTrainingCourseAdd());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientTrainingCourseAdd());
          break;
      }
      return status;
    },
    modelName: function () {
      let name = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          name = "adminsEgyptTrainingCourse";
          break;
        case USER_TYPE.MasterAdmin:
          name = "masterAdminTrainingCourse";
          break;
        case USER_TYPE.Employee:
          name = "employeeTrainingCourse";
          break;
        case USER_TYPE.Student:
          name = "studentTrainingCourse";
          break;
        case USER_TYPE.Supplier:
          name = "supplierTrainingCourse";
          break;
        case USER_TYPE.Parent:
          name = "parentTrainingCourse";
          break;
        case USER_TYPE.Client:
          name = "clientTrainingCourse";
          break;
      }
      return name;
    },
  },
  data() {
    return {
      userTrainingCourses: new UserTrainingCourses(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      tabPrivilages: {},
      mainCurrentTab: "",
    };
  },
  methods: {
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientTrainingCourseViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientTrainingCourseViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientTrainingCourseViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userTrainingCourses.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userTrainingCourses.filterData.fillData(pagination);
      this.getAllUserTrainingCourses();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens(this.modelName, data);
      this.userTrainingCourses.filterData.activationTypeTokens = data;
      this.getAllUserTrainingCourses();
    },
    search(data) {
      this.userTrainingCourses.filterData.fillData(data);
      this.getAllUserTrainingCourses();
    },
    async getAllUserTrainingCourses() {
      this.isLoading = true;
      try {
        this.userTrainingCourses.filterData.userTypeToken = this.userTypeToken;
        this.userTrainingCourses.filterData.userToken = this.userToken;
        this.userTrainingCourses.filterData.userDataInclude = true;
        this.userTrainingCourses.filterData.relativeRelationTypeDataInclude = true;

        this.userTrainingCourses.userTrainingCoursesData = [];
        const response = await apiUserTrainingCourse.getAll(
          this.userTrainingCourses.filterData
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
        this.userTrainingCourses.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userTrainingCourses.filterData.activationTypeTokens =
      this.generalSetting[this.modelName].activationTypeTokens;
    if (this.userDetailsLoaded) {
      this.getAllUserTrainingCourses();
    }
  },
  watch: {
    userDetailsLoaded: function (val) {
      if (val) {
        this.getAllUserTrainingCourses();
      }
    },
  },
};
</script>
