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
        :id="`userStudentToken`"
        :value="filterData.userStudentToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.userStudentToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`educationalPeriodToken`"
        :value="filterData.educationalPeriodToken"
        :options="educationalPeriodTokenOptions"
        v-on:changeValue="filterData.educationalPeriodToken = $event"
        :title="$t('EducationalPeriods.select')"
        :imgName="'educationalPeriods.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`educationalCategoryToken`"
        :value="filterData.educationalCategoryToken"
        :options="educationalCategoryTokenOptions"
        v-on:changeValue="filterData.educationalCategoryToken = $event"
        :title="$t('EducationalCategories.select')"
        :imgName="'EducationalCategories.svg'"
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  getUsersDialog,
  getEducationalPeriodsDialog,
  getEducationalCategoriesDialog,
} from "./../../../../utils/dialogsOfApi";

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
      userTokenOptions: [],
      educationalPeriodTokenOptions: [],
      educationalCategoryTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  methods: {
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getEducationalPeriodsDialog() {
      this.isLoading = true;
      this.educationalPeriodTokenOptions = await getEducationalPeriodsDialog();
      this.isLoading = false;
    },
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      // let params = {
      //   systemComponentHierarchyToken: this.model.systemComponentHierarchyToken,
      //   systemComponentToken: this.model.FilterSystemComponentToken,
      // };
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getStudentsDialog();
    this.getEducationalPeriodsDialog();
    this.getEducationalCategoriesDialog();
  },
};
</script>
