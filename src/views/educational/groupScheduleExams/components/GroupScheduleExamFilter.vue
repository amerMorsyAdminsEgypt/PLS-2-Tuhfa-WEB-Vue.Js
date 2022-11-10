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
        :id="`filter-educationalGroupToken`"
        :value="filterData.educationalGroupToken"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="filterData.educationalGroupToken = $event"
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />

      <DateTimePicker
        class="col-md-6"
        :id="`filter-startExamDateTimeFrom`"
        type="dateTime"
        :value="filterData.startExamDateTimeFrom"
        :title="$t('general.startFrom')"
        v-on:changeValue="filterData.startExamDateTimeFrom = $event.dateTime"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-startExamDateTimeTo`"
        type="dateTime"
        :value="filterData.startExamDateTimeTo"
        :title="$t('general.startTo')"
        v-on:changeValue="filterData.startExamDateTimeTo = $event.dateTime"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-endExamDateTimeFrom`"
        type="dateTime"
        :value="filterData.endExamDateTimeFrom"
        :title="$t('general.endFrom')"
        v-on:changeValue="filterData.endExamDateTimeFrom = $event.dateTime"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-endExamDateTimeTo`"
        type="dateTime"
        :value="filterData.endExamDateTimeTo"
        :title="$t('general.endTo')"
        v-on:changeValue="filterData.endExamDateTimeTo = $event.dateTime"
        :language="language"
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
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import { getEducationalGroupsDialog } from "./../../../../utils/dialogsOfApi";
import { getLanguage } from "./../../../../utils/functions";
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
      language: getLanguage(),
      educationalGroupTokenOptions: [],
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
    DateTimePicker,
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
  },
  created() {
    this.getEducationalGroupsDialog();
  },
};
</script>
