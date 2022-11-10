<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('banks', $event)"
      :viewType="generalSetting.banks.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.banks.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Banks.add')"
      :btnAddName="'BankAdd'"
      :btnAddStatus="checkPrivilege(hasBankAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <BankTable
          v-if="generalSetting.banks.viewType == VIEW_TYPES.table"
          v-on:setBankData="banks.bank.fillData($event)"
          :banksData="banks.banksData"
          :defaultImg="banks.bank.defaultImg"
          :filterData="banks.filterData"
        />

        <BankCards
          v-else-if="generalSetting.banks.viewType == VIEW_TYPES.cards"
          v-on:setBankData="banks.bank.fillData($event)"
          :banksData="banks.banksData"
          :defaultImg="banks.bank.defaultImg"
          :filterData="banks.filterData"
        />

        <ActionsData :actionsData="banks.bank" />
        <BankInfo :bank="banks.bank" />
        <BankDelete :bank="banks.bank" v-on:refresh="getAllBanks()" />
        <BankChangeActivationType
          :bank="banks.bank"
          v-on:refresh="getAllBanks()"
        />
        <CustomBottomSheetQRCode
          :refName="'BankQRCode'"
          :code="banks.bank.fullCode"
          :codeTitle="$t('Banks.code')"
          :name="banks.bank.bankNameCurrent"
          :nameTitle="$t('Banks.name')"
          :nameIcon="'banks.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="banks.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <BankFilter
        :theFilterData="banks.filterData"
        v-on:search="search($event)"
      />

      <BankAdd :bank="banks.bank" v-on:refresh="getAllBanks()" />
      <BankUpdate :bank="banks.bank" v-on:refresh="getAllBanks()" />
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
import BankAdd from "./components/BankAdd.vue";
import BankUpdate from "./components/BankUpdate.vue";
import BankCards from "./components/BankCards.vue";
import BankTable from "./components/BankTable.vue";
import BankInfo from "./components/BankInfo.vue";
import BankDelete from "./components/BankDelete.vue";
import BankChangeActivationType from "./components/BankChangeActivationType.vue";
import BankFilter from "./components/BankFilter.vue";
import Banks from "./../../../../models/settings/settingsOthers/banks/Banks";
import apiBank from "./../../../../api/settings/settingsOthers/banks";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasBankAdd,
  hasBankViewActive,
  hasBankViewArchive,
  hasBankViewBlocked,
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
    BankAdd,
    BankUpdate,
    BankCards,
    BankTable,
    BankInfo,
    BankDelete,
    BankChangeActivationType,
    BankFilter,
  },
  computed: {
    hasData() {
      return this.banks.banksData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasBankViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber = this.banks.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasBankViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.banks.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasBankViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.banks.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      banks: new Banks(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasBankAdd,
    changePagination(pagination) {
      this.banks.filterData.fillData(pagination);
      this.getAllBanks();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("banks", data);
      this.banks.filterData.activationTypeTokens = data;
      this.getAllBanks();
    },
    search(data) {
      this.banks.filterData.fillData(data);
      this.getAllBanks();
    },
    async getAllBanks() {
      this.isLoading = true;
      try {
        this.banks.banksData = [];
        const response = await apiBank.getAll(this.banks.filterData);
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
        this.banks.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllBanks();
  },
};
</script>
