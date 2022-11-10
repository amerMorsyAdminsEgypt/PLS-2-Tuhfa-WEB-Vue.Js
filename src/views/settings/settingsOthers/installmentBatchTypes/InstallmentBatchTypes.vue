<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('installmentBatchTypes', $event)"
      :viewType="generalSetting.installmentBatchTypes.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.installmentBatchTypes.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('InstallmentBatchTypes.add')"
      :btnAddName="'InstallmentBatchTypeAdd'"
      :btnAddStatus="checkPrivilege(hasInstallmentBatchTypeAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <InstallmentBatchTypeTable
          v-if="
            generalSetting.installmentBatchTypes.viewType == VIEW_TYPES.table
          "
          v-on:setInstallmentBatchTypeData="
            installmentBatchTypes.installmentBatchType.fillData($event)
          "
          :installmentBatchTypesData="
            installmentBatchTypes.installmentBatchTypesData
          "
          :defaultImg="installmentBatchTypes.installmentBatchType.defaultImg"
          :filterData="installmentBatchTypes.filterData"
        />

        <InstallmentBatchTypeCards
          v-else-if="
            generalSetting.installmentBatchTypes.viewType == VIEW_TYPES.cards
          "
          v-on:setInstallmentBatchTypeData="
            installmentBatchTypes.installmentBatchType.fillData($event)
          "
          :installmentBatchTypesData="
            installmentBatchTypes.installmentBatchTypesData
          "
          :defaultImg="installmentBatchTypes.installmentBatchType.defaultImg"
          :filterData="installmentBatchTypes.filterData"
        />

        <ActionsData
          :actionsData="installmentBatchTypes.installmentBatchType"
        />
        <InstallmentBatchTypeInfo
          :installmentBatchType="installmentBatchTypes.installmentBatchType"
        />
        <InstallmentBatchTypeDelete
          :installmentBatchType="installmentBatchTypes.installmentBatchType"
          v-on:refresh="getAllInstallmentBatchTypes()"
        />
        <InstallmentBatchTypeChangeActivationType
          :installmentBatchType="installmentBatchTypes.installmentBatchType"
          v-on:refresh="getAllInstallmentBatchTypes()"
        />
        <CustomBottomSheetQRCode
          :refName="'InstallmentBatchTypeQRCode'"
          :code="installmentBatchTypes.installmentBatchType.fullCode"
          :codeTitle="$t('InstallmentBatchTypes.code')"
          :name="
            installmentBatchTypes.installmentBatchType
              .installmentBatchTypeNameCurrent
          "
          :nameTitle="$t('InstallmentBatchTypes.name')"
          :nameIcon="'installmentBatchTypes.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="installmentBatchTypes.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InstallmentBatchTypeFilter
        :theFilterData="installmentBatchTypes.filterData"
        v-on:search="search($event)"
      />

      <InstallmentBatchTypeAdd
        :installmentBatchType="installmentBatchTypes.installmentBatchType"
        v-on:refresh="getAllInstallmentBatchTypes()"
      />
      <InstallmentBatchTypeUpdate
        :installmentBatchType="installmentBatchTypes.installmentBatchType"
        v-on:refresh="getAllInstallmentBatchTypes()"
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
import InstallmentBatchTypeAdd from "./components/InstallmentBatchTypeAdd.vue";
import InstallmentBatchTypeUpdate from "./components/InstallmentBatchTypeUpdate.vue";
import InstallmentBatchTypeCards from "./components/InstallmentBatchTypeCards.vue";
import InstallmentBatchTypeTable from "./components/InstallmentBatchTypeTable.vue";
import InstallmentBatchTypeInfo from "./components/InstallmentBatchTypeInfo.vue";
import InstallmentBatchTypeDelete from "./components/InstallmentBatchTypeDelete.vue";
import InstallmentBatchTypeChangeActivationType from "./components/InstallmentBatchTypeChangeActivationType.vue";
import InstallmentBatchTypeFilter from "./components/InstallmentBatchTypeFilter.vue";
import InstallmentBatchTypes from "./../../../../models/settings/settingsOthers/installmentBatchTypes/InstallmentBatchTypes";
import apiInstallmentBatchType from "./../../../../api/settings/settingsOthers/installmentBatchTypes";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasInstallmentBatchTypeAdd,
  hasInstallmentBatchTypeViewActive,
  hasInstallmentBatchTypeViewArchive,
  hasInstallmentBatchTypeViewBlocked,
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
    InstallmentBatchTypeAdd,
    InstallmentBatchTypeUpdate,
    InstallmentBatchTypeCards,
    InstallmentBatchTypeTable,
    InstallmentBatchTypeInfo,
    InstallmentBatchTypeDelete,
    InstallmentBatchTypeChangeActivationType,
    InstallmentBatchTypeFilter,
  },
  computed: {
    hasData() {
      return this.installmentBatchTypes.installmentBatchTypesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasInstallmentBatchTypeViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.installmentBatchTypes.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInstallmentBatchTypeViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.installmentBatchTypes.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInstallmentBatchTypeViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.installmentBatchTypes.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      installmentBatchTypes: new InstallmentBatchTypes(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasInstallmentBatchTypeAdd,
    changePagination(pagination) {
      this.installmentBatchTypes.filterData.fillData(pagination);
      this.getAllInstallmentBatchTypes();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("installmentBatchTypes", data);
      this.installmentBatchTypes.filterData.activationTypeTokens = data;
      this.getAllInstallmentBatchTypes();
    },
    search(data) {
      this.installmentBatchTypes.filterData.fillData(data);
      this.getAllInstallmentBatchTypes();
    },
    async getAllInstallmentBatchTypes() {
      this.isLoading = true;
      try {
        this.installmentBatchTypes.installmentBatchTypesData = [];
        const response = await apiInstallmentBatchType.getAll(
          this.installmentBatchTypes.filterData
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
        this.installmentBatchTypes.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllInstallmentBatchTypes();
  },
};
</script>
