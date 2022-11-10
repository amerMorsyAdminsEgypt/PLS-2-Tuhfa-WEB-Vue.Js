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
      :btnAddTitle="$t('UserValidSettings.add')"
      :btnAddName="'UserValidSettingAdd'"
      :btnAddStatus="hasPrivilegeAdd"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <UserSettingsTabs :key="userTypeToken" :userTypeToken="userTypeToken" />

      <template v-if="hasData">
        <UserValidSettingsTable
          v-if="viewType == VIEW_TYPES.table"
          v-on:setUserValidSettingData="setUserValidSettingData($event)"
          :userValidSettingsData="userValidSettings.userValidSettingsData"
          :defaultImg="userValidSettings.userValidSetting.defaultImg"
          :filterData="userValidSettings.filterData"
          :modelName="modelName"
        />

        <UserValidSettingsCards
          v-else-if="viewType == VIEW_TYPES.cards"
          v-on:setUserValidSettingData="setUserValidSettingData($event)"
          :userValidSettingsData="userValidSettings.userValidSettingsData"
          :defaultImg="userValidSettings.userValidSetting.defaultImg"
          :filterData="userValidSettings.filterData"
          :modelName="modelName"
        />

        <ActionsData :actionsData="userValidSettings.userValidSetting" />
        <UserValidSettingInfo
          :userValidSetting="userValidSettings.userValidSetting"
        />
        <UserValidSettingDelete
          :userValidSetting="userValidSettings.userValidSetting"
          v-on:refresh="refresh()"
        />
        <UserValidSettingChangeActivationType
          :userValidSetting="userValidSettings.userValidSetting"
          v-on:refresh="refresh()"
        />
        <CustomBottomSheetQRCode
          :refName="'UserValidSettingQRCode'"
          :code="userValidSettings.userValidSetting.fullCode"
          :codeTitle="$t('UserValidSettings.code')"
          :name="userValidSettings.userValidSetting.userValidSettingNameCurrent"
          :nameTitle="$t('UserValidSettings.name')"
          :nameIcon="'UserValidSettings.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="userValidSettings.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <UserValidSettingFilter
        :theFilterData="userValidSettings.filterData"
        v-on:search="search($event)"
      />

      <UserValidSettingAdd
        :userValidSetting="userValidSettings.userValidSetting"
        :userTypeToken="userTypeToken"
        v-on:refresh="refresh()"
      />
      <UserValidSettingUpdate
        :userValidSetting="userValidSettings.userValidSetting"
        v-on:refresh="refresh()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import UserValidSettingAdd from "./../../../components/settings/userValidSettings/UserValidSettingAdd.vue";
