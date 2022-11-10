<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('installmentPayments', $event)"
      :viewType="generalSetting.installmentPayments.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.installmentPayments.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="false"
      :btnAddTitle="$t('InstallmentPayments.add')"
      :btnAddName="'InstallmentPaymentAdd'"
      :btnAddStatus="false"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <InstallmentPaymentTabs />

      <template v-if="hasData">
        <div v-if="filterInstallmentPaymentStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("InstallmentPayments.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterInstallmentPaymentStatistics"
                :key="index"
                class="col-md-4"
              >
                <StatisticsCard
                  :title="statistic.title"
                  :totalNumber="statistic.value"
                  :icon="statistic.icon"
                  :showPercentage="statistic.showPercentage"
                  :percentage="statistic.percentage"
                />
              </div>
            </div>
          </b-collapse>
        </div>
        <InstallmentPaymentTable
          v-if="generalSetting.installmentPayments.viewType == VIEW_TYPES.table"
          v-on:setInstallmentPaymentData="
            installmentPayments.installmentPayment.fillData($event)
          "
          :installmentPaymentsData="installmentPayments.installmentPaymentsData"
          :defaultImg="installmentPayments.installmentPayment.defaultImg"
          :filterData="installmentPayments.filterData"
        />

        <InstallmentPaymentCards
          v-else-if="
            generalSetting.installmentPayments.viewType == VIEW_TYPES.cards
          "
          v-on:setInstallmentPaymentData="
            installmentPayments.installmentPayment.fillData($event)
          "
          :installmentPaymentsData="installmentPayments.installmentPaymentsData"
          :defaultImg="installmentPayments.installmentPayment.defaultImg"
          :filterData="installmentPayments.filterData"
        />

        <ActionsData :actionsData="installmentPayments.installmentPayment" />
        <InstallmentPaymentInfo
          :installmentPayment="installmentPayments.installmentPayment"
        />
        <CustomBottomSheetQRCode
          :refName="'InstallmentPaymentQRCode'"
          :code="installmentPayments.installmentPayment.fullCode"
          :codeTitle="$t('InstallmentPayments.code')"
          :name="
            installmentPayments.installmentPayment
              .installmentPaymentDescriptionCurrent
          "
          :nameTitle="$t('InstallmentPayments.description')"
          :nameIcon="'installmentPayments.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="installmentPayments.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InstallmentPaymentFilter
        :theFilterData="installmentPayments.filterData"
        v-on:search="search($event)"
      />

      <InstallmentPaymentAdd
        :installmentPayment="installmentPayments.installmentPayment"
        v-on:refresh="getAllInstallmentPayments()"
      />
      <InstallmentPaymentRefund
        :installmentPayment="installmentPayments.installmentPayment"
        v-on:refresh="getAllInstallmentPayments()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
// import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import StatisticsCard from "./../../../components/general/StatisticsCard.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import InstallmentPaymentAdd from "./components/InstallmentPaymentAdd.vue";
import InstallmentPaymentRefund from "./components/InstallmentPaymentRefund.vue";
import InstallmentPaymentCards from "./components/InstallmentPaymentCards.vue";
import InstallmentPaymentTable from "./components/InstallmentPaymentTable.vue";
import InstallmentPaymentTabs from "./components/InstallmentPaymentTabs.vue";
import InstallmentPaymentInfo from "./components/InstallmentPaymentInfo.vue";
import InstallmentPaymentFilter from "./components/InstallmentPaymentFilter.vue";
import InstallmentPayments from "./../../../models/joiningApplications/installmentPayments/InstallmentPayments";
import apiInstallmentPayment from "./../../../api/joiningApplications/installmentPayments";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    StatisticsCard,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    InstallmentPaymentAdd,
    InstallmentPaymentRefund,
    InstallmentPaymentCards,
    InstallmentPaymentTable,
    InstallmentPaymentTabs,
    InstallmentPaymentInfo,
    InstallmentPaymentFilter,
  },
  computed: {
    hasData() {
      return this.installmentPayments.installmentPaymentsData.length != 0;
    },
  },
  data() {
    return {
      installmentPayments: new InstallmentPayments(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterInstallmentPaymentStatistics: [],
      activationTypesTokensOptions: [],
    };
  },
  props: {
    userToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkPrivilege,

    setFilteredStatistics() {
      let statistic = this.installmentPayments.installmentPaymentStatistics;

      this.filterInstallmentPaymentStatistics = [
        {
          title: this.$t("InstallmentPayments.statistics.totalPaymentMoney"),
          value: statistic.totalPaymentMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.accrualPaymentsMoneyPercentage,
            title: statistic.accrualPaymentsMoneyPercentageText,
          },
        },
        {
          title: this.$t(
            "InstallmentPayments.statistics.totalRefundPaymentMoney"
          ),
          value: statistic.totalRefundPaymentMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.refundPaymentsMoneyPercentage,
            title: statistic.refundPaymentsMoneyPercentageText,
          },
        },
        {
          title: this.$t(
            "InstallmentPayments.statistics.totalDifferenceInstallmentsMoney"
          ),
          value: statistic.totalDifferenceInstallmentsMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.differenceInstallmentsMoneyPercentage,
            title: statistic.differenceInstallmentsMoneyPercentageText,
          },
        },
      ];
    },
    changePagination(pagination) {
      this.installmentPayments.filterData.fillData(pagination);
      this.getAllInstallmentPayments();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("installmentPayments", data);
      this.installmentPayments.filterData.activationTypeTokens = data;
      this.getAllInstallmentPayments();
    },
    search(data) {
      this.installmentPayments.filterData.fillData(data);
      this.getAllInstallmentPayments();
    },
    async getAllInstallmentPayments() {
      this.isLoading = true;
      try {
        this.installmentPayments.installmentPaymentsData = [];
        const response = await apiInstallmentPayment.getAll(
          this.installmentPayments.filterData
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
        this.installmentPayments.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.installmentPayments.filterData.debtUserToken = this.userToken;
    await this.getAllInstallmentPayments();
    await this.setFilteredStatistics();
  },
};
</script>
