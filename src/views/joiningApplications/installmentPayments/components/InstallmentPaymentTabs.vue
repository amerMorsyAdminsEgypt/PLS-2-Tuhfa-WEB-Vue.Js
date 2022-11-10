<template>
  <b-tabs v-if="installmentPaymentTabs" content-class="">
    <b-tab
      v-for="(option, index) in installmentPaymentTabs"
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
import imgInstallmentPayments from "@/assets/images/installmentPayments.svg";
import imgServiceEntitlements from "@/assets/images/serviceEntitlements.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasInstallmentPayment,
  hasServiceEntitlement,
} from "./../../../../utils/privilegeHelper";

export default {
  name: "InstallmentPaymentTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    installmentPaymentTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasInstallmentPayment())) {
        tabs.push({
          to: {
            name: "InstallmentPayments",
          },
          itemName: this.$t("InstallmentPayments.modelName"),
          itemImagePath: imgInstallmentPayments,
          currentTab: "InstallmentPayments",
        });
      }
      if (checkPrivilege(hasServiceEntitlement())) {
        tabs.push({
          to: {
            name: "ServiceEntitlements",
          },
          itemName: this.$t("ServiceEntitlements.modelName"),
          itemImagePath: imgServiceEntitlements,
          currentTab: "ServiceEntitlements",
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
