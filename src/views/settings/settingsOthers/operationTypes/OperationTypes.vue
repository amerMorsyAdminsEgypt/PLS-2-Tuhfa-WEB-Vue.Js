<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('operationTypes', $event)"
      :viewType="generalSetting.operationTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.operationTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('OperationTypes.add')"
      :btnAddName="'OperationTypeAdd'"
      :btnAddStatus="checkPrivilege(hasOperationTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <OperationTypeTable
          v-if="generalSetting.operationTypes.viewType == VIEW_TYPES.table"
          v-on:setOperationTypeData="
            operationTypes.operationType.fillData($event)
          "
          :operationTypesData="operationTypes.operationTypesData"
          :defaultImg="operationTypes.operationType.defaultImg"
          :filterData="operationTypes.filterData"
        />

        <OperationTypeCards
          v-else-if="generalSetting.operationTypes.viewType == VIEW_TYPES.cards"
          v-on:setOperationTypeData="
            operationTypes.operationType.fillData($event)
          "
          :operationTypesData="operationTypes.operationTypesData"
          :defaultImg="operationTypes.operationType.defaultImg"
          :filterData="operationTypes.filterData"
        />

        <ActionsData :actionsData="operationTypes.operationType" />
        <OperationTypeInfo :operationType="operationTypes.operationType" />
        <OperationTypeDelete
          :operationType="operationTypes.operationType"
          v-on:refresh="getAllOperationTypes()"
        />
        <OperationTypeChangeActivationType
          :operationType="operationTypes.operationType"
          v-on:refresh="getAllOperationTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'OperationTypeQRCode'"
          :code="operationTypes.operationType.fullCode"
          :codeTitle="$t('OperationTypes.code')"
          :name="operationTypes.operationType.operationTypeNameCurrent"
          :nameTitle="$t('OperationTypes.name')"
          :nameIcon="'operationTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="operationTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <OperationTypeFilter
        :theFilterData="operationTypes.filterData"
        v-on:search="search($event)"
      />

      <OperationTypeAdd
        :operationType="operationTypes.operationType"
        v-on:refresh="getAllOperationTypes()"
      />
      <OperationTypeUpdate
        :operationType="operationTypes.operationType"
        v-on:refresh="getAllOperationTypes()"
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
import OperationTypeAdd from "./components/OperationTypeAdd.vue";
import OperationTypeUpdate from "./components/OperationTypeUpdate.vue";
import OperationTypeCards from "./components/OperationTypeCards.vue";
import OperationTypeTable from "./components/OperationTypeTable.vue";
import OperationTypeInfo from "./components/OperationTypeInfo.vue";
import OperationTypeDelete from "./components/OperationTypeDelete.vue";
import OperationTypeChangeActivationType from "./components/OperationTypeChangeActivationType.vue";
import OperationTypeFilter from "./components/OperationTypeFilter.vue";
import OperationTypes from "./../../../../models/settings/settingsOthers/operationTypes/OperationTypes";
import apiOperationType from "./../../../../api/settings/settingsOthers/operationTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasOperationTypeAdd,
  hasOperationTypeViewActive,
  hasOperationTypeViewArchive,
  hasOperationTypeViewBlocked,
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
    OperationTypeAdd,
    OperationTypeUpdate,
    OperationTypeCards,
    OperationTypeTable,
    OperationTypeInfo,
    OperationTypeDelete,
    OperationTypeChangeActivationType,
    OperationTypeFilter,
  },
  computed: {
    hasData() {
      return this.operationTypes.operationTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasOperationTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.operationTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasOperationTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.operationTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasOperationTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.operationTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      operationTypes: new OperationTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasOperationTypeAdd,
    changePagination(pagination) {
      this.operationTypes.filterData.fillData(pagination);
      this.getAllOperationTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("operationTypes", data);
      this.operationTypes.filterData.activationTypeTokens = data;
      this.getAllOperationTypes();
    },
    search(data) {
      this.operationTypes.filterData.fillData(data);
      this.getAllOperationTypes();
    },
    async getAllOperationTypes() {
      this.isLoading = true;
      try {
        this.operationTypes.operationTypesData = [];
        const response = await apiOperationType.getAll(
          this.operationTypes.filterData
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
        this.operationTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllOperationTypes();
  },
};
</script>
