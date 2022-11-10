<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('countedServices', $event)"
      :viewType="generalSetting.countedServices.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.countedServices.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('CountedServices.add')"
      :btnAddName="'CountedServiceAdd'"
      :btnAddStatus="checkPrivilege(hasCountedServiceAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <CountedServicesTabs />

      <template v-if="hasData">
        <CountedServiceTable
          v-if="generalSetting.countedServices.viewType == VIEW_TYPES.table"
          v-on:setCountedServiceData="
            countedServices.countedService.fillData($event)
          "
          :countedServicesData="countedServices.countedServicesData"
          :defaultImg="countedServices.countedService.defaultImg"
          :filterData="countedServices.filterData"
        />

        <CountedServiceCards
          v-else-if="
            generalSetting.countedServices.viewType == VIEW_TYPES.cards
          "
          v-on:setCountedServiceData="
            countedServices.countedService.fillData($event)
          "
          :countedServicesData="countedServices.countedServicesData"
          :defaultImg="countedServices.countedService.defaultImg"
          :filterData="countedServices.filterData"
        />

        <ActionsData :actionsData="countedServices.countedService" />
        <CountedServiceInfo :countedService="countedServices.countedService" />
        <CountedServiceDelete
          :countedService="countedServices.countedService"
          v-on:refresh="getAllCountedServices()"
        />
        <CountedServiceChangeActivationType
          :countedService="countedServices.countedService"
          v-on:refresh="getAllCountedServices()"
        />
        <CustomBottomSheetQRCode
          :refName="'CountedServiceQRCode'"
          :code="countedServices.countedService.fullCode"
          :codeTitle="$t('CountedServices.code')"
          :name="countedServices.countedService.countedServiceNameCurrent"
          :nameTitle="$t('CountedServices.name')"
          :nameIcon="'countedServices.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="countedServices.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <CountedServiceFilter
        :theFilterData="countedServices.filterData"
        v-on:search="search($event)"
      />

      <CountedServiceAdd
        :countedService="countedServices.countedService"
        v-on:refresh="getAllCountedServices()"
      />
      <CountedServiceUpdate
        :countedService="countedServices.countedService"
        v-on:refresh="getAllCountedServices()"
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
import CountedServicesTabs from "./components/CountedServicesTabs.vue";
import CountedServiceAdd from "./components/CountedServiceAdd.vue";
import CountedServiceUpdate from "./components/CountedServiceUpdate.vue";
import CountedServiceCards from "./components/CountedServiceCards.vue";
import CountedServiceTable from "./components/CountedServiceTable.vue";
import CountedServiceInfo from "./components/CountedServiceInfo.vue";
import CountedServiceDelete from "./components/CountedServiceDelete.vue";
import CountedServiceChangeActivationType from "./components/CountedServiceChangeActivationType.vue";
import CountedServiceFilter from "./components/CountedServiceFilter.vue";
import CountedServices from "./../../models/countedServices/CountedServices";
import apiCountedService from "./../../api/countedService";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../utils/generalMixin";
import generalSettingsMixin from "./../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../utils/functions";
import {
  hasCountedServiceAdd,
  hasCountedServiceViewActive,
  hasCountedServiceViewArchive,
  hasCountedServiceViewBlocked,
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
    CountedServicesTabs,
    CountedServiceAdd,
    CountedServiceUpdate,
    CountedServiceCards,
    CountedServiceTable,
    CountedServiceInfo,
    CountedServiceDelete,
    CountedServiceChangeActivationType,
    CountedServiceFilter,
  },
  computed: {
    hasData() {
      return this.countedServices.countedServicesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasCountedServiceViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.countedServices.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCountedServiceViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.countedServices.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCountedServiceViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.countedServices.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      countedServices: new CountedServices(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasCountedServiceAdd,
    changePagination(pagination) {
      this.countedServices.filterData.fillData(pagination);
      this.getAllCountedServices();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("countedServices", data);
      this.countedServices.filterData.activationTypeTokens = data;
      this.getAllCountedServices();
    },
    search(data) {
      this.countedServices.filterData.fillData(data);
      this.getAllCountedServices();
    },
    async getAllCountedServices() {
      this.isLoading = true;
      try {
        this.countedServices.countedServicesData = [];
        const response = await apiCountedService.getAll(
          this.countedServices.filterData
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
        this.countedServices.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllCountedServices();
  },
};
</script>
