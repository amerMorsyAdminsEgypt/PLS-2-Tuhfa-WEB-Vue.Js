<template>
  <div class="">
    <DashboardNavbar
      :btnAddTitle="$t('EmployeePayrollSettings.add')"
      :btnAddName="'EmployeePayrollSettingAdd'"
      :btnAddStatus="checkPrivilege(hasEmployeePayrollSettingAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <EmployeePayrollSettingTable
          v-on:setEmployeePayrollSettingData="
            employeePayrollSettings.employeePayrollSetting.fillData($event)
          "
          :employeePayrollSettingsData="
            employeePayrollSettings.employeePayrollSettingsData
          "
          :defaultImg="
            employeePayrollSettings.employeePayrollSetting.defaultImg
          "
          :filterData="employeePayrollSettings.filterData"
        />
        <ActionsData
          :actionsData="employeePayrollSettings.employeePayrollSetting"
        />
        <EmployeePayrollSettingInfo
          :employeePayrollSetting="
            employeePayrollSettings.employeePayrollSetting
          "
        />
        <EmployeePayrollSettingDelete
          :employeePayrollSetting="
            employeePayrollSettings.employeePayrollSetting
          "
          v-on:refresh="getAllEmployeePayrollSettings()"
        />

        <CustomBottomSheetQRCode
          :refName="'EmployeePayrollSettingQRCode'"
          :code="employeePayrollSettings.employeePayrollSetting.fullCode"
          :codeTitle="$t('EmployeePayrollSettings.code')"
          :name="
            employeePayrollSettings.employeePayrollSetting
              .employeePayrollSettingDescriptionCurrent
          "
          :nameTitle="$t('EmployeePayrollSettings.description')"
          :nameIcon="'employeePayrollSettings.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="employeePayrollSettings.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EmployeePayrollSettingFilter
        :theFilterData="employeePayrollSettings.filterData"
        v-on:search="search($event)"
      />

      <EmployeePayrollSettingAdd
        :employeePayrollSetting="
          employeePayrollSettings.employeePayrollSettingModel
        "
        v-on:refresh="getAllEmployeePayrollSettings()"
      />
      <EmployeePayrollSettingUpdate
        :employeePayrollSetting="
          employeePayrollSettings.employeePayrollSettingModel
        "
        v-on:refresh="getAllEmployeePayrollSettings()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import EmployeePayrollSettingAdd from "./components/EmployeePayrollSettingAdd.vue";
import EmployeePayrollSettingUpdate from "./components/EmployeePayrollSettingUpdate.vue";
import EmployeePayrollSettingTable from "./components/EmployeePayrollSettingTable.vue";
import EmployeePayrollSettingInfo from "./components/EmployeePayrollSettingInfo.vue";
import EmployeePayrollSettingDelete from "./components/EmployeePayrollSettingDelete.vue";
import EmployeePayrollSettingFilter from "./components/EmployeePayrollSettingFilter.vue";
import EmployeePayrollSettings from "./../../../../models/settings/settingsOthers/employeePayrollSettings/EmployeePayrollSettings";
import apiEmployeePayrollSetting from "./../../../../api/settings/settingsOthers/employeePayrollSettings";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import { hasEmployeePayrollSettingAdd } from "./../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EmployeePayrollSettingAdd,
    EmployeePayrollSettingUpdate,
    EmployeePayrollSettingTable,
    EmployeePayrollSettingInfo,
    EmployeePayrollSettingDelete,
    EmployeePayrollSettingFilter,
  },
  computed: {
    hasData() {
      return (
        this.employeePayrollSettings.employeePayrollSettingsData.length != 0
      );
    },
  },
  data() {
    return {
      employeePayrollSettings: new EmployeePayrollSettings(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasEmployeePayrollSettingAdd,
    changePagination(pagination) {
      this.employeePayrollSettings.filterData.fillData(pagination);
      this.getAllEmployeePayrollSettings();
    },
    search(data) {
      this.employeePayrollSettings.filterData.fillData(data);
      this.getAllEmployeePayrollSettings();
    },
    async getAllEmployeePayrollSettings() {
      this.isLoading = true;
      try {
        this.employeePayrollSettings.employeePayrollSettingsData = [];
        const response = await apiEmployeePayrollSetting.getAll(
          this.employeePayrollSettings.filterData
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
        this.employeePayrollSettings.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllEmployeePayrollSettings();
  },
};
</script>
