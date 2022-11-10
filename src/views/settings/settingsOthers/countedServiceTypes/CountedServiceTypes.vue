<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('countedServiceTypes', $event)"
      :viewType="generalSetting.countedServiceTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.countedServiceTypes.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('CountedServiceTypes.add')"
      :btnAddName="'CountedServiceTypeAdd'"
      :btnAddStatus="checkPrivilege(hasCountedServiceTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <CountedServicesTabs />

      <template v-if="hasData">
        <CountedServiceTypeTable
          v-if="generalSetting.countedServiceTypes.viewType == VIEW_TYPES.table"
          v-on:setCountedServiceTypeData="
            countedServiceTypes.countedServiceType.fillData($event)
          "
          :countedServiceTypesData="countedServiceTypes.countedServiceTypesData"
          :defaultImg="countedServiceTypes.countedServiceType.defaultImg"
          :filterData="countedServiceTypes.filterData"
        />

        <CountedServiceTypeCards
          v-else-if="
            generalSetting.countedServiceTypes.viewType == VIEW_TYPES.cards
          "
          v-on:setCountedServiceTypeData="
            countedServiceTypes.countedServiceType.fillData($event)
          "
          :countedServiceTypesData="countedServiceTypes.countedServiceTypesData"
          :defaultImg="countedServiceTypes.countedServiceType.defaultImg"
          :filterData="countedServiceTypes.filterData"
        />

        <ActionsData :actionsData="countedServiceTypes.countedServiceType" />
        <CountedServiceTypeInfo
          :countedServiceType="countedServiceTypes.countedServiceType"
        />
        <CountedServiceTypeDelete
          :countedServiceType="countedServiceTypes.countedServiceType"
          v-on:refresh="getAllCountedServiceTypes()"
        />
        <CountedServiceTypeChangeActivationType
          :countedServiceType="countedServiceTypes.countedServiceType"
          v-on:refresh="getAllCountedServiceTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'CountedServiceTypeQRCode'"
          :code="countedServiceTypes.countedServiceType.fullCode"
          :codeTitle="$t('CountedServiceTypes.code')"
          :name="
            countedServiceTypes.countedServiceType.countedServiceTypeNameCurrent
          "
          :nameTitle="$t('CountedServiceTypes.name')"
          :nameIcon="'countedServiceTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="countedServiceTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <CountedServiceTypeFilter
        :theFilterData="countedServiceTypes.filterData"
        v-on:search="search($event)"
      />

      <CountedServiceTypeAdd
        :countedServiceType="countedServiceTypes.countedServiceType"
        v-on:refresh="getAllCountedServiceTypes()"
      />
      <CountedServiceTypeUpdate
        :countedServiceType="countedServiceTypes.countedServiceType"
        v-on:refresh="getAllCountedServiceTypes()"
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
import CountedServicesTabs from "./../../../countedServices/components/CountedServicesTabs.vue";
import CountedServiceTypeAdd from "./components/CountedServiceTypeAdd.vue";
import CountedServiceTypeUpdate from "./components/CountedServiceTypeUpdate.vue";
import CountedServiceTypeCards from "./components/CountedServiceTypeCards.vue";
import CountedServiceTypeTable from "./components/CountedServiceTypeTable.vue";
import CountedServiceTypeInfo from "./components/CountedServiceTypeInfo.vue";
import CountedServiceTypeDelete from "./components/CountedServiceTypeDelete.vue";
import CountedServiceTypeChangeActivationType from "./components/CountedServiceTypeChangeActivationType.vue";
import CountedServiceTypeFilter from "./components/CountedServiceTypeFilter.vue";
import CountedServiceTypes from "./../../../../models/settings/settingsOthers/countedServiceTypes/CountedServiceTypes";
import apiCountedServiceType from "./../../../../api/settings/settingsOthers/countedServiceTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasCountedServiceTypeAdd,
  hasCountedServiceTypeViewActive,
  hasCountedServiceTypeViewArchive,
  hasCountedServiceTypeViewBlocked,
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
    CountedServicesTabs,
    CountedServiceTypeAdd,
    CountedServiceTypeUpdate,
    CountedServiceTypeCards,
    CountedServiceTypeTable,
    CountedServiceTypeInfo,
    CountedServiceTypeDelete,
    CountedServiceTypeChangeActivationType,
    CountedServiceTypeFilter,
  },
  computed: {
    hasData() {
      return this.countedServiceTypes.countedServiceTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasCountedServiceTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.countedServiceTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCountedServiceTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.countedServiceTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasCountedServiceTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.countedServiceTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      countedServiceTypes: new CountedServiceTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasCountedServiceTypeAdd,
    changePagination(pagination) {
      this.countedServiceTypes.filterData.fillData(pagination);
      this.getAllCountedServiceTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("countedServiceTypes", data);
      this.countedServiceTypes.filterData.activationTypeTokens = data;
      this.getAllCountedServiceTypes();
    },
    search(data) {
      this.countedServiceTypes.filterData.fillData(data);
      this.getAllCountedServiceTypes();
    },
    async getAllCountedServiceTypes() {
      this.isLoading = true;
      try {
        this.countedServiceTypes.countedServiceTypesData = [];
        const response = await apiCountedServiceType.getAll(
          this.countedServiceTypes.filterData
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
        this.countedServiceTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllCountedServiceTypes();
  },
};
</script>
