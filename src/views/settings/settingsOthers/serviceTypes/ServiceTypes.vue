<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('serviceTypes', $event)"
      :viewType="generalSetting.serviceTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.serviceTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ServiceTypes.add')"
      :btnAddName="'ServiceTypeAdd'"
      :btnAddStatus="checkPrivilege(hasServiceTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <ServicesTabs />

      <template v-if="hasData">
        <ServiceTypeTable
          v-if="generalSetting.serviceTypes.viewType == VIEW_TYPES.table"
          v-on:setServiceTypeData="serviceTypes.serviceType.fillData($event)"
          :serviceTypesData="serviceTypes.serviceTypesData"
          :defaultImg="serviceTypes.serviceType.defaultImg"
          :filterData="serviceTypes.filterData"
        />

        <ServiceTypeCards
          v-else-if="generalSetting.serviceTypes.viewType == VIEW_TYPES.cards"
          v-on:setServiceTypeData="serviceTypes.serviceType.fillData($event)"
          :serviceTypesData="serviceTypes.serviceTypesData"
          :defaultImg="serviceTypes.serviceType.defaultImg"
          :filterData="serviceTypes.filterData"
        />

        <ActionsData :actionsData="serviceTypes.serviceType" />
        <ServiceTypeInfo :serviceType="serviceTypes.serviceType" />
        <ServiceTypeDelete
          :serviceType="serviceTypes.serviceType"
          v-on:refresh="getAllServiceTypes()"
        />
        <ServiceTypeChangeActivationType
          :serviceType="serviceTypes.serviceType"
          v-on:refresh="getAllServiceTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'ServiceTypeQRCode'"
          :code="serviceTypes.serviceType.fullCode"
          :codeTitle="$t('ServiceTypes.code')"
          :name="serviceTypes.serviceType.serviceTypeNameCurrent"
          :nameTitle="$t('ServiceTypes.name')"
          :nameIcon="'serviceTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="serviceTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ServiceTypeFilter
        :theFilterData="serviceTypes.filterData"
        v-on:search="search($event)"
      />

      <ServiceTypeAdd
        :serviceType="serviceTypes.serviceType"
        v-on:refresh="getAllServiceTypes()"
      />
      <ServiceTypeUpdate
        :serviceType="serviceTypes.serviceType"
        v-on:refresh="getAllServiceTypes()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import DashboardNavbar from "./../../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../../components/general/CustomPagination.vue";
import ServicesTabs from "./../../../services/components/ServicesTabs.vue";
import ServiceTypeAdd from "./components/ServiceTypeAdd.vue";
import ServiceTypeUpdate from "./components/ServiceTypeUpdate.vue";
import ServiceTypeCards from "./components/ServiceTypeCards.vue";
import ServiceTypeTable from "./components/ServiceTypeTable.vue";
import ServiceTypeInfo from "./components/ServiceTypeInfo.vue";
import ServiceTypeDelete from "./components/ServiceTypeDelete.vue";
import ServiceTypeChangeActivationType from "./components/ServiceTypeChangeActivationType.vue";
import ServiceTypeFilter from "./components/ServiceTypeFilter.vue";
import ServiceTypes from "./../../../../models/settings/settingsOthers/serviceTypes/ServiceTypes";
import apiServiceType from "./../../../../api/settings/settingsOthers/serviceTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasServiceTypeAdd,
  hasServiceTypeViewActive,
  hasServiceTypeViewArchive,
  hasServiceTypeViewBlocked,
} from "./../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    ServicesTabs,
    ServiceTypeAdd,
    ServiceTypeUpdate,
    ServiceTypeCards,
    ServiceTypeTable,
    ServiceTypeInfo,
    ServiceTypeDelete,
    ServiceTypeChangeActivationType,
    ServiceTypeFilter,
  },
  computed: {
    hasData() {
      return this.serviceTypes.serviceTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasServiceTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.serviceTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasServiceTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.serviceTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasServiceTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.serviceTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      serviceTypes: new ServiceTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasServiceTypeAdd,
    changePagination(pagination) {
      this.serviceTypes.filterData.fillData(pagination);
      this.getAllServiceTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("serviceTypes", data);
      this.serviceTypes.filterData.activationTypeTokens = data;
      this.getAllServiceTypes();
    },
    search(data) {
      this.serviceTypes.filterData.fillData(data);
      this.getAllServiceTypes();
    },
    async getAllServiceTypes() {
      this.isLoading = true;
      try {
        this.serviceTypes.serviceTypesData = [];
        const response = await apiServiceType.getAll(
          this.serviceTypes.filterData
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
        this.serviceTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllServiceTypes();
  },
};
</script>
