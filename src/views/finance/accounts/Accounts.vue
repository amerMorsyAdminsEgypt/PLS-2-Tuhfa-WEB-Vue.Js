<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('accounts', $event)"
      :viewType="generalSetting.accounts.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.accounts.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('Accounts.add')"
      :btnAddName="'AccountAdd'"
      :btnAddStatus="checkPrivilege(hasAccountAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <AccountTabs />

      <template v-if="hasData">
        <AccountTable
          v-if="generalSetting.accounts.viewType == VIEW_TYPES.table"
          v-on:setAccountData="accounts.account.fillData($event)"
          :accountsData="accounts.accountsData"
          :defaultImg="accounts.account.defaultImg"
          :filterData="accounts.filterData"
        />

        <AccountCards
          v-else-if="generalSetting.accounts.viewType == VIEW_TYPES.cards"
          v-on:setAccountData="accounts.account.fillData($event)"
          :accountsData="accounts.accountsData"
          :defaultImg="accounts.account.defaultImg"
          :filterData="accounts.filterData"
        />

        <ActionsData :actionsData="accounts.account" />
        <AccountInfo :account="accounts.account" />
        <AccountDelete
          :account="accounts.account"
          v-on:refresh="getAllAccounts()"
        />
        <AccountChangeActivationType
          :account="accounts.account"
          v-on:refresh="getAllAccounts()"
        />
        <CustomBottomSheetQRCode
          :refName="'AccountQRCode'"
          :code="accounts.account.fullCode"
          :codeTitle="$t('Accounts.code')"
          :name="accounts.account.accountNameCurrent"
          :nameTitle="$t('Accounts.name')"
          :nameIcon="'accounts.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="accounts.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <AccountFilter
        :theFilterData="accounts.filterData"
        v-on:search="search($event)"
      />

      <AccountAdd :account="accounts.account" v-on:refresh="getAllAccounts()" />
      <AccountUpdate
        :account="accounts.account"
        v-on:refresh="getAllAccounts()"
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
import AccountAdd from "./components/AccountAdd.vue";
import AccountUpdate from "./components/AccountUpdate.vue";
import AccountCards from "./components/AccountCards.vue";
import AccountTable from "./components/AccountTable.vue";
import AccountTabs from "./components/AccountTabs.vue";
import AccountInfo from "./components/AccountInfo.vue";
import AccountDelete from "./components/AccountDelete.vue";
import AccountChangeActivationType from "./components/AccountChangeActivationType.vue";
import AccountFilter from "./components/AccountFilter.vue";
import Accounts from "./../../../models/finance/accounts/Accounts";
import apiAccount from "./../../../api/finance/accounts";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasAccountAdd,
  hasAccountViewActive,
  hasAccountViewArchive,
  hasAccountViewBlocked,
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
    AccountAdd,
    AccountUpdate,
    AccountCards,
    AccountTable,
    AccountTabs,
    AccountInfo,
    AccountDelete,
    AccountChangeActivationType,
    AccountFilter,
  },
  computed: {
    hasData() {
      return this.accounts.accountsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasAccountViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.accounts.accountsStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAccountViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.accounts.accountsStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasAccountViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.accounts.accountsStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      accounts: new Accounts(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasAccountAdd,
    changePagination(pagination) {
      this.accounts.filterData.fillData(pagination);
      this.getAllAccounts();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("accounts", data);
      this.accounts.filterData.activationTypeTokens = data;
      this.getAllAccounts();
    },
    search(data) {
      this.accounts.filterData.fillData(data);
      this.getAllAccounts();
    },
    async getAllAccounts() {
      this.isLoading = true;
      try {
        this.accounts.accountsData = [];
        const response = await apiAccount.getAll(this.accounts.filterData);
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
        this.accounts.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllAccounts();
  },
};
</script>
