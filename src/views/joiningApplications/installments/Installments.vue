<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('installments', $event)"
      :viewType="generalSetting.installments.viewType"
      :viewTypeStatus="true"
      :btnAddTitle="$t('Installments.add')"
      :btnAddName="'InstallmentAdd'"
      :btnAddStatus="checkPrivilege(hasInstallmentAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <DebtTabs />

      <template v-if="hasData">
        <div v-if="filterInstallmentStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("Installments.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterInstallmentStatistics"
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
        <InstallmentTable
          v-if="generalSetting.installments.viewType == VIEW_TYPES.table"
          v-on:setInstallmentData="installments.installment.fillData($event)"
          :installmentsData="installments.installmentsData"
          :defaultImg="installments.installment.defaultImg"
          :filterData="installments.filterData"
          v-on:addInstallmentPayment="addInstallmentPayment($event)"
        />

        <InstallmentCards
          v-else-if="generalSetting.installments.viewType == VIEW_TYPES.cards"
          v-on:setInstallmentData="installments.installment.fillData($event)"
          :installmentsData="installments.installmentsData"
          :defaultImg="installments.installment.defaultImg"
          :filterData="installments.filterData"
        />

        <ActionsData :actionsData="installments.installment" />
        <InstallmentInfo
          :installment="installments.installment"
          v-on:addInstallmentPayment="addInstallmentPayment($event)"
        />

        <InstallmentCancel
          :installment="installments.installment"
          v-on:refresh="getAllInstallments()"
        />
        <CustomBottomSheetQRCode
          :refName="'InstallmentQRCode'"
          :code="installments.installment.fullCode"
          :codeTitle="$t('Installments.code')"
          :name="installments.installment.installmentNameCurrent"
          :nameTitle="$t('Installments.name')"
          :nameIcon="'installments.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="installments.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <InstallmentFilter
        :theFilterData="installments.filterData"
        v-on:search="search($event)"
      />

      <InstallmentAdd
        :installment="installments.installment"
        v-on:refresh="getAllInstallments()"
      />
      <InstallmentUpdate
        :installment="installments.installment"
        v-on:refresh="getAllInstallments()"
      />
      <InstallmentPaymentAdd
        :installmentPayment="installmentPayments.installmentPayment"
        v-on:refresh="getAllInstallments()"
      />
    </div>
  </div>
</template>

<script>
import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import StatisticsCard from "./../../../components/general/StatisticsCard.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import InstallmentAdd from "./components/InstallmentAdd.vue";
import InstallmentUpdate from "./components/InstallmentUpdate.vue";
import InstallmentCards from "./components/InstallmentCards.vue";
import InstallmentTable from "./components/InstallmentTable.vue";
import InstallmentInfo from "./components/InstallmentInfo.vue";
import DebtTabs from "./../debts/components/DebtTabs.vue";
import InstallmentCancel from "./components/InstallmentCancel.vue";
import InstallmentFilter from "./components/InstallmentFilter.vue";
import Installments from "./../../../models/joiningApplications/installments/Installments";
import apiInstallment from "./../../../api/joiningApplications/installments";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasInstallmentAdd } from "./../../../utils/privilegeHelper";
import InstallmentPaymentAdd from "./../installmentPayments/components/InstallmentPaymentAdd.vue";
import InstallmentPayments from "./../../../models/joiningApplications/installmentPayments/InstallmentPayments";

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
    InstallmentAdd,
    InstallmentUpdate,
    InstallmentCards,
    InstallmentTable,
    InstallmentInfo,
    DebtTabs,
    InstallmentCancel,
    InstallmentFilter,
    InstallmentPaymentAdd,
  },
  computed: {
    hasData() {
      return this.installments.installmentsData.length != 0;
    },
  },
  data() {
    return {
      installments: new Installments(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterInstallmentStatistics: [],
      installmentPayments: new InstallmentPayments(),
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
    hasInstallmentAdd,
    addInstallmentPayment(scheduleTime) {
      this.installmentPayments.installmentPayment.installmentScheduleTimeInfo =
        scheduleTime;
      this.installmentPayments.installmentPayment.installmentScheduleTimeToken =
        scheduleTime.installmentScheduleTimeToken;
      this.installmentPayments.installmentPayment.installmentPaymentMoney =
        scheduleTime.remainderMoney;
      this.installmentPayments.installmentPayment.remainderMoney =
        scheduleTime.remainderMoney;
      this.openBottomSheet("InstallmentPaymentAdd");
    },
    setFilteredStatistics() {
      let statistic = this.installments.installmentsStatistics;

      this.filterInstallmentStatistics = [
        {
          title: this.$t(
            "Installments.statistics.totalScheduleInstallmentMoney"
          ),
          value: statistic.totalScheduleInstallmentMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: false,
          percentage: {
            value: 0,
            title: "",
          },
        },
        {
          title: this.$t("Installments.statistics.totalScheduleIPaidMoney"),
          value: statistic.totalScheduleIPaidMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.paidPercentage,
            title: statistic.paidPercentageText,
          },
        },
        {
          title: this.$t("Installments.statistics.totalScheduleRemainderMoney"),
          value: statistic.totalScheduleRemainderMoneyWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.remainderPercentage,
            title: statistic.remainderPercentageText,
          },
        },
      ];
    },
    changePagination(pagination) {
      this.installments.filterData.fillData(pagination);
      this.getAllInstallments();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("installments", data);
      this.installments.filterData.activationTypeTokens = data;
      this.getAllInstallments();
    },
    search(data) {
      this.installments.filterData.fillData(data);
      this.getAllInstallments();
    },
    async getAllInstallments() {
      this.isLoading = true;
      try {
        this.installments.installmentsData = [];
        const response = await apiInstallment.getAll(
          this.installments.filterData
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
        this.installments.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.installments.filterData.debtUserToken = this.userToken;
    await this.getAllInstallments();
    await this.setFilteredStatistics();
  },
};
</script>
