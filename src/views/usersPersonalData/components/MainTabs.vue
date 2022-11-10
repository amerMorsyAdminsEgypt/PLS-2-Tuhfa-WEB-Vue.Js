<template>
  <b-tabs v-if="outerTabs" content-class="">
    <b-tab
      v-for="(option, index) in outerTabs"
      :key="index"
      @click="emitCurrentTab(option.currentTab)"
      :title-item-class="'custom-tab-outer-li'"
      :active="currentTab == option.currentTab ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span></span
        >
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import imgPersonalData from "@/assets/images/UsersPersonalData.svg";
import imgScientificDegrees from "@/assets/images/scientificDegrees.svg";
import imgMedicalData from "@/assets/images/medical-tests.svg";

export default {
  name: "MainTabs",
  data() {
    return {
      currentTab: "",
    };
  },
  props: ["mainCurrentTab", "tabPrivilages"],
  watch: {
    // mainCurrentTab: function () {
    //   this.accessCurrentRoute();
    // },
  },
  computed: {
    outerTabs: function () {
      let tabs = [];

      tabs.push({
        itemName: this.$t("Users.mainTabs.personalData"),
        itemImagePath: imgPersonalData,
        currentTab: "PersonalData",
      });

      tabs.push({
        itemName: this.$t("Users.mainTabs.scientificData"),
        itemImagePath: imgScientificDegrees,
        currentTab: "ScientificData",
      });

      tabs.push({
        itemName: this.$t("Users.mainTabs.medicalData"),
        itemImagePath: imgMedicalData,
        currentTab: "MedicalData",
      });

      return tabs;
    },
  },
  methods: {
    setCurrentTab(tab) {
      this.currentTab = tab;
    },
    emitCurrentTab(currentTab) {
      this.currentTab = currentTab;
      this.$emit("mainCurrentTabUpdated", currentTab);
    },
  },
  async created() {
    let tab = "";
    if (this.tabPrivilages.hasPersonalData) {
      tab = "PersonalData";
    } else if (this.tabPrivilages.hasScientificData) {
      tab = "ScientificData";
    }
    this.setCurrentTab(tab);
    this.emitCurrentTab(tab);
  },
};
</script>
