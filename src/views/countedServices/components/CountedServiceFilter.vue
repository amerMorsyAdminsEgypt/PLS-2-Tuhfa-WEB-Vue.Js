<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`countedServiceFilter-placeTypeToken`"
        :value="placeTypeToken"
        :options="placeTypeTokenOptions"
        v-on:changeValue="placeTypeToken = $event"
        :title="$t('Places.type')"
        :imgName="'type.svg'"
      />
      <BaseTree
        :key="placeTypeToken"
        :placeTypeToken="placeTypeToken"
        :hierarchySystemTypeFilterToken="hierarchySystemTypeFilterTokenPlace"
        :treeModel="getTreeModelPlace"
        v-on:changeValue="baseTreeChanged($event)"
        :showParent="true"
        :filterParentDirect="true"
      />
      <BaseTree
        :hierarchySystemTypeFilterToken="
          hierarchySystemTypeFilterTokenEducational
        "
        :treeModel="getTreeModel"
        v-on:changeValue="baseTreeChanged($event)"
        :showParent="true"
        :filterParentDirect="true"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`countedServiceTypeToken`"
        :value="filterData.countedServiceTypeToken"
        :options="countedServiceTypeTokenOptions"
        v-on:changeValue="filterData.countedServiceTypeToken = $event"
        :title="$t('CountedServiceTypes.select')"
        :imgName="'countedServiceTypes.svg'"
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
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import BaseTree from "./../../../components/general/BaseTree.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { getCountedServiceTypesDialog } from "./../../../utils/dialogsOfApi";
import { SYSTEM_TYPE } from "./../../../utils/constantLists";
import { getDialogOfPlaceType } from "./../../../utils/dialogsOfConstantsLists";

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
      placeTypeToken: "",
      icon,
      countedServiceTypeTokenOptions: [],
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
    };
  },
  components: {
    CustomBottomSheet,
    BaseTree,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  computed: {
    hierarchySystemTypeFilterTokenPlace() {
      return SYSTEM_TYPE.Place;
    },
    hierarchySystemTypeFilterTokenEducational() {
      return SYSTEM_TYPE.EducationalActivity;
    },
    getTreeModelPlace() {
      let treeModelObject = {
        systemComponentHierarchyToken: "",
        hierarchyTitle: this.$t("SystemComponentsHierarchies.selectPlace"),
        systemComponentToken: "",
        componentTitle: this.$t("SystemComponents.selectPlace"),
        parentToken: "",
        parentTitle: this.$t("Places.selectParent"),
        parentImgName: "places.svg",
      };
      return treeModelObject;
    },
    getTreeModel() {
      let treeModelObject = {
        systemComponentHierarchyToken: "",
        hierarchyTitle: this.$t(
          "SystemComponentsHierarchies.selectEducationalActivity"
        ),
        systemComponentToken: "",
        componentTitle: this.$t("SystemComponents.selectEducationalActivity"),
        parentToken: "",
        parentTitle: this.$t("EducationalCategories.select"),
        parentImgName: "EducationalCategories.svg",
      };
      return treeModelObject;
    },
  },

  methods: {
    async getCountedServiceTypesDialog() {
      this.isLoading = true;
      this.countedServiceTypeTokenOptions =
        await getCountedServiceTypesDialog();
      this.isLoading = false;
    },
    baseTreeChanged(data) {
      if (data.systemTypeToken == SYSTEM_TYPE.Place) {
        this.filterData.placeToken = data.parentToken;
      }
      if (data.systemTypeToken == SYSTEM_TYPE.EducationalActivity) {
        this.filterData.educationalCategoryToken = data.parentToken;
      }
    },

    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getCountedServiceTypesDialog();
  },
};
</script>
