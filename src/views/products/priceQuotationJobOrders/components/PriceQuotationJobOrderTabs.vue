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
  hasPriceQuotationJobOrderNewlyWanted,
  hasPriceQuotationJobOrderWorkProgres,
  hasPriceQuotationJobOrderFinishNotCustomerReceived,
  hasPriceQuotationJobOrderFinishCustomerReceived,
  hasPriceQuotationJobOrderCanceled,
} from "./../../../../utils/privilegeHelper";
import imgNewlyWanted from "@/assets/images/PriceQuotations_WaitingForQuotes.svg";
import imgWorkProgres from "@/assets/images/PriceQuotations_WorkProgress.svg";
import imgFinishNotCustomerReceived from "@/assets/images/PriceQuotations_FinishJobOrderNotCustomerReceive.svg";
import imgFinishCustomerReceived from "@/assets/images/PriceQuotations_FinishJobOrderCustomerReceive.svg";
import imgCanceled from "@/assets/images/PriceQuotations_Canceled.svg";

import { JOB_ORDER_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";

export default {
  name: "PriceQuotationJobOrdersTabs",
  props: {
    theFilterData: {
      type: Object,
    },
    statistics: {
      type: Object,
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

      if (checkPrivilege(hasPriceQuotationJobOrderNewlyWanted())) {
        tabOptions.push({
          itemToken: JOB_ORDER_HISTORY_WORK_TYPES.NewlyWanted,
          itemName: this.$t("QuotationJobOrdersHistoryWorkType.NewlyWanted"),
          itemImagePath: imgNewlyWanted,
          currentTab: "NewlyWanted",
          count: this.statistics.totalNewlyWanted,
        });
      }
      if (checkPrivilege(hasPriceQuotationJobOrderWorkProgres())) {
        tabOptions.push({
          itemToken: JOB_ORDER_HISTORY_WORK_TYPES.WorkProgres,
          itemName: this.$t("QuotationJobOrdersHistoryWorkType.WorkProgres"),
          itemImagePath: imgWorkProgres,
          currentTab: "WorkProgres",
          count: this.statistics.totalWorkProgress,
        });
      }
      if (
        checkPrivilege(hasPriceQuotationJobOrderFinishNotCustomerReceived())
      ) {
        tabOptions.push({
          itemToken: JOB_ORDER_HISTORY_WORK_TYPES.FinishNotCustomerReceived,
          itemName: this.$t(
            "QuotationJobOrdersHistoryWorkType.FinishNotCustomerReceived"
          ),
          itemImagePath: imgFinishNotCustomerReceived,
          currentTab: "FinishNotCustomerReceived",
          count: this.statistics.totalFinishNotCustomerReceived,
        });
      }
      if (checkPrivilege(hasPriceQuotationJobOrderFinishCustomerReceived())) {
        tabOptions.push({
          itemToken: JOB_ORDER_HISTORY_WORK_TYPES.FinishCustomerReceived,
          itemName: this.$t(
            "QuotationJobOrdersHistoryWorkType.FinishCustomerReceived"
          ),
          itemImagePath: imgFinishCustomerReceived,
          currentTab: "FinishCustomerReceived",
          count: this.statistics.totalFinishCustomerReceived,
        });
      }
      if (checkPrivilege(hasPriceQuotationJobOrderCanceled())) {
        tabOptions.push({
          itemToken: JOB_ORDER_HISTORY_WORK_TYPES.Canceled,
          itemName: this.$t("QuotationJobOrdersHistoryWorkType.Canceled"),
          itemImagePath: imgCanceled,
          currentTab: "Canceled",
          count: this.statistics.totalCanceled,
        });
      }

      return tabOptions;
    },
  },
  methods: {
    filter(token) {
      if (this.filterData.jobOrderHistoryWorkTypeToken != token) {
        this.filterData.jobOrderHistoryWorkTypeToken = token;
        this.$emit("search", this.filterData);
      }
    },
    setCurrentTab() {
      if (checkPrivilege(hasPriceQuotationJobOrderNewlyWanted()))
        this.currentTab = "NewlyWanted";
      else if (checkPrivilege(hasPriceQuotationJobOrderWorkProgres()))
        this.currentTab = "WorkProgres";
      else if (
        checkPrivilege(hasPriceQuotationJobOrderFinishNotCustomerReceived())
      )
        this.currentTab = "FinishNotCustomerReceived";
      else if (
        checkPrivilege(hasPriceQuotationJobOrderFinishCustomerReceived())
      )
        this.currentTab = "FinishCustomerReceived";
      else if (checkPrivilege(hasPriceQuotationJobOrderCanceled()))
        this.currentTab = "Canceled";
      else this.currentTab = "";
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
