<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBoxMultiple
        :className="'col-md-12'"
        :id="`newsCategoryTokenList`"
        :value="filterData.newsCategoryTokenList"
        :options="newsCategoryTokenListOptions"
        v-on:changeValue="filterData.newsCategoryTokenList = $event"
        :title="$t('NewsCategories.select')"
        :imgName="'newsCategories.svg'"
        :returnArrayOfObjects="false"
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
import CustomSelectBoxMultiple from "./../../../components/general/CustomSelectBoxMultiple.vue";
import { getNewsCategoriesDialog } from "./../../../utils/dialogsOfApi";
import CustomBaseEntityFilter from "./../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../utils/generalMixin";
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
      icon,
      newsCategoryTokenListOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBoxMultiple,
    CustomBaseEntityFilter,
  },
  computed: {},

  methods: {
    async getNewsCategoriesDialog() {
      this.isLoading = true;
      this.newsCategoryTokenListOptions = await getNewsCategoriesDialog();
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getNewsCategoriesDialog();
  },
};
</script>
