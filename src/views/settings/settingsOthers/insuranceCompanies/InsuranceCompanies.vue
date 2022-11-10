<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('insuranceCompanies', $event)"
      :viewType="generalSetting.insuranceCompanies.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.insuranceCompanies.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('InsuranceCompanies.add')"
      :btnAddName="'InsuranceCompanyAdd'"
      :btnAddStatus="checkPrivilege(hasInsuranceCompanyAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <InsuranceCompanyTable
          v-if="generalSetting.insuranceCompanies.viewType == VIEW_TYPES.table"
          v-on:setInsuranceCompanyData="
            insuranceCompanies.insuranceCompany.fillData($event)
          "
          :insuranceCompaniesData="insuranceCompanies.insuranceCompaniesData"
          :defaultImg="insuranceCompanies.insuranceCompany.defaultImg"
          :filterData="insuranceCompanies.filterData"
        />

        <InsuranceCompanyCards
          v-else-if="
            generalSetting.insuranceCompanies.viewType == VIEW_TYPES.cards
          "
          v-on:setInsuranceCompanyData="
            insuranceCompanies.insuranceCompany.fillData($event)
          "
          :insuranceCompaniesData="insuranceCompanies.insuranceCompaniesData"
          :defaultImg="insuranceCompanies.insuranceCompany.defaultImg"
          :filterData="insuranceCompanies.filterData"
        />

        <ActionsData :actionsData="insuranceCompanies.insuranceCompany" />
        <InsuranceCompanyInfo
          :insuranceCompany="insuranceCompanies.insuranceCompany"
        />
        <InsuranceCompanyDelete
          :insuranceCompany="insuranceCompanies.insuranceCompany"
          v-on:refresh="getAllInsuranceCompanies()"
        />
        <InsuranceCompanyChangeActivationType
          :insuranceCompany="insuranceCompanies.insuranceCompany"
          v-on:refresh="getAllInsuranceCompanies()"
        />
        <CustomBottomSheetQRCode
          :refName="'InsuranceCompanyQRCode'"
          :code="insuranceCompanies.insuranceCompany.fullCode"
          :codeTitle="$t('InsuranceCompanies.code')"
          :name="
            insuranceCompanies.insuranceCompany.insuranceCompanyNameCurrent
          "
          :nameTitle="$t('InsuranceCompanies.name')"
          :nameIcon="'insuranceCompanies.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="insuranceCompanies.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InsuranceCompanyFilter
        :theFilterData="insuranceCompanies.filterData"
        v-on:search="search($event)"
      />

      <InsuranceCompanyAdd
        :insuranceCompany="insuranceCompanies.insuranceCompany"
        v-on:refresh="getAllInsuranceCompanies()"
      />
      <InsuranceCompanyUpdate
        :insuranceCompany="insuranceCompanies.insuranceCompany"
        v-on:refresh="getAllInsuranceCompanies()"
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
import InsuranceCompanyAdd from "./components/InsuranceCompanyAdd.vue";
import InsuranceCompanyUpdate from "./components/InsuranceCompanyUpdate.vue";
import InsuranceCompanyCards from "./components/InsuranceCompanyCards.vue";
import InsuranceCompanyTable from "./components/InsuranceCompanyTable.vue";
import InsuranceCompanyInfo from "./components/InsuranceCompanyInfo.vue";
import InsuranceCompanyDelete from "./components/InsuranceCompanyDelete.vue";
import InsuranceCompanyChangeActivationType from "./components/InsuranceCompanyChangeActivationType.vue";
import InsuranceCompanyFilter from "./components/InsuranceCompanyFilter.vue";
import InsuranceCompanies from "./../../../../models/settings/settingsOthers/insuranceCompanies/InsuranceCompanies";
import apiInsuranceCompany from "./../../../../api/settings/settingsOthers/insuranceCompanies";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasInsuranceCompanyAdd,
  hasInsuranceCompanyViewActive,
  hasInsuranceCompanyViewArchive,
  hasInsuranceCompanyViewBlocked,
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
    InsuranceCompanyAdd,
    InsuranceCompanyUpdate,
    InsuranceCompanyCards,
    InsuranceCompanyTable,
    InsuranceCompanyInfo,
    InsuranceCompanyDelete,
    InsuranceCompanyChangeActivationType,
    InsuranceCompanyFilter,
  },
  computed: {
    hasData() {
      return this.insuranceCompanies.insuranceCompaniesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasInsuranceCompanyViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.insuranceCompanies.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInsuranceCompanyViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.insuranceCompanies.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasInsuranceCompanyViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.insuranceCompanies.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      insuranceCompanies: new InsuranceCompanies(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasInsuranceCompanyAdd,
    changePagination(pagination) {
      this.insuranceCompanies.filterData.fillData(pagination);
      this.getAllInsuranceCompanies();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("insuranceCompanies", data);
      this.insuranceCompanies.filterData.activationTypeTokens = data;
      this.getAllInsuranceCompanies();
    },
    search(data) {
      this.insuranceCompanies.filterData.fillData(data);
      this.getAllInsuranceCompanies();
    },
    async getAllInsuranceCompanies() {
      this.isLoading = true;
      try {
        this.insuranceCompanies.insuranceCompaniesData = [];
        const response = await apiInsuranceCompany.getAll(
          this.insuranceCompanies.filterData
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
        this.insuranceCompanies.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllInsuranceCompanies();
  },
};
</script>
