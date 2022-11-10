<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`educationalCategoryToken`"
        :value="filterData.educationalCategoryToken"
        :options="educationalCategoryTokenOptions"
        v-on:changeValue="filterData.educationalCategoryToken = $event"
        :title="$t('EducationalCategories.select')"
        :imgName="'EducationalCategories.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`showStatusToken`"
        :value="filterData.showStatusToken"
        :options="showStatusTokenOptions"
        v-on:changeValue="filterData.showStatusToken = $event"
        :title="$t('general.showStatus')"
        :imgName="'type.svg'"
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
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { getDialogOfShowType } from "./../../../../../utils/dialogsOfConstantsLists";
import { getEducationalCategoriesDialog } from "./../../../../../utils/dialogsOfApi";

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
      educationalCategoryTokenOptions: [],
      showStatusTokenOptions: getDialogOfShowType(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  methods: {
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  async created() {
    this.getEducationalCategoriesDialog();
  },
};
</script>
