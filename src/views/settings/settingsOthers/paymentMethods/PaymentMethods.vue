<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('paymentMethods', $event)"
      :viewType="generalSetting.paymentMethods.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="generalSetting.paymentMethods.activationTypeTokens"
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('PaymentMethods.add')"
      :btnAddName="'PaymentMethodAdd'"
      :btnAddStatus="checkPrivilege(hasPaymentMethodAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <template v-if="hasData">
        <PaymentMethodTable
          v-if="generalSetting.paymentMethods.viewType == VIEW_TYPES.table"
          v-on:setPaymentMethodData="
            paymentMethods.paymentMethod.fillData($event)
          "
          :paymentMethodsData="paymentMethods.paymentMethodsData"
          :defaultImg="paymentMethods.paymentMethod.defaultImg"
          :filterData="paymentMethods.filterData"
        />

        <PaymentMethodCards
          v-else-if="generalSetting.paymentMethods.viewType == VIEW_TYPES.cards"
          v-on:setPaymentMethodData="
            paymentMethods.paymentMethod.fillData($event)
          "
          :paymentMethodsData="paymentMethods.paymentMethodsData"
          :defaultImg="paymentMethods.paymentMethod.defaultImg"
          :filterData="paymentMethods.filterData"
        />

        <ActionsData :actionsData="paymentMethods.paymentMethod" />
        <PaymentMethodInfo :paymentMethod="paymentMethods.paymentMethod" />
        <PaymentMethodDelete
          :paymentMethod="paymentMethods.paymentMethod"
          v-on:refresh="getAllPaymentMethods()"
        />
        <PaymentMethodChangeActivationType
          :paymentMethod="paymentMethods.paymentMethod"
          v-on:refresh="getAllPaymentMethods()"
        />
        <CustomBottomSheetQRCode
          :refName="'PaymentMethodQRCode'"
          :code="paymentMethods.paymentMethod.fullCode"
          :codeTitle="$t('PaymentMethods.code')"
          :name="paymentMethods.paymentMethod.paymentMethodNameCurrent"
          :nameTitle="$t('PaymentMethods.name')"
          :nameIcon="'paymentMethods.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="paymentMethods.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <PaymentMethodFilter
        :theFilterData="paymentMethods.filterData"
        v-on:search="search($event)"
      />

      <PaymentMethodAdd
        :paymentMethod="paymentMethods.paymentMethod"
        v-on:refresh="getAllPaymentMethods()"
      />
      <PaymentMethodUpdate
        :paymentMethod="paymentMethods.paymentMethod"
        v-on:refresh="getAllPaymentMethods()"
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
import PaymentMethodAdd from "./components/PaymentMethodAdd.vue";
import PaymentMethodUpdate from "./components/PaymentMethodUpdate.vue";
import PaymentMethodCards from "./components/PaymentMethodCards.vue";
import PaymentMethodTable from "./components/PaymentMethodTable.vue";
import PaymentMethodInfo from "./components/PaymentMethodInfo.vue";
import PaymentMethodDelete from "./components/PaymentMethodDelete.vue";
import PaymentMethodChangeActivationType from "./components/PaymentMethodChangeActivationType.vue";
import PaymentMethodFilter from "./components/PaymentMethodFilter.vue";
import PaymentMethods from "./../../../../models/settings/settingsOthers/paymentMethods/PaymentMethods";
import apiPaymentMethod from "./../../../../api/settings/settingsOthers/paymentMethods";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasPaymentMethodAdd,
  hasPaymentMethodViewActive,
  hasPaymentMethodViewArchive,
  hasPaymentMethodViewBlocked,
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
    PaymentMethodAdd,
    PaymentMethodUpdate,
    PaymentMethodCards,
    PaymentMethodTable,
    PaymentMethodInfo,
    PaymentMethodDelete,
    PaymentMethodChangeActivationType,
    PaymentMethodFilter,
  },
  computed: {
    hasData() {
      return this.paymentMethods.paymentMethodsData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasPaymentMethodViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.paymentMethods.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPaymentMethodViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.paymentMethods.activationStatistics.totalArchivedCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasPaymentMethodViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.paymentMethods.activationStatistics.totalBlockedCount || 0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      paymentMethods: new PaymentMethods(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasPaymentMethodAdd,
    changePagination(pagination) {
      this.paymentMethods.filterData.fillData(pagination);
      this.getAllPaymentMethods();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("paymentMethods", data);
      this.paymentMethods.filterData.activationTypeTokens = data;
      this.getAllPaymentMethods();
    },
    search(data) {
      this.paymentMethods.filterData.fillData(data);
      this.getAllPaymentMethods();
    },
    async getAllPaymentMethods() {
      this.isLoading = true;
      try {
        this.paymentMethods.paymentMethodsData = [];
        const response = await apiPaymentMethod.getAll(
          this.paymentMethods.filterData
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
        this.paymentMethods.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getAllPaymentMethods();
  },
};
</script>
