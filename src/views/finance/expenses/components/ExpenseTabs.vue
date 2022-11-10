<template>
  <b-tabs v-if="expenseTabs" content-class="">
    <b-tab
      v-for="(option, index) in expenseTabs"
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
import imgExpenses from "@/assets/images/expenses.svg";
import imgExpenseTypes from "@/assets/images/expensesTypes.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasExpense,
  hasExpensesType,
} from "./../../../../utils/privilegeHelper";

export default {
  name: "ExpenseTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    expenseTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasExpense())) {
        tabs.push({
          to: {
            name: "Expenses",
          },
          itemName: this.$t("Expenses.modelName"),
          itemImagePath: imgExpenses,
          currentTab: "Expenses",
        });
      }
      if (checkPrivilege(hasExpensesType())) {
        tabs.push({
          to: {
            name: "ExpensesTypes",
          },
          itemName: this.$t("ExpensesTypes.modelName"),
          itemImagePath: imgExpenseTypes,
          currentTab: "ExpensesTypes",
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
