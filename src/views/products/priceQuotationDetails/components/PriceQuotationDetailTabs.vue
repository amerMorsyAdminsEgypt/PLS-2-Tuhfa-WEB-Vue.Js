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
  hasPriceQuotationDetailNewlyWanted,
  hasPriceQuotationDetailWorkProgres,
  hasPriceQuotationDetailReviewedByCustomer,
  hasPriceQuotationDetailRejectedByCustomer,
  hasPriceQuotationDetailWaitingForQuotes,
  hasPriceQuotationDetailCanceledbyCustomer,
} from "./../../../../utils/privilegeHelper";
import imgNewlyWanted from "@/assets/images/PriceQuotations_WaitingForCustomerAccept.svg";
import imgWorkProgres from "@/assets/images/PriceQuotations_WorkProgress.svg";
import imgReviewedByCustomer from "@/assets/images/PriceQuotations_WorkProgress.svg";
import imgRejectedByCustomer from "@/assets/images/PriceQuotations_RejectedQuotesFormCustomer.svg";
import imgWaitingForQuotes from "@/assets/images/PriceQuotations_WaitingForQuotes.svg";
import imgCanceledbyCustomer from "@/assets/images/PriceQuotations_Canceled.svg";

import { QUOTATION_DETAILS_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";

export default {
  name: "PriceQuotationDetailsTabs",
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

      if (checkPrivilege(hasPriceQuotationDetailNewlyWanted())) {
        tabOptions.push({
          itemToken: QUOTATION_DETAILS_HISTORY_WORK_TYPES.NewlyWanted,
          itemName: this.$t("QuotationDetailsHistoryWorkType.NewlyWanted"),
          itemImagePath: imgNewlyWanted,
          currentTab: "NewlyWanted",
          count: this.statistics.totalNewlyWanted,
        });
      }
      if (checkPrivilege(hasPriceQuotationDetailWorkProgres())) {
        tabOptions.push({
          itemToken: QUOTATION_DETAILS_HISTORY_WORK_TYPES.WorkProgres,
          itemName: this.$t("QuotationDetailsHistoryWorkType.WorkProgres"),
          itemImagePath: imgWorkProgres,
          currentTab: "WorkProgres",
          count: this.statistics.totalWorkProgres,
        });
      }
      if (checkPrivilege(hasPriceQuotationDetailReviewedByCustomer())) {
        tabOptions.push({
          itemToken: QUOTATION_DETAILS_HISTORY_WORK_TYPES.ReviewedByCustomer,
          itemName: this.$t(
            "QuotationDetailsHistoryWorkType.ReviewedByCustomer"
          ),
          itemImagePath: imgReviewedByCustomer,
          currentTab: "ReviewedByCustomer",
          count: this.statistics.totalReviewedByCustomer,
        });
      }
      if (checkPrivilege(hasPriceQuotationDetailRejectedByCustomer())) {
        tabOptions.push({
          itemToken: QUOTATION_DETAILS_HISTORY_WORK_TYPES.RejectedByCustomer,
          itemName: this.$t(
            "QuotationDetailsHistoryWorkType.RejectedByCustomer"
          ),
          itemImagePath: imgRejectedByCustomer,
          currentTab: "RejectedByCustomer",
          count: this.statistics.totalRejectedByCustomer,
        });
      }
      if (checkPrivilege(hasPriceQuotationDetailWaitingForQuotes())) {
        tabOptions.push({
          itemToken: QUOTATION_DETAILS_HISTORY_WORK_TYPES.WaitingForQuotes,
          itemName: this.$t("QuotationDetailsHistoryWorkType.WaitingForQuotes"),
          itemImagePath: imgWaitingForQuotes,
          currentTab: "WaitingForQuotes",
          count: this.statistics.totalWaitingForQuotes,
        });
      }
      if (checkPrivilege(hasPriceQuotationDetailCanceledbyCustomer())) {
        tabOptions.push({
          itemToken: QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer,
          itemName: this.$t(
            "QuotationDetailsHistoryWorkType.CanceledbyCustomer"
          ),
          itemImagePath: imgCanceledbyCustomer,
          currentTab: "CanceledbyCustomer",
          count: this.statistics.totalCanceledbyCustomer,
        });
      }

      return tabOptions;
    },
  },
  methods: {
    filter(token) {
      if (this.filterData.quotationDetailsHistoryWorkTypeToken != token) {
        this.filterData.quotationDetailsHistoryWorkTypeToken = token;
        this.$emit("search", this.filterData);
      }
    },
    setCurrentTab() {
      if (checkPrivilege(hasPriceQuotationDetailNewlyWanted()))
        this.currentTab = "NewlyWanted";
      else if (checkPrivilege(hasPriceQuotationDetailWorkProgres()))
        this.currentTab = "WorkProgres";
      else if (checkPrivilege(hasPriceQuotationDetailReviewedByCustomer()))
        this.currentTab = "ReviewedByCustomer";
      else if (checkPrivilege(hasPriceQuotationDetailRejectedByCustomer()))
        this.currentTab = "RejectedByCustomer";
      else if (checkPrivilege(hasPriceQuotationDetailWaitingForQuotes()))
        this.currentTab = "WaitingForQuotes";
      else if (checkPrivilege(hasPriceQuotationDetailCanceledbyCustomer()))
        this.currentTab = "CanceledbyCustomer";
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
