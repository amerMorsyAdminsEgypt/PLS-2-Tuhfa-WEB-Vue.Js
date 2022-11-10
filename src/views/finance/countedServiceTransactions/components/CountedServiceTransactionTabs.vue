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
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span>
          <!-- <span class="badge badge-dark" style="margin-inline-start: 8px">
            {{ option.count }}
          </span> -->
        </span>
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasCountedServiceTransactionViewBuy,
  hasCountedServiceTransactionViewSell,
  hasCountedServiceTransactionViewRefund,
} from "./../../../../utils/privilegeHelper";
import imgBoughts from "@/assets/images/boughts.svg";
import imgSolds from "@/assets/images/solds.svg";
import imgRefunded from "@/assets/images/refund.svg";
import {
  COUNTED_SERVICE_TRANSACTION_TYPES,
  REFUND_TYPE_TOKENS,
} from "./../../../../utils/constantLists";

export default {
  name: "CountedServiceTransactionsTabs",
  props: {
    theFilterData: {
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

      if (checkPrivilege(hasCountedServiceTransactionViewBuy())) {
        tabOptions.push({
          itemToken: COUNTED_SERVICE_TRANSACTION_TYPES.Buy,
          itemName: this.$t("CountedServiceTransactions.boughts"),
          itemImagePath: imgBoughts,
          currentTab: "boughts",
        });
      }

      if (checkPrivilege(hasCountedServiceTransactionViewSell())) {
        tabOptions.push({
          itemToken: COUNTED_SERVICE_TRANSACTION_TYPES.Sell,
          itemName: this.$t("CountedServiceTransactions.solds"),
          itemImagePath: imgSolds,
          currentTab: "solds",
        });
      }

      if (checkPrivilege(hasCountedServiceTransactionViewRefund())) {
        tabOptions.push({
          itemToken: REFUND_TYPE_TOKENS.Refunded,
          itemName: this.$t("CountedServiceTransactions.refunded"),
          itemImagePath: imgRefunded,
          currentTab: "refunded",
        });
      }

      return tabOptions;
    },
  },
  methods: {
    filter(token) {
      switch (token) {
        case COUNTED_SERVICE_TRANSACTION_TYPES.Buy:
        case COUNTED_SERVICE_TRANSACTION_TYPES.Sell:
          this.filterData.countedServiceTransactionTypeToken = token;
          this.filterData.countedServiceTransactionRefundTypeToken =
            REFUND_TYPE_TOKENS.NotRefunded;
          break;
        case REFUND_TYPE_TOKENS.Refunded:
          this.filterData.countedServiceTransactionTypeToken = "";
          this.filterData.countedServiceTransactionRefundTypeToken = token;
          break;
        default:
          break;
      }
      this.$emit("search", this.filterData);
    },
    setCurrentTab() {
      if (checkPrivilege(hasCountedServiceTransactionViewBuy()))
        this.currentTab = "boughts";
      else if (checkPrivilege(hasCountedServiceTransactionViewSell()))
        this.currentTab = "solds";
      else if (checkPrivilege(hasCountedServiceTransactionViewRefund()))
        this.currentTab = "refunded";
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
