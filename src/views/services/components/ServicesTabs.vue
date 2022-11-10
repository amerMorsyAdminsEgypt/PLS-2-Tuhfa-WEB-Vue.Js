<template>
  <b-tabs v-if="servicesTabs" content-class="">
    <b-tab
      v-for="(option, index) in servicesTabs"
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
import imgServices from "@/assets/images/services.svg";
import imgServiceTypes from "@/assets/images/serviceTypes.svg";
import { checkPrivilege } from "@/utils/functions";
import { hasService, hasServiceType } from "@/utils/privilegeHelper";

export default {
  name: "ServicesTabs",
  computed: {
    servicesTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasService())) {
        tabs.push({
          to: { name: "Services" },
          itemName: this.$t("Services.modelName"),
          itemImagePath: imgServices,
          currentTab: "Services",
        });
      }

      if (checkPrivilege(hasServiceType())) {
        tabs.push({
          to: { name: "ServiceTypes" },
          itemName: this.$t("ServiceTypes.modelName"),
          itemImagePath: imgServiceTypes,
          currentTab: "ServiceTypes",
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
