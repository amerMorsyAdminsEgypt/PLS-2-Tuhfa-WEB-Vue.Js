<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="xl"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`filter-educationalGroupToken`"
        :value="filterData.educationalGroupToken"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="filterData.educationalGroupToken = $event"
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />

      <CustomSelectBox
        :className="'col-md-12'"
        :id="`filter-studentUserToken`"
        :value="filterData.studentUserToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.studentUserToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
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
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import {
  getEducationalGroupsDialog,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";
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
      educationalGroupTokenOptions: [],
      userTokenOptions: [],
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  methods: {
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
  },
  created() {
    this.getEducationalGroupsDialog();
    this.getStudentsDialog();
  },
};
</script>
