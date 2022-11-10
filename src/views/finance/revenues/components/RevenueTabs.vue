<template>
  <b-tabs v-if="revenueTabs" content-class="">
    <b-tab
      v-for="(option, index) in revenueTabs"
      :key="index"
      @click="goTo(option.to)"
      :title-item-class="'custom-tab-outer-li'"
      :active="option.currentTab == $route.name ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span>
        </span>
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import imgRevenues from "@/assets/images/revenues.svg";
import imgRevenueTypes from "@/assets/images/revenuesTypes.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasRevenue,
  hasRevenuesType,
} from "./../../../../utils/privilegeHelper";

export default {
  name: "RevenueTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    revenueTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasRevenue())) {
        tabs.push({
          to: {
            name: "Revenues",
          },
          itemName: this.$t("Revenues.modelName"),
          itemImagePath: imgRevenues,
          currentTab: "Revenues",
        });
      }
      if (checkPrivilege(hasRevenuesType())) {
        tabs.push({
          to: {
            name: "RevenuesTypes",
          },
          itemName: this.$t("RevenuesTypes.modelName"),
          itemImagePath: imgRevenueTypes,
          currentTab: "RevenuesTypes",
        });
      }

      return tabs;
    },
  },
  watch: {},
  methods: {
    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
  },

  async created() {},
};
</script>
