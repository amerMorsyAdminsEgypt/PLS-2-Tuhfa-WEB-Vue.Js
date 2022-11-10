<template>
  <b-tabs v-if="accountTabs" content-class="">
    <b-tab
      v-for="(option, index) in accountTabs"
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
import imgAccounts from "@/assets/images/accounts.svg";
import imgAccountTransactions from "@/assets/images/accountTransactions.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasAccount,
  hasAccountTransaction,
} from "./../../../../utils/privilegeHelper";

export default {
  name: "AccountTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    accountTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasAccount())) {
        tabs.push({
          to: {
            name: "Accounts",
          },
          itemName: this.$t("Accounts.modelName"),
          itemImagePath: imgAccounts,
          currentTab: "Accounts",
        });
      }
      if (checkPrivilege(hasAccountTransaction())) {
        tabs.push({
          to: {
            name: "AccountTransactions",
          },
          itemName: this.$t("AccountTransactions.modelName"),
          itemImagePath: imgAccountTransactions,
          currentTab: "AccountTransactions",
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
