<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBoxMultiple
        v-if="userActivityTypeToken != USER_ACTIVITY_TYPE_TOKEN.Lecturer"
        :className="'col-md-12'"
        :id="`employeeTokens`"
        :value="filterData.employeeTokens"
        :options="userTokenOptions"
        v-on:changeValue="filterData.employeeTokens = $event"
        :title="$t('lecturers.select')"
        :imgName="'lecturers.svg'"
        :returnArrayOfObjects="false"
      />

      <CustomSelectBox
        :className="'col-md-12'"
        :id="`filter-educationalGroupTokens`"
        :value="filterData.educationalGroupTokens"
        :options="educationalGroupTokenOptions"
        v-on:changeValue="filterData.educationalGroupTokens = $event"
        :title="$t('EducationalGroups.select')"
        :imgName="'EducationalGroups.svg'"
      />

      <DateTimePicker
        class="col-md-6"
        :id="`filter-dateTimeFromStartSearch`"
        type="dateTime"
        :value="filterData.dateTimeFromStartSearch"
        :title="$t('general.startFrom')"
        v-on:changeValue="filterData.dateTimeFromStartSearch = $event.dateTime"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-dateTimeFromEndSearch`"
        type="dateTime"
        :value="filterData.dateTimeFromEndSearch"
        :title="$t('general.startTo')"
        v-on:changeValue="filterData.dateTimeFromEndSearch = $event.dateTime"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-dateTimeToStartSearch`"
        type="dateTime"
        :value="filterData.dateTimeToStartSearch"
        :title="$t('general.endFrom')"
        v-on:changeValue="filterData.dateTimeToStartSearch = $event.dateTime"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-dateTimeToEndSearch`"
        type="dateTime"
        :value="filterData.dateTimeToEndSearch"
        :title="$t('general.endTo')"
        v-on:changeValue="filterData.dateTimeToEndSearch = $event.dateTime"
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
import { mapGetters } from "vuex";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import {
  getEducationalGroupsDialog,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";
import { getLanguage } from "./../../../../utils/functions";
import {
  USER_TYPE,
  USER_ACTIVITY_TYPE_TOKEN,
} from "./../../../../utils/constantLists";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["userPersonalData"]),
  },
  data() {
    return {
      filterData: this.theFilterData,
      icon,
      language: getLanguage(),
      educationalGroupTokenOptions: [],
      userTokenOptions: [],
      USER_ACTIVITY_TYPE_TOKEN,
      userActivityTypeToken: "",
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
    CustomSelectBoxMultiple,
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
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
        userActivityTypeToken: USER_ACTIVITY_TYPE_TOKEN.Lecturer,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
  },
  created() {
    this.userActivityTypeToken =
      this.userPersonalData.userActivityTypeToken ?? "";
    this.getEducationalGroupsDialog();
    if (this.userActivityTypeToken != USER_ACTIVITY_TYPE_TOKEN.Lecturer) {
      this.getUsersDialog();
    }
  },
};
</script>
