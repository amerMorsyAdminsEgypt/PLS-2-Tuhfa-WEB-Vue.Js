<template>
  <b-tabs v-if="theOptions" content-class="">
    <b-tab
      v-for="(option, index) in theOptions"
      :key="index"
      @click="
        filter(option.itemToken);
        currentTab = option.currentTab;
      "
      :title-item-class="'custom-tab-outer-li'"
      :active="currentTab == option.currentTab ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span>
          <span class="badge badge-dark" style="margin-inline-start: 8px">
            {{ option.count }}
          </span>
        </span>
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import imgAll from "@/assets/images/EducationalGroups.svg";
import imgApproval from "@/assets/images/approval.svg";
import imgAccepted from "@/assets/images/accepted.svg";
import { TERMINATION_TYPES } from "./../../../../utils/constantLists";

export default {
  name: "EducationalGroupTabs",
  props: {
    educationalGroupStatistics: {
      type: Object,
    },
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      currentTab: "",
      filterData: this.theFilterData,
    };
  },
  computed: {
    countFinished() {
      return this.educationalGroupStatistics.countFinished;
    },
    countNotFinished() {
      return this.educationalGroupStatistics.countNotFinished;
    },

    allCount() {
      return this.countFinished + this.countNotFinished;
    },
    theOptions() {
      let tabOptions = [];

      tabOptions.push({
        itemToken: TERMINATION_TYPES.NotFinished,
        itemName: this.$t("EducationalGroups.tabs.notFinished"),
        itemImagePath: imgApproval,
        currentTab: "notFinished",
        count: this.countNotFinished,
      });
      tabOptions.push({
        itemToken: TERMINATION_TYPES.Finished,
        itemName: this.$t("EducationalGroups.tabs.finished"),
        itemImagePath: imgAccepted,
        currentTab: "finished",
        count: this.countFinished,
      });
      tabOptions.push({
        itemToken: "",
        itemName: this.$t("EducationalGroups.tabs.all"),
        itemImagePath: imgAll,
        currentTab: "all",
        count: this.allCount,
      });

      return tabOptions;
    },
  },
  methods: {
    filter(educationalGroupTerminationTypeToken) {
      if (
        this.filterData.educationalGroupTerminationTypeToken !=
        educationalGroupTerminationTypeToken
      ) {
        this.filterData.educationalGroupTerminationTypeToken =
          educationalGroupTerminationTypeToken;
        this.$emit("search", this.filterData);
      }
    },
    setCurrentTab() {
      this.currentTab = "notFinished";
      this.filter(TERMINATION_TYPES.NotFinished);
    },
    currentTabUpdated() {
      this.$emit("currentTabUpdated", this.currentTab);
    },
  },
  watch: {
    currentTab() {
      this.currentTabUpdated();
    },
  },
  async created() {
    this.setCurrentTab();
  },
};
</script>
