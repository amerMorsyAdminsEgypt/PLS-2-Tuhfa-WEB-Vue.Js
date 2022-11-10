<template>
  <b-tabs v-if="countedServicesTabs" content-class="">
    <b-tab
      v-for="(option, index) in countedServicesTabs"
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
import imgCountedServices from "@/assets/images/countedServices.svg";
import imgCountedServiceTypes from "@/assets/images/countedServiceTypes.svg";
import { checkPrivilege } from "@/utils/functions";
import {
  hasCountedService,
  hasCountedServiceType,
} from "@/utils/privilegeHelper";

export default {
  name: "CountedServicesTabs",
  computed: {
    countedServicesTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasCountedService())) {
        tabs.push({
          to: { name: "CountedServices" },
          itemName: this.$t("CountedServices.modelName"),
          itemImagePath: imgCountedServices,
          currentTab: "CountedServices",
        });
      }

      if (checkPrivilege(hasCountedServiceType())) {
        tabs.push({
          to: { name: "CountedServiceTypes" },
          itemName: this.$t("CountedServiceTypes.modelName"),
          itemImagePath: imgCountedServiceTypes,
          currentTab: "CountedServiceTypes",
        });
      }

      return tabs;
    },
  },
  methods: {
    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
  },
};
</script>
