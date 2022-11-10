<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('serviceEntitlements', $event)"
      :viewType="generalSetting.serviceEntitlements.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.serviceEntitlements.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="false"
      :btnAddTitle="$t('ServiceEntitlements.accrual')"
      :btnAddName="'ServiceEntitlementAccrual'"
      :btnAddStatus="checkPrivilege(hasServiceEntitlementAccrual())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <InstallmentPaymentTabs />

      <template v-if="hasData">
        <div v-if="filterServiceEntitlementStatistics" class="statistics">
          <b-button v-b-toggle.statistics class="btn btn-lg btn-collapse">
            {{ $t("ServiceEntitlements.statistics.modelName") }}
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </b-button>
          <b-collapse id="statistics">
            <div class="row">
              <div
                v-for="(statistic, index) in filterServiceEntitlementStatistics"
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
        <ServiceEntitlementTable
          v-if="generalSetting.serviceEntitlements.viewType == VIEW_TYPES.table"
          v-on:setServiceEntitlementData="
            serviceEntitlements.serviceEntitlement.fillData($event)
          "
          :serviceEntitlementsData="serviceEntitlements.serviceEntitlementsData"
          :defaultImg="serviceEntitlements.serviceEntitlement.defaultImg"
          :filterData="serviceEntitlements.filterData"
        />

        <ServiceEntitlementCards
          v-else-if="
            generalSetting.serviceEntitlements.viewType == VIEW_TYPES.cards
          "
          v-on:setServiceEntitlementData="
            serviceEntitlements.serviceEntitlement.fillData($event)
          "
          :serviceEntitlementsData="serviceEntitlements.serviceEntitlementsData"
          :defaultImg="serviceEntitlements.serviceEntitlement.defaultImg"
          :filterData="serviceEntitlements.filterData"
        />

        <ActionsData :actionsData="serviceEntitlements.serviceEntitlement" />
        <ServiceEntitlementInfo
          :serviceEntitlement="serviceEntitlements.serviceEntitlement"
        />
        <CustomBottomSheetQRCode
          :refName="'ServiceEntitlementQRCode'"
          :code="serviceEntitlements.serviceEntitlement.fullCode"
          :codeTitle="$t('ServiceEntitlements.code')"
          :name="
            serviceEntitlements.serviceEntitlement
              .serviceEntitlementDescriptionCurrent
          "
          :nameTitle="$t('ServiceEntitlements.description')"
          :nameIcon="'serviceEntitlements.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="serviceEntitlements.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <ServiceEntitlementFilter
        :theFilterData="serviceEntitlements.filterData"
        v-on:search="search($event)"
      />

      <ServiceEntitlementAccrual
        :serviceEntitlement="serviceEntitlements.serviceEntitlement"
        v-on:refresh="getAllServiceEntitlements()"
      />
      <ServiceEntitlementRefund
        :serviceEntitlement="serviceEntitlements.serviceEntitlement"
        v-on:refresh="getAllServiceEntitlements()"
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
import ServiceEntitlementAccrual from "./components/ServiceEntitlementAccrual.vue";
import ServiceEntitlementRefund from "./components/ServiceEntitlementRefund.vue";
import ServiceEntitlementCards from "./components/ServiceEntitlementCards.vue";
import ServiceEntitlementTable from "./components/ServiceEntitlementTable.vue";
import ServiceEntitlementInfo from "./components/ServiceEntitlementInfo.vue";
import ServiceEntitlementFilter from "./components/ServiceEntitlementFilter.vue";
import InstallmentPaymentTabs from "./../installmentPayments/components/InstallmentPaymentTabs.vue";
import ServiceEntitlements from "./../../../models/joiningApplications/serviceEntitlements/ServiceEntitlements";
import apiServiceEntitlement from "./../../../api/joiningApplications/serviceEntitlements";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import { hasServiceEntitlementAccrual } from "./../../../utils/privilegeHelper";

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
    ServiceEntitlementAccrual,
    ServiceEntitlementRefund,
    ServiceEntitlementCards,
    ServiceEntitlementTable,
    ServiceEntitlementInfo,
    ServiceEntitlementFilter,
    InstallmentPaymentTabs,
  },
  computed: {
    hasData() {
      return this.serviceEntitlements.serviceEntitlementsData.length != 0;
    },
  },
  data() {
    return {
      serviceEntitlements: new ServiceEntitlements(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
      filterServiceEntitlementStatistics: [],
      activationTypesTokensOptions: [],
    };
  },
  methods: {
    checkPrivilege,
    hasServiceEntitlementAccrual,
    setFilteredStatistics() {
      let statistic = this.serviceEntitlements.serviceEntitlementStatistics;

      this.filterServiceEntitlementStatistics = [
        {
          title: this.$t("ServiceEntitlements.statistics.totalPaymentMoney"),
          value: statistic.totalAccuralServiceEntitlementWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.accrualServiceEntitlementPercentage,
            title: statistic.accrualServiceEntitlementPercentageText,
          },
        },
        {
          title: this.$t(
            "ServiceEntitlements.statistics.totalRefundPaymentMoney"
          ),
          value: statistic.totalRefundServiceEntitlementWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.refundServiceEntitlementPercentage,
            title: statistic.refundServiceEntitlementPercentageText,
          },
        },
        {
          title: this.$t(
            "ServiceEntitlements.statistics.totalDifferenceInstallmentsMoney"
          ),
          value: statistic.totalDifferenceServiceEntitlementWithCurrency,
          icon: "money.svg",
          showPercentage: true,
          percentage: {
            value: statistic.differenceServiceEntitlementPercentage,
            title: statistic.differenceServiceEntitlementPercentageText,
          },
        },
      ];
    },
    changePagination(pagination) {
      this.serviceEntitlements.filterData.fillData(pagination);
      this.getAllServiceEntitlements();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("serviceEntitlements", data);
      this.serviceEntitlements.filterData.activationTypeTokens = data;
      this.getAllServiceEntitlements();
    },
    search(data) {
      this.serviceEntitlements.filterData.fillData(data);
      this.getAllServiceEntitlements();
    },
    async getAllServiceEntitlements() {
      this.isLoading = true;
      try {
        this.serviceEntitlements.serviceEntitlementsData = [];
        const response = await apiServiceEntitlement.getAll(
          this.serviceEntitlements.filterData
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
        this.serviceEntitlements.fillData(response.data);
      } catch (error) {
        // console.log(error);
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    await this.getAllServiceEntitlements();
    await this.setFilteredStatistics();
  },
};
</script>
