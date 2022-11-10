<template>
  <b-tabs v-if="bodyPartTabs" content-class="">
    <b-tab
      v-for="(option, index) in bodyPartTabs"
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
import imgBodyParts from "@/assets/images/bodyParts.svg";
import imgSystemComponentBodyPart from "@/assets/images/systemComponents.svg";
import imgSystemComponentsHierarchyBodyPart from "@/assets/images/systemComponentsHierarchies.svg";
import { checkPrivilege } from "@/utils/functions";
import {
  hasBodyPart,
  hasSystemComponentBodyPart,
  hasSystemComponentsHierarchyBodyPart,
} from "@/utils/privilegeHelper";

export default {
  name: "BodyPartTabs",
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    bodyPartTabs: function () {
      let tabs = [];
      if (checkPrivilege(hasBodyPart())) {
        tabs.push({
          to: {
            name: "BodyParts",
          },
          itemName: this.$t("BodyParts.modelName"),
          itemImagePath: imgBodyParts,
          currentTab: "BodyParts",
        });
      }

      if (checkPrivilege(hasSystemComponentsHierarchyBodyPart())) {
        tabs.push({
          to: {
            name: "SystemComponentsHierarchyBodyPart",
          },
          itemName: this.$t("SystemComponentsHierarchies.modelName"),
          itemImagePath: imgSystemComponentsHierarchyBodyPart,
          currentTab: "SystemComponentsHierarchyBodyPart",
        });
      }

      if (checkPrivilege(hasSystemComponentBodyPart())) {
        tabs.push({
          to: {
            name: "SystemComponentBodyPart",
          },
          itemName: this.$t("SystemComponents.modelName"),
          itemImagePath: imgSystemComponentBodyPart,
          currentTab: "SystemComponentBodyPart",
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
