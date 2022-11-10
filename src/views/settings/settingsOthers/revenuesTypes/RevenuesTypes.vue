<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('revenuesTypes', $event)"
      :viewType="generalSetting.revenuesTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.revenuesTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('RevenuesTypes.add')"
      :btnAddName="'RevenuesTypeAdd'"
      :btnAddStatus="checkPrivilege(hasRevenuesTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <RevenueTabs />

      <template v-if="hasData">
        <RevenuesTypeTable
          v-if="generalSetting.revenuesTypes.viewType == VIEW_TYPES.table"
          v-on:setRevenuesTypeData="revenuesTypes.revenuesType.fillData($event)"
          :revenuesTypesData="revenuesTypes.revenuesTypesData"
          :defaultImg="revenuesTypes.revenuesType.defaultImg"
          :filterData="revenuesTypes.filterData"
        />

        <RevenuesTypeCards
          v-else-if="generalSetting.revenuesTypes.viewType == VIEW_TYPES.cards"
          v-on:setRevenuesTypeData="revenuesTypes.revenuesType.fillData($event)"
          :revenuesTypesData="revenuesTypes.revenuesTypesData"
          :defaultImg="revenuesTypes.revenuesType.defaultImg"
          :filterData="revenuesTypes.filterData"
        />

        <ActionsData :actionsData="revenuesTypes.revenuesType" />
        <RevenuesTypeInfo :revenuesType="revenuesTypes.revenuesType" />
        <RevenuesTypeDelete
          :revenuesType="revenuesTypes.revenuesType"
          v-on:refresh="getAllRevenuesTypes()"
        />
        <RevenuesTypeChangeActivationType
          :revenuesType="revenuesTypes.revenuesType"
          v-on:refresh="getAllRevenuesTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'RevenuesTypeQRCode'"
          :code="revenuesTypes.revenuesType.fullCode"
          :codeTitle="$t('RevenuesTypes.code')"
          :name="revenuesTypes.revenuesType.revenuesTypeNameCurrent"
          :nameTitle="$t('RevenuesTypes.name')"
          :nameIcon="'revenuesTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="revenuesTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <RevenuesTypeFilter
        :theFilterData="revenuesTypes.filterData"
        v-on:search="search($event)"
      />

      <RevenuesTypeAdd
        :revenuesType="revenuesTypes.revenuesType"
        v-on:refresh="getAllRevenuesTypes()"
      />
      <RevenuesTypeUpdate
        :revenuesType="revenuesTypes.revenuesType"
        v-on:refresh="getAllRevenuesTypes()"
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
import RevenuesTypeAdd from "./components/RevenuesTypeAdd.vue";
import RevenuesTypeUpdate from "./components/RevenuesTypeUpdate.vue";
import RevenuesTypeCards from "./components/RevenuesTypeCards.vue";
import RevenuesTypeTable from "./components/RevenuesTypeTable.vue";
import RevenuesTypeInfo from "./components/RevenuesTypeInfo.vue";
import RevenuesTypeDelete from "./components/RevenuesTypeDelete.vue";
import RevenueTabs from "./../../../finance/revenues/components/RevenueTabs.vue";
import RevenuesTypeChangeActivationType from "./components/RevenuesTypeChangeActivationType.vue";
import RevenuesTypeFilter from "./components/RevenuesTypeFilter.vue";
import RevenuesTypes from "./../../../../models/settings/settingsOthers/revenuesTypes/RevenuesTypes";
import apiRevenuesType from "./../../../../api/settings/settingsOthers/revenuesTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasRevenuesTypeAdd,
  hasRevenuesTypeViewActive,
  hasRevenuesTypeViewArchive,
  hasRevenuesTypeViewBlocked,
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
    RevenuesTypeAdd,
    RevenuesTypeUpdate,
    RevenuesTypeCards,
    RevenuesTypeTable,
    RevenuesTypeInfo,
    RevenuesTypeDelete,
    RevenueTabs,
    RevenuesTypeChangeActivationType,
    RevenuesTypeFilter,
  },
  computed: {
    hasData() {
      return this.revenuesTypes.revenuesTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasRevenuesTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.revenuesTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasRevenuesTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.revenuesTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasRevenuesTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.revenuesTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      revenuesTypes: new RevenuesTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasRevenuesTypeAdd,
    changePagination(pagination) {
      this.revenuesTypes.filterData.fillData(pagination);
      this.getAllRevenuesTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("revenuesTypes", data);
      this.revenuesTypes.filterData.activationTypeTokens = data;
      this.getAllRevenuesTypes();
    },
    search(data) {
      this.revenuesTypes.filterData.fillData(data);
      this.getAllRevenuesTypes();
    },
    async getAllRevenuesTypes() {
      this.isLoading = true;
      try {
        this.revenuesTypes.revenuesTypesData = [];
        const response = await apiRevenuesType.getAll(
          this.revenuesTypes.filterData
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
        this.revenuesTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllRevenuesTypes();
  },
};
</script>
