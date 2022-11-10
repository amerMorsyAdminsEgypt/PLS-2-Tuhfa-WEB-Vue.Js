<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        v-if="
          filterData.educationalRatingTypeToken ==
          EDUCATIONAL_RATING_TYPE_TOKENS.EducationalCategory
        "
        :className="'col-md-12'"
        :id="`educationalCategoryToken`"
        :value="filterData.educationalCategoryToken"
        :options="educationalCategoryTokenOptions"
        v-on:changeValue="filterData.educationalCategoryToken = $event"
        :title="$t('EducationalCategories.select')"
        :imgName="'EducationalCategories.svg'"
      />
      <CustomSelectBox
        v-if="
          filterData.educationalRatingTypeToken ==
          EDUCATIONAL_RATING_TYPE_TOKENS.EducationalGroup
        "
        :className="'col-md-12'"
        :id="`educationalGroupToken`"
        :value="filterData.educationalGroupToken"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="filterData.educationalGroupToken = $event"
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />
      <!-- <CustomSelectBox
        v-if="
          filterData.educationalRatingTypeToken ==
          EDUCATIONAL_RATING_TYPE_TOKENS.EducationalScheduleTime
        "
        :className="'col-md-12'"
        :id="`educationalScheduleTimeToken`"
        :value="filterData.educationalScheduleTimeToken"
        :options="educationalScheduleTimeTokenOptions"
        v-on:changeValue="filterData.educationalScheduleTimeToken = $event"
        :title="$t('EducationalScheduleTimes.select')"
        :imgName="'EducationalScheduleTimes.svg'"
      /> -->
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import {
  getEducationalCategoriesDialog,
  getEducationalGroupsDialog,
} from "./../../../../utils/dialogsOfApi";
import { EDUCATIONAL_RATING_TYPE_TOKENS } from "./../../../../utils/constantLists";

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
      EDUCATIONAL_RATING_TYPE_TOKENS: EDUCATIONAL_RATING_TYPE_TOKENS,
      educationalCategoryTokenOptions: [],
      educationalGroupTokenOptions: [],
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
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },

    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  async created() {
    this.getEducationalCategoriesDialog();
    this.getEducationalGroupsDialog();
  },
};
</script>
