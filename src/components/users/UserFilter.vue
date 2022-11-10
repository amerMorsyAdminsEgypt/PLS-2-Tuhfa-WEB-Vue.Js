<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
    @opened="getDialogs"
  >
    <div class="row">
      <template v-if="filterData.userTypeToken == USER_TYPE.Student">
        <CustomSelectBox
          :className="'col-md-6'"
          :id="`educationalStageToken`"
          :value="filterData.educationalStageToken"
          :options="educationalStageTokenOptions"
          v-on:changeValue="filterData.educationalStageToken = $event"
          :title="$t('EducationalStages.select')"
          :imgName="'educationalStages.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="`specialtieToken`"
          :value="filterData.specialtieToken"
          :options="specialtieTokenOptions"
          v-on:changeValue="filterData.specialtieToken = $event"
          :title="$t('Specialties.select')"
          :imgName="'specialties.svg'"
        />
      </template>
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
import { checkPrivilege } from "./../../utils/functions";
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import {
  getEducationalStagesDialog,
  getSpecialtiesDialog,
} from "./../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../utils/constantLists";
import CustomBaseEntityFilter from "./../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../components/general/CustomSelectBox.vue";
import generalMixin from "./../../utils/generalMixin";
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
      educationalStageTokenOptions: [],
      specialtieTokenOptions: [],
      icon,
      USER_TYPE,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  methods: {
    getDialogs() {
      this.getEducationalStagesDialog();
      this.getSpecialtiesDialog();
    },
    async getEducationalStagesDialog() {
      this.isLoading = true;
      this.educationalStageTokenOptions = await getEducationalStagesDialog();
      this.isLoading = false;
    },
    async getSpecialtiesDialog() {
      this.isLoading = true;
      this.specialtieTokenOptions = await getSpecialtiesDialog();
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
    checkPrivilege,
  },
};
</script>
