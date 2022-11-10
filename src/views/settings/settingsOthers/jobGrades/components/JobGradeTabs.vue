<template>
  <b-tabs v-if="jobGradeTabs" content-class="">
    <b-tab
      v-for="(option, index) in jobGradeTabs"
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
import imgJobGrades from "@/assets/images/jobGrade.svg";
import imgSystemComponentJobGrade from "@/assets/images/systemComponents.svg";
import imgSystemComponentsHierarchyJobGrade from "@/assets/images/systemComponentsHierarchies.svg";
import { checkPrivilege } from "@/utils/functions";
import {
  hasJobGrade,
  hasSystemComponentJobGrade,
  hasSystemComponentsHierarchyJobGrade,
} from "@/utils/privilegeHelper";

export default {
  name: "JobGradeTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    jobGradeTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasJobGrade())) {
        tabs.push({
          to: {
            name: "JobGrades",
          },
          itemName: this.$t("JobGrades.modelName"),
          itemImagePath: imgJobGrades,
          currentTab: "JobGrades",
        });
      }

      if (checkPrivilege(hasSystemComponentsHierarchyJobGrade())) {
        tabs.push({
          to: {
            name: "SystemComponentsHierarchyJobGrade",
          },
          itemName: this.$t("SystemComponentsHierarchies.modelName"),
          itemImagePath: imgSystemComponentsHierarchyJobGrade,
          currentTab: "SystemComponentsHierarchyJobGrade",
        });
      }

      if (checkPrivilege(hasSystemComponentJobGrade())) {
        tabs.push({
          to: {
            name: "SystemComponentJobGrade",
          },
          itemName: this.$t("SystemComponents.modelName"),
          itemImagePath: imgSystemComponentJobGrade,
          currentTab: "SystemComponentJobGrade",
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
