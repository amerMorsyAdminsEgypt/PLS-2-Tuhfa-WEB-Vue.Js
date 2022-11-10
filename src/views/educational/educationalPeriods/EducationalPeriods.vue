<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('educationalPeriods', $event)"
      :viewType="generalSetting.educationalPeriods.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.educationalPeriods.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('EducationalPeriods.add')"
      :btnAddName="'EducationalPeriodAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalPeriodAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <EducationalPeriodTable
          v-if="generalSetting.educationalPeriods.viewType == VIEW_TYPES.table"
          v-on:setEducationalPeriodData="
            educationalPeriods.educationalPeriod.fillData($event)
          "
          :educationalPeriodsData="educationalPeriods.educationalPeriodsData"
          :defaultImg="educationalPeriods.educationalPeriod.defaultImg"
          :filterData="educationalPeriods.filterData"
        />

        <EducationalPeriodCards
          v-else-if="
            generalSetting.educationalPeriods.viewType == VIEW_TYPES.cards
          "
          v-on:setEducationalPeriodData="
            educationalPeriods.educationalPeriod.fillData($event)
          "
          :educationalPeriodsData="educationalPeriods.educationalPeriodsData"
          :defaultImg="educationalPeriods.educationalPeriod.defaultImg"
          :filterData="educationalPeriods.filterData"
        />

        <ActionsData :actionsData="educationalPeriods.educationalPeriod" />
        <EducationalPeriodInfo
          :educationalPeriod="educationalPeriods.educationalPeriod"
        />
        <EducationalPeriodDelete
          :educationalPeriod="educationalPeriods.educationalPeriod"
          v-on:refresh="getAllEducationalPeriods()"
        />
        <EducationalPeriodChangeActivationType
          :educationalPeriod="educationalPeriods.educationalPeriod"
          v-on:refresh="getAllEducationalPeriods()"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalPeriodQRCode'"
          :code="educationalPeriods.educationalPeriod.fullCode"
          :codeTitle="$t('EducationalPeriods.code')"
          :name="
            educationalPeriods.educationalPeriod.educationalPeriodNameCurrent
          "
          :nameTitle="$t('EducationalPeriods.name')"
          :nameIcon="'educationalPeriods.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalPeriods.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalPeriodFilter
        :theFilterData="educationalPeriods.filterData"
        v-on:search="search($event)"
      />

      <EducationalPeriodAdd
        :educationalPeriod="educationalPeriods.educationalPeriod"
        v-on:refresh="getAllEducationalPeriods()"
      />
      <EducationalPeriodUpdate
        :educationalPeriod="educationalPeriods.educationalPeriod"
        v-on:refresh="getAllEducationalPeriods()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalPeriodAdd from "./components/EducationalPeriodAdd.vue";
import EducationalPeriodUpdate from "./components/EducationalPeriodUpdate.vue";
import EducationalPeriodCards from "./components/EducationalPeriodCards.vue";
import EducationalPeriodTable from "./components/EducationalPeriodTable.vue";
import EducationalPeriodInfo from "./components/EducationalPeriodInfo.vue";
import EducationalPeriodDelete from "./components/EducationalPeriodDelete.vue";
import EducationalPeriodChangeActivationType from "./components/EducationalPeriodChangeActivationType.vue";
import EducationalPeriodFilter from "./components/EducationalPeriodFilter.vue";
import EducationalPeriods from "./../../../models/educational/educationalPeriods/EducationalPeriods";
import apiEducationalPeriod from "./../../../api/educational/educationalPeriods";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasEducationalPeriodAdd,
  hasEducationalPeriodViewActive,
  hasEducationalPeriodViewArchive,
  hasEducationalPeriodViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EducationalPeriodAdd,
    EducationalPeriodUpdate,
    EducationalPeriodCards,
    EducationalPeriodTable,
    EducationalPeriodInfo,
    EducationalPeriodDelete,
    EducationalPeriodChangeActivationType,
    EducationalPeriodFilter,
  },
  computed: {
    hasData() {
      return this.educationalPeriods.educationalPeriodsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasEducationalPeriodViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.educationalPeriods.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalPeriodViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.educationalPeriods.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalPeriodViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.educationalPeriods.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      educationalPeriods: new EducationalPeriods(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalPeriodAdd,
    changePagination(pagination) {
      this.educationalPeriods.filterData.fillData(pagination);
      this.getAllEducationalPeriods();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("educationalPeriods", data);
      this.educationalPeriods.filterData.activationTypeTokens = data;
      this.getAllEducationalPeriods();
    },
    search(data) {
      this.educationalPeriods.filterData.fillData(data);
      this.getAllEducationalPeriods();
    },
    async getAllEducationalPeriods() {
      this.isLoading = true;
      try {
        this.educationalPeriods.educationalPeriodsData = [];
        const response = await apiEducationalPeriod.getAll(
          this.educationalPeriods.filterData
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
        this.educationalPeriods.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllEducationalPeriods();
  },
};
</script>
