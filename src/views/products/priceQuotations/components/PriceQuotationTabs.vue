<template>
  <b-tabs v-if="theOptions" content-class="">
    <b-tab
      v-for="(option, index) in theOptions"
      :key="index"
      @click="
        filter(option.itemToken);
        currentTab = option.currentTab;
      "
      :title-item-class="'custom-tab-outer-li'"
      :active="currentTab == option.currentTab ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <span class="badge badge-dark" style="margin-inline-start: 8px">
            {{ option.count }}
          </span>
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span>
        </span>
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasPriceQuotationWorkProgress,
  hasPriceQuotationWaitingForQuotes,
  hasPriceQuotationWaitingForCustomerAccept,
  hasPriceQuotationRejectedQuotesFormCustomer,
  hasPriceQuotationAcceptQuotesFormCustomer,
  hasPriceQuotationInJobOrder,
  hasPriceQuotationFinishJobOrderNotCustomerReceive,
  hasPriceQuotationFinishJobOrderCustomerReceive,
  hasPriceQuotationCanceled,
} from "./../../../../utils/privilegeHelper";
import imgWorkProgress from "@/assets/images/PriceQuotations_WorkProgress.svg";
import imgWaitingForQuotes from "@/assets/images/PriceQuotations_WaitingForQuotes.svg";
import imgWaitingForCustomerAccept from "@/assets/images/PriceQuotations_WaitingForCustomerAccept.svg";
import imgRejectedQuotesFormCustomer from "@/assets/images/PriceQuotations_RejectedQuotesFormCustomer.svg";
import imgAcceptQuotesFormCustomer from "@/assets/images/PriceQuotations_AcceptQuotesFormCustomer.svg";
import imgInJobOrder from "@/assets/images/PriceQuotations_InJobOrder.svg";
import imgFinishJobOrderNotCustomerReceive from "@/assets/images/PriceQuotations_FinishJobOrderNotCustomerReceive.svg";
import imgFinishJobOrderCustomerReceive from "@/assets/images/PriceQuotations_FinishJobOrderCustomerReceive.svg";
import imgCanceled from "@/assets/images/PriceQuotations_Canceled.svg";
import { PRICE_QUOTATION_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";

export default {
  name: "CountedServiceTransactionsTabs",
  props: {
    theFilterData: {
      type: Object,
    },
    statistics: {
      type: Object,
    },
    tabNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentTab: "",
      filterData: this.theFilterData,
    };
  },
  computed: {
    theOptions() {
      let tabOptions = [];

      if (this.tabNumber == 1) {
        if (checkPrivilege(hasPriceQuotationWorkProgress())) {
          tabOptions.push({
            itemToken: PRICE_QUOTATION_HISTORY_WORK_TYPES.WorkProgress,
            itemName: this.$t("PriceQuotationHistoryWorkType.WorkProgress"),
            itemImagePath: imgWorkProgress,
            currentTab: "WorkProgress",
            count: this.statistics.totalWorkProgress,
          });
        }

        if (checkPrivilege(hasPriceQuotationWaitingForQuotes())) {
          tabOptions.push({
            itemToken: PRICE_QUOTATION_HISTORY_WORK_TYPES.WaitingForQuotes,
            itemName: this.$t("PriceQuotationHistoryWorkType.WaitingForQuotes"),
            itemImagePath: imgWaitingForQuotes,
            currentTab: "WaitingForQuotes",
            count: this.statistics.totalWaitingForQuotes,
          });
        }

        if (checkPrivilege(hasPriceQuotationWaitingForCustomerAccept())) {
          tabOptions.push({
            itemToken:
              PRICE_QUOTATION_HISTORY_WORK_TYPES.WaitingForCustomerAccept,
            itemName: this.$t(
              "PriceQuotationHistoryWorkType.WaitingForCustomerAccept"
            ),
            itemImagePath: imgWaitingForCustomerAccept,
            currentTab: "WaitingForCustomerAccept",
            count: this.statistics.totalWaitingForCustomerAccept,
          });
        }

        if (checkPrivilege(hasPriceQuotationAcceptQuotesFormCustomer())) {
          tabOptions.push({
            itemToken:
              PRICE_QUOTATION_HISTORY_WORK_TYPES.AcceptQuotesFormCustomer,
            itemName: this.$t(
              "PriceQuotationHistoryWorkType.AcceptQuotesFormCustomer"
            ),
            itemImagePath: imgAcceptQuotesFormCustomer,
            currentTab: "AcceptQuotesFormCustomer",
            count: this.statistics.totalAcceptQuotesFormCustomer,
          });
        }

        if (checkPrivilege(hasPriceQuotationRejectedQuotesFormCustomer())) {
          tabOptions.push({
            itemToken:
              PRICE_QUOTATION_HISTORY_WORK_TYPES.RejectedQuotesFormCustomer,
            itemName: this.$t(
              "PriceQuotationHistoryWorkType.RejectedQuotesFormCustomer"
            ),
            itemImagePath: imgRejectedQuotesFormCustomer,
            currentTab: "RejectedQuotesFormCustomer",
            count: this.statistics.totalRejectedQuotesFormCustomer,
          });
        }
      } else if (this.tabNumber == 2) {
        if (checkPrivilege(hasPriceQuotationInJobOrder())) {
          tabOptions.push({
            itemToken: PRICE_QUOTATION_HISTORY_WORK_TYPES.InJobOrder,
            itemName: this.$t("PriceQuotationHistoryWorkType.InJobOrder"),
            itemImagePath: imgInJobOrder,
            currentTab: "InJobOrder",
            count: this.statistics.totalInJobOrder,
          });
        }

        if (
          checkPrivilege(hasPriceQuotationFinishJobOrderNotCustomerReceive())
        ) {
          tabOptions.push({
            itemToken:
              PRICE_QUOTATION_HISTORY_WORK_TYPES.FinishJobOrderNotCustomerReceive,
            itemName: this.$t(
              "PriceQuotationHistoryWorkType.FinishJobOrderNotCustomerReceive"
            ),
            itemImagePath: imgFinishJobOrderNotCustomerReceive,
            currentTab: "FinishJobOrderNotCustomerReceive",
            count: this.statistics.totalFinishJobOrderNotCustomerReceive,
          });
        }

        if (checkPrivilege(hasPriceQuotationFinishJobOrderCustomerReceive())) {
          tabOptions.push({
            itemToken:
              PRICE_QUOTATION_HISTORY_WORK_TYPES.FinishJobOrderCustomerReceive,
            itemName: this.$t(
              "PriceQuotationHistoryWorkType.FinishJobOrderCustomerReceive"
            ),
            itemImagePath: imgFinishJobOrderCustomerReceive,
            currentTab: "FinishJobOrderCustomerReceive",
            count: this.statistics.totalFinishJobOrderCustomerReceive,
          });
        }

        if (checkPrivilege(hasPriceQuotationCanceled())) {
          tabOptions.push({
            itemToken: PRICE_QUOTATION_HISTORY_WORK_TYPES.Canceled,
            itemName: this.$t("PriceQuotationHistoryWorkType.Canceled"),
            itemImagePath: imgCanceled,
            currentTab: "Canceled",
            count: this.statistics.totalCanceledbyCustomer,
          });
        }
      }

      return tabOptions;
    },
  },
  methods: {
    filter(token) {
      if (this.filterData.priceQuotationHistoryWorkTypeToken != token) {
        this.filterData.priceQuotationHistoryWorkTypeToken = token;
        this.$emit("search", this.filterData);
      }
    },
    setCurrentTab() {
      if (this.tabNumber == 1) {
        if (checkPrivilege(hasPriceQuotationWorkProgress()))
          this.currentTab = "WorkProgress";
        else if (checkPrivilege(hasPriceQuotationWaitingForQuotes()))
          this.currentTab = "WaitingForQuotes";
        else if (checkPrivilege(hasPriceQuotationWaitingForCustomerAccept()))
          this.currentTab = "WaitingForCustomerAccept";
        else if (checkPrivilege(hasPriceQuotationAcceptQuotesFormCustomer()))
          this.currentTab = "AcceptQuotesFormCustomer";
        else if (checkPrivilege(hasPriceQuotationRejectedQuotesFormCustomer()))
          this.currentTab = "RejectedQuotesFormCustomer";
        else this.currentTab = "";
      } else if (this.tabNumber == 2) {
        if (checkPrivilege(hasPriceQuotationInJobOrder()))
          this.currentTab = "InJobOrder";
        else if (
          checkPrivilege(hasPriceQuotationFinishJobOrderNotCustomerReceive())
        )
          this.currentTab = "FinishJobOrderNotCustomerReceive";
        else if (
          checkPrivilege(hasPriceQuotationFinishJobOrderCustomerReceive())
        )
          this.currentTab = "FinishJobOrderCustomerReceive";
        else if (checkPrivilege(hasPriceQuotationCanceled()))
          this.currentTab = "Canceled";
        else this.currentTab = "";
      }
    },
    currentTabUpdated() {
      this.$emit("currentTabUpdated", this.currentTab);
    },
  },
  watch: {
    currentTab() {
      this.currentTabUpdated();
    },
  },
  async created() {
    this.setCurrentTab();
  },
};
</script>
