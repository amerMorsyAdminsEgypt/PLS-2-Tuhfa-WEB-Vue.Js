<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('services', $event)"
      :viewType="generalSetting.services.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.services.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Services.add')"
      :btnAddName="'ServiceAdd'"
      :btnAddStatus="checkPrivilege(hasServiceAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <ServicesTabs />

      <template v-if="hasData">
        <ServiceTable
          v-if="generalSetting.services.viewType == VIEW_TYPES.table"
          v-on:setServiceData="services.service.fillData($event)"
          :servicesData="services.servicesData"
          :defaultImg="services.service.defaultImg"
          :filterData="services.filterData"
        />

        <ServiceCards
          v-else-if="generalSetting.services.viewType == VIEW_TYPES.cards"
          v-on:setServiceData="services.service.fillData($event)"
          :servicesData="services.servicesData"
          :defaultImg="services.service.defaultImg"
          :filterData="services.filterData"
        />

        <ActionsData :actionsData="services.service" />
        <ServiceInfo :service="services.service" />
        <ServiceDelete
          :service="services.service"
          v-on:refresh="getAllServices()"
        />
        <ServiceChangeActivationType
          :service="services.service"
          v-on:refresh="getAllServices()"
        />
        <CustomBottomSheetQRCode
          :refName="'ServiceQRCode'"
          :code="services.service.fullCode"
          :codeTitle="$t('Services.code')"
          :name="services.service.serviceNameCurrent"
          :nameTitle="$t('Services.name')"
          :nameIcon="'services.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="services.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ServiceFilter
        :theFilterData="services.filterData"
        v-on:search="search($event)"
      />

      <ServiceAdd :service="services.service" v-on:refresh="getAllServices()" />
      <ServiceUpdate
        :service="services.service"
        v-on:refresh="getAllServices()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../utils/constants";
import { ACTIVATION_TYPE } from "./../../utils/constantLists";
import DashboardNavbar from "./../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import ServicesTabs from "./components/ServicesTabs.vue";
import ServiceAdd from "./components/ServiceAdd.vue";
import ServiceUpdate from "./components/ServiceUpdate.vue";
import ServiceCards from "./components/ServiceCards.vue";
import ServiceTable from "./components/ServiceTable.vue";
import ServiceInfo from "./components/ServiceInfo.vue";
import ServiceDelete from "./components/ServiceDelete.vue";
import ServiceChangeActivationType from "./components/ServiceChangeActivationType.vue";
import ServiceFilter from "./components/ServiceFilter.vue";
import Services from "./../../models/services/Services";
import apiService from "./../../api/service";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import {
  hasServiceAdd,
  hasServiceViewActive,
  hasServiceViewArchive,
  hasServiceViewBlocked,
} from "./../../utils/privilegeHelper";

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
    ServiceAdd,
    ServiceUpdate,
    ServiceCards,
    ServiceTable,
    ServiceInfo,
    ServiceDelete,
    ServiceChangeActivationType,
    ServiceFilter,
  },
  computed: {
    hasData() {
      return this.services.servicesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasServiceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.services.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasServiceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.services.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasServiceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.services.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      services: new Services(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasServiceAdd,
    changePagination(pagination) {
      this.services.filterData.fillData(pagination);
      this.getAllServices();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("services", data);
      this.services.filterData.activationTypeTokens = data;
      this.getAllServices();
    },
    search(data) {
      this.services.filterData.fillData(data);
      this.getAllServices();
    },
    async getAllServices() {
      this.isLoading = true;
      try {
        this.services.servicesData = [];
        const response = await apiService.getAll(this.services.filterData);
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
        this.services.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllServices();
  },
};
</script>
