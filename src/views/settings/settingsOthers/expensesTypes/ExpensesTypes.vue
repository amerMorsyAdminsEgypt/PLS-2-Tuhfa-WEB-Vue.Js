<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('expensesTypes', $event)"
      :viewType="generalSetting.expensesTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.expensesTypes.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('ExpensesTypes.add')"
      :btnAddName="'ExpensesTypeAdd'"
      :btnAddStatus="checkPrivilege(hasExpensesTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <ExpenseTabs />

      <template v-if="hasData">
        <ExpensesTypeTable
          v-if="generalSetting.expensesTypes.viewType == VIEW_TYPES.table"
          v-on:setExpensesTypeData="expensesTypes.expensesType.fillData($event)"
          :expensesTypesData="expensesTypes.expensesTypesData"
          :defaultImg="expensesTypes.expensesType.defaultImg"
          :filterData="expensesTypes.filterData"
        />

        <ExpensesTypeCards
          v-else-if="generalSetting.expensesTypes.viewType == VIEW_TYPES.cards"
          v-on:setExpensesTypeData="expensesTypes.expensesType.fillData($event)"
          :expensesTypesData="expensesTypes.expensesTypesData"
          :defaultImg="expensesTypes.expensesType.defaultImg"
          :filterData="expensesTypes.filterData"
        />

        <ActionsData :actionsData="expensesTypes.expensesType" />
        <ExpensesTypeInfo :expensesType="expensesTypes.expensesType" />
        <ExpensesTypeDelete
          :expensesType="expensesTypes.expensesType"
          v-on:refresh="getAllExpensesTypes()"
        />
        <ExpensesTypeChangeActivationType
          :expensesType="expensesTypes.expensesType"
          v-on:refresh="getAllExpensesTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'ExpensesTypeQRCode'"
          :code="expensesTypes.expensesType.fullCode"
          :codeTitle="$t('ExpensesTypes.code')"
          :name="expensesTypes.expensesType.expensesTypeNameCurrent"
          :nameTitle="$t('ExpensesTypes.name')"
          :nameIcon="'expensesTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="expensesTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ExpensesTypeFilter
        :theFilterData="expensesTypes.filterData"
        v-on:search="search($event)"
      />

      <ExpensesTypeAdd
        :expensesType="expensesTypes.expensesType"
        v-on:refresh="getAllExpensesTypes()"
      />
      <ExpensesTypeUpdate
        :expensesType="expensesTypes.expensesType"
        v-on:refresh="getAllExpensesTypes()"
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
import ExpensesTypeAdd from "./components/ExpensesTypeAdd.vue";
import ExpensesTypeUpdate from "./components/ExpensesTypeUpdate.vue";
import ExpensesTypeCards from "./components/ExpensesTypeCards.vue";
import ExpensesTypeTable from "./components/ExpensesTypeTable.vue";
import ExpensesTypeInfo from "./components/ExpensesTypeInfo.vue";
import ExpensesTypeDelete from "./components/ExpensesTypeDelete.vue";
import ExpensesTypeChangeActivationType from "./components/ExpensesTypeChangeActivationType.vue";
import ExpensesTypeFilter from "./components/ExpensesTypeFilter.vue";
import ExpenseTabs from "./../../../finance/expenses/components/ExpenseTabs.vue";
import ExpensesTypes from "./../../../../models/settings/settingsOthers/expensesTypes/ExpensesTypes";
import apiExpensesType from "./../../../../api/settings/settingsOthers/expensesTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasExpensesTypeAdd,
  hasExpensesTypeViewActive,
  hasExpensesTypeViewArchive,
  hasExpensesTypeViewBlocked,
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
    ExpensesTypeAdd,
    ExpensesTypeUpdate,
    ExpensesTypeCards,
    ExpensesTypeTable,
    ExpensesTypeInfo,
    ExpensesTypeDelete,
    ExpensesTypeChangeActivationType,
    ExpensesTypeFilter,
    ExpenseTabs,
  },
  computed: {
    hasData() {
      return this.expensesTypes.expensesTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasExpensesTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.expensesTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasExpensesTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.expensesTypes.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasExpensesTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.expensesTypes.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      expensesTypes: new ExpensesTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasExpensesTypeAdd,
    changePagination(pagination) {
      this.expensesTypes.filterData.fillData(pagination);
      this.getAllExpensesTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("expensesTypes", data);
      this.expensesTypes.filterData.activationTypeTokens = data;
      this.getAllExpensesTypes();
    },
    search(data) {
      this.expensesTypes.filterData.fillData(data);
      this.getAllExpensesTypes();
    },
    async getAllExpensesTypes() {
      this.isLoading = true;
      try {
        this.expensesTypes.expensesTypesData = [];
        const response = await apiExpensesType.getAll(
          this.expensesTypes.filterData
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
        this.expensesTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllExpensesTypes();
  },
};
</script>