import UserValidSettingUpdate from "./../../../components/settings/userValidSettings/UserValidSettingUpdate.vue";
import UserValidSettingsCards from "./../../../components/settings/userValidSettings/UserValidSettingsCards.vue";
import UserValidSettingsTable from "./../../../components/settings/userValidSettings/UserValidSettingsTable.vue";
import UserSettingsTabs from "./../../../views/settings/UserSettingsTabs.vue";
import UserValidSettingInfo from "./../../../components/settings/userValidSettings/UserValidSettingInfo.vue";
import UserValidSettingDelete from "./../../../components/settings/userValidSettings/UserValidSettingDelete.vue";
import UserValidSettingChangeActivationType from "./../../../components/settings/userValidSettings/UserValidSettingChangeActivationType.vue";
import UserValidSettingFilter from "./../../../components/settings/userValidSettings/UserValidSettingFilter.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import UserValidSettings from "./../../../models/settings/userValidSettings/UserValidSettings";
import apiUserValidSetting from "./../../../api/settings/userValidSetting";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAdminsEgyptValidSettingViewActive,
  hasAdminsEgyptValidSettingViewArchive,
  hasAdminsEgyptValidSettingViewBlocked,
  hasMasterAdminValidSettingViewActive,
  hasMasterAdminValidSettingViewArchive,
  hasMasterAdminValidSettingViewBlocked,
  hasEmployeeValidSettingViewActive,
  hasEmployeeValidSettingViewArchive,
  hasEmployeeValidSettingViewBlocked,
  hasStudentValidSettingViewActive,
  hasStudentValidSettingViewArchive,
  hasStudentValidSettingViewBlocked,
  hasSupplierValidSettingViewActive,
  hasSupplierValidSettingViewArchive,
  hasSupplierValidSettingViewBlocked,
  hasParentValidSettingViewActive,
  hasParentValidSettingViewArchive,
  hasParentValidSettingViewBlocked,
  hasClientValidSettingViewActive,
  hasClientValidSettingViewArchive,
  hasClientValidSettingViewBlocked,
  hasAdminsEgyptValidSettingAdd,
  hasMasterAdminValidSettingAdd,
  hasEmployeeValidSettingAdd,
  hasStudentValidSettingAdd,
  hasSupplierValidSettingAdd,
  hasParentValidSettingAdd,
  hasClientValidSettingAdd,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    UserValidSettingAdd,
    UserValidSettingUpdate,
    UserValidSettingsCards,
    UserValidSettingsTable,
    UserSettingsTabs,
    UserValidSettingInfo,
    UserValidSettingDelete,
    UserValidSettingChangeActivationType,
    UserValidSettingFilter,
    CustomPagination,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.userValidSettings.userValidSettingsData.length != 0;
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
        case "adminsEgyptValidSetting":
          options = this.getActivationTypeTokenOptionAdminsEgypt();
          break;
        case "masterAdminValidSetting":
          options = this.getActivationTypeTokenOptionMasterAdmin();
          break;
        case "employeeValidSetting":
          options = this.getActivationTypeTokenOptionEmployee();
          break;
        case "studentValidSetting":
          options = this.getActivationTypeTokenOptionStudent();
          break;
        case "supplierValidSetting":
          options = this.getActivationTypeTokenOptionSupplier();
          break;
        case "parentValidSetting":
          options = this.getActivationTypeTokenOptionParent();
          break;
        case "clientValidSetting":
          options = this.getActivationTypeTokenOptionClient();
          break;
      }
      return options;
    },
    hasPrivilegeAdd() {
      let status = false;
      switch (this.modelName) {
        case "adminsEgyptValidSetting":
          status = checkPrivilege(hasAdminsEgyptValidSettingAdd());
          break;
        case "masterAdminValidSetting":
          status = checkPrivilege(hasMasterAdminValidSettingAdd());
          break;
        case "employeeValidSetting":
          status = checkPrivilege(hasEmployeeValidSettingAdd());
          break;
        case "studentValidSetting":
          status = checkPrivilege(hasStudentValidSettingAdd());
          break;
        case "supplierValidSetting":
          status = checkPrivilege(hasSupplierValidSettingAdd());
          break;
        case "parentValidSetting":
          status = checkPrivilege(hasParentValidSettingAdd());
          break;
        case "clientValidSetting":
          status = checkPrivilege(hasClientValidSettingAdd());
          break;
      }
      return status;
    },
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
  },
  data() {
    return {
      userValidSettings: new UserValidSettings(this.modelName),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    getActivationTypeTokenOptionAdminsEgypt() {
      let arr = [];
      if (checkPrivilege(hasAdminsEgyptValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAdminsEgyptValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionMasterAdmin() {
      let arr = [];
      if (checkPrivilege(hasMasterAdminValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasMasterAdminValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionEmployee() {
      let arr = [];
      if (checkPrivilege(hasEmployeeValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEmployeeValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionStudent() {
      let arr = [];
      if (checkPrivilege(hasStudentValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasStudentValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionSupplier() {
      let arr = [];
      if (checkPrivilege(hasSupplierValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasSupplierValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionParent() {
      let arr = [];
      if (checkPrivilege(hasParentValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasParentValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    getActivationTypeTokenOptionClient() {
      let arr = [];
      if (checkPrivilege(hasClientValidSettingViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientValidSettingViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasClientValidSettingViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.userValidSettings.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }

      return arr;
    },
    changePagination(pagination) {
      this.userValidSettings.filterData.fillData(pagination);
      this.getAllUserValidSettings();
    },
    setUserValidSettingData(data) {
      this.userValidSettings.userValidSetting.fillData(data);
    },
    async changeActivationType(data) {
      await this.updateActivationTypeTokens(this.modelName, data);
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllUserValidSettings();
      }, 1);
    },
    refresh() {
      setTimeout(() => {
        this.updateFilterData();
      }, 0);
      setTimeout(() => {
        this.getAllUserValidSettings();
      }, 1);
    },
    search(data = null) {
      if (data) this.userValidSettings.filterData.fillData(data);
      this.refresh();
    },
    async getAllUserValidSettings() {
      this.isLoading = true;
      try {
        this.userValidSettings.userValidSettingsData = [];
        const response = await apiUserValidSetting.getAll(
          this.userValidSettings.filterData
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
        this.userValidSettings.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateFilterData() {
      this.userValidSettings.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.userValidSettings.filterData.userTypeToken = this.userTypeToken;
      this.userValidSettings.userValidSetting.userTypeToken =
        this.userTypeToken;
    },
  },
  async created() {
    await this.updateFilterData();
    this.getAllUserValidSettings();
  },
};
</script>
