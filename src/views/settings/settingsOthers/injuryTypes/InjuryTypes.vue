<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('injuryTypes', $event)"
      :viewType="generalSetting.injuryTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.injuryTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('InjuryTypes.add')"
      :btnAddName="'InjuryTypeAdd'"
      :btnAddStatus="checkPrivilege(hasInjuryTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <InjuryTypeTable
          v-if="generalSetting.injuryTypes.viewType == VIEW_TYPES.table"
          v-on:setInjuryTypeData="injuryTypes.injuryType.fillData($event)"
          :injuryTypesData="injuryTypes.injuryTypesData"
          :defaultImg="injuryTypes.injuryType.defaultImg"
          :filterData="injuryTypes.filterData"
        />

        <InjuryTypeCards
          v-else-if="generalSetting.injuryTypes.viewType == VIEW_TYPES.cards"
          v-on:setInjuryTypeData="injuryTypes.injuryType.fillData($event)"
          :injuryTypesData="injuryTypes.injuryTypesData"
          :defaultImg="injuryTypes.injuryType.defaultImg"
          :filterData="injuryTypes.filterData"
        />

        <ActionsData :actionsData="injuryTypes.injuryType" />
        <InjuryTypeInfo :injuryType="injuryTypes.injuryType" />
        <InjuryTypeDelete
          :injuryType="injuryTypes.injuryType"
          v-on:refresh="getAllInjuryTypes()"
        />
        <InjuryTypeChangeActivationType
          :injuryType="injuryTypes.injuryType"
          v-on:refresh="getAllInjuryTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'InjuryTypeQRCode'"
          :code="injuryTypes.injuryType.fullCode"
          :codeTitle="$t('InjuryTypes.code')"
          :name="injuryTypes.injuryType.injuryTypeNameCurrent"
          :nameTitle="$t('InjuryTypes.name')"
          :nameIcon="'injuryTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="injuryTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InjuryTypeFilter
        :theFilterData="injuryTypes.filterData"
        v-on:search="search($event)"
      />

      <InjuryTypeAdd
        :injuryType="injuryTypes.injuryType"
        v-on:refresh="getAllInjuryTypes()"
      />
      <InjuryTypeUpdate
        :injuryType="injuryTypes.injuryType"
        v-on:refresh="getAllInjuryTypes()"
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
import InjuryTypeAdd from "./components/InjuryTypeAdd.vue";
import InjuryTypeUpdate from "./components/InjuryTypeUpdate.vue";
import InjuryTypeCards from "./components/InjuryTypeCards.vue";
import InjuryTypeTable from "./components/InjuryTypeTable.vue";
import InjuryTypeInfo from "./components/InjuryTypeInfo.vue";
import InjuryTypeDelete from "./components/InjuryTypeDelete.vue";
import InjuryTypeChangeActivationType from "./components/InjuryTypeChangeActivationType.vue";
import InjuryTypeFilter from "./components/InjuryTypeFilter.vue";
import InjuryTypes from "./../../../../models/settings/settingsOthers/injuryTypes/InjuryTypes";
import apiInjuryType from "./../../../../api/settings/settingsOthers/injuryTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasInjuryTypeAdd,
  hasInjuryTypeViewActive,
  hasInjuryTypeViewArchive,
  hasInjuryTypeViewBlocked,
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
    InjuryTypeAdd,
    InjuryTypeUpdate,
    InjuryTypeCards,
    InjuryTypeTable,
    InjuryTypeInfo,
    InjuryTypeDelete,
    InjuryTypeChangeActivationType,
    InjuryTypeFilter,
  },
  computed: {
    hasData() {
      return this.injuryTypes.injuryTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasInjuryTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.injuryTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInjuryTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.injuryTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInjuryTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.injuryTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      injuryTypes: new InjuryTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasInjuryTypeAdd,
    changePagination(pagination) {
      this.injuryTypes.filterData.fillData(pagination);
      this.getAllInjuryTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("injuryTypes", data);
      this.injuryTypes.filterData.activationTypeTokens = data;
      this.getAllInjuryTypes();
    },
    search(data) {
      this.injuryTypes.filterData.fillData(data);
      this.getAllInjuryTypes();
    },
    async getAllInjuryTypes() {
      this.isLoading = true;
      try {
        this.injuryTypes.injuryTypesData = [];
        const response = await apiInjuryType.getAll(
          this.injuryTypes.filterData
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
        this.injuryTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllInjuryTypes();
  },
};
</script>
