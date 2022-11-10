<template>
  <b-tabs v-if="geographicalDistributionTabs" content-class="">
    <b-tab
      v-for="(option, index) in geographicalDistributionTabs"
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
import imgGeographicalDistributions from "@/assets/images/geographicalDistributions.svg";
import imgSystemComponentGeographicalDistribution from "@/assets/images/systemComponents.svg";
import imgSystemComponentsHierarchyGeographicalDistribution from "@/assets/images/systemComponentsHierarchies.svg";
import { checkPrivilege } from "@/utils/functions";
import {
  hasGeographicalDistribution,
  hasSystemComponentGeographicalDistribution,
  hasSystemComponentsHierarchyGeographicalDistribution,
} from "@/utils/privilegeHelper";

export default {
  name: "GeographicalDistributionTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    geographicalDistributionTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasGeographicalDistribution())) {
        tabs.push({
          to: {
            name: "GeographicalDistributions",
          },
          itemName: this.$t("GeographicalDistributions.modelName"),
          itemImagePath: imgGeographicalDistributions,
          currentTab: "GeographicalDistributions",
        });
      }

      if (
        checkPrivilege(hasSystemComponentsHierarchyGeographicalDistribution())
      ) {
        tabs.push({
          to: {
            name: "SystemComponentsHierarchyGeographicalDistribution",
          },
          itemName: this.$t("SystemComponentsHierarchies.modelName"),
          itemImagePath: imgSystemComponentsHierarchyGeographicalDistribution,
          currentTab: "SystemComponentsHierarchyGeographicalDistribution",
        });
      }

      if (checkPrivilege(hasSystemComponentGeographicalDistribution())) {
        tabs.push({
          to: {
            name: "SystemComponentGeographicalDistribution",
          },
          itemName: this.$t("SystemComponents.modelName"),
          itemImagePath: imgSystemComponentGeographicalDistribution,
          currentTab: "SystemComponentGeographicalDistribution",
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
