<template>
  <b-tabs v-if="placeTabs" content-class="">
    <b-tab
      v-for="(option, index) in placeTabs"
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
import imgPlaces from "@/assets/images/places.svg";
import imgSystemComponentPlace from "@/assets/images/systemComponents.svg";
import imgSystemComponentsHierarchyPlace from "@/assets/images/systemComponentsHierarchies.svg";
import { checkPrivilege } from "@/utils/functions";
import {
  hasPlaceMasterAdmin,
  hasPlaceEmployee,
  hasPlaceStudent,
  hasPlaceClient,
  hasPlaceOther,
  hasSystemComponentPlace,
  hasSystemComponentsHierarchyPlace,
} from "./../../../utils/privilegeHelper";

export default {
  name: "PlaceTabs",
  props: {
    modelName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    placeTabs: function () {
      let tabs = [];

      switch (this.modelName) {
        case "placeMasterAdmins":
          if (checkPrivilege(hasPlaceMasterAdmin())) {
            tabs.push({
              to: {
                name: "PlaceMasterAdmins",
              },
              itemName: this.$t("Places.modelName"),
              itemImagePath: imgPlaces,
              currentTab: "Places",
            });
          }
          break;
        case "placeEmployees":
          if (checkPrivilege(hasPlaceEmployee())) {
            tabs.push({
              to: {
                name: "PlaceEmployees",
              },
              itemName: this.$t("Places.modelName"),
              itemImagePath: imgPlaces,
              currentTab: "Places",
            });
          }
          break;
        case "placeStudents":
          if (checkPrivilege(hasPlaceStudent())) {
            tabs.push({
              to: {
                name: "PlaceStudents",
              },
              itemName: this.$t("Places.modelName"),
              itemImagePath: imgPlaces,
              currentTab: "Places",
            });
          }
          break;
        case "placeClients":
          if (checkPrivilege(hasPlaceClient())) {
            tabs.push({
              to: {
                name: "PlaceClients",
              },
              itemName: this.$t("Places.modelName"),
              itemImagePath: imgPlaces,
              currentTab: "Places",
            });
          }
          break;
        case "placeOthers":
          if (checkPrivilege(hasPlaceOther())) {
            tabs.push({
              to: {
                name: "PlaceOthers",
              },
              itemName: this.$t("Places.modelName"),
              itemImagePath: imgPlaces,
              currentTab: "Places",
            });
          }
          break;
      }

      if (checkPrivilege(hasSystemComponentsHierarchyPlace())) {
        tabs.push({
          to: {
            name: "SystemComponentsHierarchyPlace",
          },
          itemName: this.$t("SystemComponentsHierarchies.modelName"),
          itemImagePath: imgSystemComponentsHierarchyPlace,
          currentTab: "SystemComponentsHierarchyPlace",
        });
      }

      if (checkPrivilege(hasSystemComponentPlace())) {
        tabs.push({
          to: {
            name: "SystemComponentPlace",
          },
          itemName: this.$t("SystemComponents.modelName"),
          itemImagePath: imgSystemComponentPlace,
          currentTab: "SystemComponentPlace",
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
