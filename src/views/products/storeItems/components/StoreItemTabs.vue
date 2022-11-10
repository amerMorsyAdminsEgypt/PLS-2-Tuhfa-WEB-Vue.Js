<template>
  <b-tabs v-if="storeItemTabs" content-class="">
    <b-tab
      v-for="(option, index) in storeItemTabs"
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
import imgStoreItems from "@/assets/images/StoreItems.svg";
import imgPropertyTypes from "@/assets/images/PropertyTypes.svg";
import imgDropDownLists from "@/assets/images/DropDownLists.svg";
import imgSystemComponentStoreItem from "@/assets/images/systemComponents.svg";
import imgSystemComponentsHierarchyStoreItem from "@/assets/images/systemComponentsHierarchies.svg";
import { checkPrivilege } from "@/utils/functions";
import {
  hasStoreItem,
  hasPropertyType,
  hasDropDownList,
  hasSystemComponentStoreItem,
  hasSystemComponentsHierarchyStoreItem,
} from "@/utils/privilegeHelper";

export default {
  name: "StoreItemTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    storeItemTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasStoreItem())) {
        tabs.push({
          to: { name: "StoreItems" },
          itemName: this.$t("StoreItems.modelName"),
          itemImagePath: imgStoreItems,
          currentTab: "StoreItems",
        });
      }

      if (checkPrivilege(hasPropertyType())) {
        tabs.push({
          to: { name: "PropertyTypes" },
          itemName: this.$t("PropertyTypes.modelName"),
          itemImagePath: imgPropertyTypes,
          currentTab: "PropertyTypes",
        });
      }

      if (checkPrivilege(hasDropDownList())) {
        tabs.push({
          to: { name: "DropDownLists" },
          itemName: this.$t("DropDownLists.modelName"),
          itemImagePath: imgDropDownLists,
          currentTab: "DropDownLists",
        });
      }

      if (checkPrivilege(hasSystemComponentsHierarchyStoreItem())) {
        tabs.push({
          to: { name: "SystemComponentsHierarchyStoreItem" },
          itemName: this.$t("SystemComponentsHierarchies.modelName"),
          itemImagePath: imgSystemComponentsHierarchyStoreItem,
          currentTab: "SystemComponentsHierarchyStoreItem",
        });
      }

      if (checkPrivilege(hasSystemComponentStoreItem())) {
        tabs.push({
          to: { name: "SystemComponentStoreItem" },
          itemName: this.$t("SystemComponents.modelName"),
          itemImagePath: imgSystemComponentStoreItem,
          currentTab: "SystemComponentStoreItem",
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
