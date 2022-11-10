<template>
  <b-tabs v-if="educationalCategoryTabs" content-class="">
    <b-tab
      v-for="(option, index) in educationalCategoryTabs"
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
import imgUserSysteamInterests from "@/assets/images/UserSysteamInterests.svg";
import imgUserOtherInterests from "@/assets/images/UserOtherInterests.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasUserSysteamInterest,
  hasUserOtherInterest,
} from "./../../../../utils/privilegeHelper";

export default {
  name: "UserInterestsTabs",
  props: { userToken: { type: String, default: "" } },
  data() {
    return {};
  },
  computed: {
    educationalCategoryTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasUserSysteamInterest())) {
        tabs.push({
          to: {
            name: "UserSysteamInterests",
            params: { userToken: this.userToken },
          },
          itemName: this.$t("UserSysteamInterests.modelName"),
          itemImagePath: imgUserSysteamInterests,
          currentTab: "UserSysteamInterests",
        });
      }

      if (checkPrivilege(hasUserOtherInterest())) {
        tabs.push({
          to: {
            name: "UserOtherInterests",
            params: { userToken: this.userToken },
          },
          itemName: this.$t("UserOtherInterests.modelName"),
          itemImagePath: imgUserOtherInterests,
          currentTab: "UserOtherInterests",
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
