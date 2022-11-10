<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <BaseTree
        :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterToken"
        :treeModel="getTreeModel"
        v-on:changeValue="baseTreeChanged($event)"
        :showParent="false"
        :filterParentDirect="false"
      />

      <CustomSelectBox
        :className="'col-md-12'"
        :id="`filter-gradingPlanToken`"
        :value="filterData.gradingPlanToken"
        :options="gradingPlanTokenOptions"
        v-on:changeValue="filterData.gradingPlanToken = $event"
        :title="$t('GradingPlans.select')"
        :imgName="'GradingPlans.svg'"
      />
    </div>

    <CustomBaseEntityFilter
      :className="'row'"
      :value="filterData"
      v-on:changeValue="filterData.fillData($event)"
    />

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="search">
        <img src="@/assets/images/search-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet('filterSheet')" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import BaseTree from "./../../../../components/general/BaseTree.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import { getGradingPlansDialog } from "./../../../../utils/dialogsOfApi";
import { SYSTEM_TYPE } from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      filterData: this.theFilterData,
      gradingPlanTokenOptions: [],
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    BaseTree,
    CustomSelectBox,
  },
  computed: {
    hierarchySystemTypeFilterToken() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken:
          this.filterData.systemComponentHierarchyToken,
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken: this.filterData.systemComponentToken,
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: "",
        parentTitle: "",
        parentImgName: "",
      };
      return treeModelObject;
    },
  },
  methods: {
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
    baseTreeChanged(data) {
      this.filterData.systemComponentHierarchyToken = data.hierarchyToken;
      this.filterData.systemComponentToken = data.componentToken;
    },
    async getGradingPlansDialog() {
      this.isLoading = true;
      this.gradingPlanTokenOptions = await getGradingPlansDialog();
      this.isLoading = false;
    },
  },
  created() {
    this.getGradingPlansDialog();
  },
};
</script>
