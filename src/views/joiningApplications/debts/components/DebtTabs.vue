<template>
  <b-tabs v-if="debtTabs" content-class="">
    <b-tab
      v-for="(option, index) in debtTabs"
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
import imgDebts from "@/assets/images/debts.svg";
import imgInstallments from "@/assets/images/installments.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import { hasDebt, hasInstallment } from "./../../../../utils/privilegeHelper";

export default {
  name: "DebtTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    debtTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasDebt())) {
        tabs.push({
          to: {
            name: "Debts",
          },
          itemName: this.$t("Debts.modelName"),
          itemImagePath: imgDebts,
          currentTab: "Debts",
        });
      }
      if (checkPrivilege(hasInstallment())) {
        tabs.push({
          to: {
            name: "Installments",
          },
          itemName: this.$t("Installments.modelName"),
          itemImagePath: imgInstallments,
          currentTab: "Installments",
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
