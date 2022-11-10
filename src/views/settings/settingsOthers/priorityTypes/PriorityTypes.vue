<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('priorityTypes', $event)"
      :viewType="generalSetting.priorityTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.priorityTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('PriorityTypes.add')"
      :btnAddName="'PriorityTypeAdd'"
      :btnAddStatus="checkPrivilege(hasPriorityTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <PriorityTypeTable
          v-if="generalSetting.priorityTypes.viewType == VIEW_TYPES.table"
          v-on:setPriorityTypeData="priorityTypes.priorityType.fillData($event)"
          :priorityTypesData="priorityTypes.priorityTypesData"
          :defaultImg="priorityTypes.priorityType.defaultImg"
          :filterData="priorityTypes.filterData"
        />

        <PriorityTypeCards
          v-else-if="generalSetting.priorityTypes.viewType == VIEW_TYPES.cards"
          v-on:setPriorityTypeData="priorityTypes.priorityType.fillData($event)"
          :priorityTypesData="priorityTypes.priorityTypesData"
          :defaultImg="priorityTypes.priorityType.defaultImg"
          :filterData="priorityTypes.filterData"
        />

        <ActionsData :actionsData="priorityTypes.priorityType" />
        <PriorityTypeInfo :priorityType="priorityTypes.priorityType" />
        <PriorityTypeDelete
          :priorityType="priorityTypes.priorityType"
          v-on:refresh="getAllPriorityTypes()"
        />
        <PriorityTypeChangeActivationType
          :priorityType="priorityTypes.priorityType"
          v-on:refresh="getAllPriorityTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'PriorityTypeQRCode'"
          :code="priorityTypes.priorityType.fullCode"
          :codeTitle="$t('PriorityTypes.code')"
          :name="priorityTypes.priorityType.priorityTypeNameCurrent"
          :nameTitle="$t('PriorityTypes.name')"
          :nameIcon="'priorityTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="priorityTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PriorityTypeFilter
        :theFilterData="priorityTypes.filterData"
        v-on:search="search($event)"
      />

      <PriorityTypeAdd
        :priorityType="priorityTypes.priorityType"
        v-on:refresh="getAllPriorityTypes()"
      />
      <PriorityTypeUpdate
        :priorityType="priorityTypes.priorityType"
        v-on:refresh="getAllPriorityTypes()"
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
import PriorityTypeAdd from "./components/PriorityTypeAdd.vue";
import PriorityTypeUpdate from "./components/PriorityTypeUpdate.vue";
import PriorityTypeCards from "./components/PriorityTypeCards.vue";
import PriorityTypeTable from "./components/PriorityTypeTable.vue";
import PriorityTypeInfo from "./components/PriorityTypeInfo.vue";
import PriorityTypeDelete from "./components/PriorityTypeDelete.vue";
import PriorityTypeChangeActivationType from "./components/PriorityTypeChangeActivationType.vue";
import PriorityTypeFilter from "./components/PriorityTypeFilter.vue";
import PriorityTypes from "./../../../../models/settings/settingsOthers/priorityTypes/PriorityTypes";
import apiPriorityType from "./../../../../api/settings/settingsOthers/priorityTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasPriorityTypeAdd,
  hasPriorityTypeViewActive,
  hasPriorityTypeViewArchive,
  hasPriorityTypeViewBlocked,
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
    PriorityTypeAdd,
    PriorityTypeUpdate,
    PriorityTypeCards,
    PriorityTypeTable,
    PriorityTypeInfo,
    PriorityTypeDelete,
    PriorityTypeChangeActivationType,
    PriorityTypeFilter,
  },
  computed: {
    hasData() {
      return this.priorityTypes.priorityTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasPriorityTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.priorityTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPriorityTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.priorityTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPriorityTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.priorityTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      priorityTypes: new PriorityTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasPriorityTypeAdd,
    changePagination(pagination) {
      this.priorityTypes.filterData.fillData(pagination);
      this.getAllPriorityTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("priorityTypes", data);
      this.priorityTypes.filterData.activationTypeTokens = data;
      this.getAllPriorityTypes();
    },
    search(data) {
      this.priorityTypes.filterData.fillData(data);
      this.getAllPriorityTypes();
    },
    async getAllPriorityTypes() {
      this.isLoading = true;
      try {
        this.priorityTypes.priorityTypesData = [];
        const response = await apiPriorityType.getAll(
          this.priorityTypes.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.priorityTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllPriorityTypes();
  },
};
</script>
