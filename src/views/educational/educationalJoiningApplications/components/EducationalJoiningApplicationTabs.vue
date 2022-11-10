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
import imgAll from "@/assets/images/EducationalJoiningApplications.svg";
import imgApproval from "@/assets/images/approval.svg";
import imgAccepted from "@/assets/images/accepted.svg";
import imgRejected from "@/assets/images/rejected.svg";
import { APPROVAL_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  name: "EducationalJoiningApplicationTabs",
  props: {
    educationalJoiningApplicationsStatistics: {
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
    totalAcceptedCount() {
      return this.educationalJoiningApplicationsStatistics.totalAcceptedCount;
    },
    totalUnderReviewCount() {
      return this.educationalJoiningApplicationsStatistics
        .totalUnderReviewCount;
    },
    totalRejectedCount() {
      return this.educationalJoiningApplicationsStatistics.totalRejectedCount;
    },
    allCount() {
      return (
        this.totalAcceptedCount +
        this.totalUnderReviewCount +
        this.totalRejectedCount
      );
    },
    theOptions() {
      let tabOptions = [];

      tabOptions.push({
        itemToken: "",
        itemName: this.$t("EducationalJoiningApplications.tabs.all"),
        itemImagePath: imgAll,
        currentTab: "all",
        count: this.allCount,
      });

      tabOptions.push({
        itemToken: APPROVAL_TYPE_TOKENS.Accepted,
        itemName: this.$t("EducationalJoiningApplications.tabs.accepted"),
        itemImagePath: imgAccepted,
        currentTab: "accepted",
        count: this.totalAcceptedCount,
      });

      tabOptions.push({
        itemToken: APPROVAL_TYPE_TOKENS.UnderReview,
        itemName: this.$t("EducationalJoiningApplications.tabs.approval"),
        itemImagePath: imgApproval,
        currentTab: "approval",
        count: this.totalUnderReviewCount,
      });

      tabOptions.push({
        itemToken: APPROVAL_TYPE_TOKENS.Rejected,
        itemName: this.$t("EducationalJoiningApplications.tabs.rejected"),
        itemImagePath: imgRejected,
        currentTab: "rejected",
        count: this.totalRejectedCount,
      });

      return tabOptions;
    },
  },
  methods: {
    filter(approvalTypeToken) {
      if (this.filterData.approvalTypeToken != approvalTypeToken) {
        this.filterData.approvalTypeToken = approvalTypeToken;
        this.$emit("search", this.filterData);
      }
    },
    setCurrentTab() {
      this.currentTab = "all";
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
