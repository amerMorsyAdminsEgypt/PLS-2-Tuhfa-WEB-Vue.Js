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
import imgEducationalCategories from "@/assets/images/EducationalCategories.svg";
import imgEducationalCategoriesTree from "@/assets/images/TreeView.svg";
import imgSystemComponentEducationalCategory from "@/assets/images/systemComponents.svg";
import imgSystemComponentsHierarchyEducationalCategory from "@/assets/images/systemComponentsHierarchies.svg";
import { checkPrivilege } from "./../../../../utils/functions";
import {
  hasEducationalCategory,
  hasSystemComponentEducationalCategory,
  hasSystemComponentsHierarchyEducationalCategory,
} from "./../../../../utils/privilegeHelper";

export default {
  name: "EducationalCategoryTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    educationalCategoryTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasEducationalCategory())) {
        tabs.push({
          to: { name: "EducationalCategories" },
          itemName: this.$t("EducationalCategories.modelName"),
          itemImagePath: imgEducationalCategories,
          currentTab: "EducationalCategories",
        });

        tabs.push({
          to: { name: "EducationalCategoriesTree" },
          itemName: this.$t("TreeView.modelName"),
          itemImagePath: imgEducationalCategoriesTree,
          currentTab: "EducationalCategoriesTree",
        });
      }

      if (checkPrivilege(hasSystemComponentsHierarchyEducationalCategory())) {
        tabs.push({
          to: { name: "SystemComponentsHierarchyEducationalCategory" },
          itemName: this.$t("SystemComponentsHierarchies.modelName"),
          itemImagePath: imgSystemComponentsHierarchyEducationalCategory,
          currentTab: "SystemComponentsHierarchyEducationalCategory",
        });
      }

      if (checkPrivilege(hasSystemComponentEducationalCategory())) {
        tabs.push({
          to: { name: "SystemComponentEducationalCategory" },
          itemName: this.$t("SystemComponents.modelName"),
          itemImagePath: imgSystemComponentEducationalCategory,
          currentTab: "SystemComponentEducationalCategory",
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
