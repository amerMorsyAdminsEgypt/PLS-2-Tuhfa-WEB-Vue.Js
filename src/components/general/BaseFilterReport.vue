<template>
  <div :class="className">
    <!-- comman -->
    <BaseTree
      :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
      :treeModel="getTreeModel"
      v-on:changeValue="baseTreeChanged($event)"
      :showParent="true"
      :filterParentDirect="true"
    />

    <CustomInput
      :className="'col-md-12'"
      :id="`${id}-textSearch`"
      :value="filterReport.textSearch"
      :title="$t('search')"
      :imgName="'search.svg'"
      v-on:changeValue="filterReport.textSearch = $event"
    />
    <CustomInput
      :className="'col-md-12'"
      :id="`${id}-sendTo`"
      :value="filterReport.sendTo"
      v-on:changeValue="filterReport.sendTo = $event"
      :title="$t('Reports.sendTo')"
      :imgName="'email.svg'"
    />

    <DateTimePicker
      class="col-md-6"
      :id="`${id}-dateTimeFromStartSearch`"
      type="dateTime"
      :value="filterReport.dateTimeFromStartSearch"
      v-on:changeValue="filterReport.dateTimeFromStartSearch = $event.dateTime"
      :title="$t('Reports.dateTimeFromStartSearch')"
      :language="language"
    />
    <DateTimePicker
      class="col-md-6"
      :id="`${id}-dateTimeToStartSearch`"
      type="dateTime"
      :value="filterReport.dateTimeToStartSearch"
      v-on:changeValue="filterReport.dateTimeToStartSearch = $event.dateTime"
      :title="$t('Reports.dateTimeToStartSearch')"
      :language="language"
    />

    <DateTimePicker
      class="col-md-6"
      :id="`${id}-dateTimeFromEndSearch`"
      type="dateTime"
      :value="filterReport.dateTimeFromEndSearch"
      v-on:changeValue="filterReport.dateTimeFromEndSearch = $event.dateTime"
      :title="$t('Reports.dateTimeFromEndSearch')"
      :language="language"
    />
    <DateTimePicker
      class="col-md-6"
      :id="`${id}-dateTimeToEndSearch`"
      type="dateTime"
      :value="filterReport.dateTimeToEndSearch"
      v-on:changeValue="filterReport.dateTimeToEndSearch = $event.dateTime"
      :title="$t('Reports.dateTimeToEndSearch')"
      :language="language"
    />
  </div>
</template>

<script>
import CustomInput from "@/components/general/CustomInput.vue";
import BaseTree from "@/components/general/BaseTree.vue";
import DateTimePicker from "@/components/general/DateTimePicker.vue";
import { getLanguage } from "@/utils/functions";
import { SYSTEM_TYPE } from "@/utils/constantLists";

export default {
  name: "BaseFilterReport",
  components: {
    CustomInput,
    BaseTree,
    DateTimePicker,
  },
  data() {
    return {
      language: getLanguage(),
      theValue: this.filterReport,
      educationalCategoryTokenOptions: [],
    };
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.filterReport.systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken: this.filterReport.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: this.filterReport.educationalCategoryToken,
        parentTitle: this.$t("EducationalCategories.selectParent"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
  },
  methods: {
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.EducationalActivity) {
        this.filterReport.systemComponentHierarchyToken = data.hierarchyToken;
        this.filterReport.systemComponentToken = data.componentToken;
        this.filterReport.educationalCategoryToken = data.parentToken;
      }
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    filterReport: {
      type: Object,
    },
  },
  watch: {
    theValue: function (val) {
      this.$emit("changeValue", val ? val : "");
    },
    filterReport: function (val) {
      this.theValue = val;
    },
  },
  async created() {
    this.theValue = this.filterReport;
  },
};
</script>

<style lang="scss" scoped></style>
