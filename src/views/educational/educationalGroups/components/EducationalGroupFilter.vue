<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'educationalGroupClosedStateTypeToken'"
        :value="filterData.educationalGroupClosedStateTypeToken"
        :options="educationalGroupClosedStateTypeTokenOptions"
        v-on:changeValue="
          filterData.educationalGroupClosedStateTypeToken = $event
        "
        :title="$t('general.state')"
        :imgName="'close.svg'"
        :imgStatus="true"
      />
      <CustomSelectBox
        v-if="userActivityTypeToken != USER_ACTIVITY_TYPE_TOKEN.Lecturer"
        :className="'col-md-12'"
        :id="`employeeUserToken`"
        :value="filterData.employeeUserToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.employeeUserToken = $event"
        :title="$t('lecturers.select')"
        :imgName="'lecturers.svg'"
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
      <DateTimePicker
        class="col-md-6"
        :id="`filter-educationalGroupStartDateTimeFrom`"
        type="dateTime"
        :value="filterData.educationalGroupStartDateTimeFrom"
        :title="$t('general.startFrom')"
        v-on:changeValue="
          filterData.educationalGroupStartDateTimeFrom = $event.dateTime
        "
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-educationalGroupStartDateTimeTo`"
        type="dateTime"
        :value="filterData.educationalGroupStartDateTimeTo"
        :title="$t('general.startTo')"
        v-on:changeValue="
          filterData.educationalGroupStartDateTimeTo = $event.dateTime
        "
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-educationalGroupEndDateTimeFrom`"
        type="dateTime"
        :value="filterData.educationalGroupEndDateTimeFrom"
        :title="$t('general.endFrom')"
        v-on:changeValue="
          filterData.educationalGroupEndDateTimeFrom = $event.dateTime
        "
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        :id="`filter-educationalGroupEndDateTimeTo`"
        type="dateTime"
        :value="filterData.educationalGroupEndDateTimeTo"
        :title="$t('general.endTo')"
        v-on:changeValue="
          filterData.educationalGroupEndDateTimeTo = $event.dateTime
        "
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
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import { getLanguage } from "./../../../../utils/functions";
import { getDialogOfClosedStateType } from "./../../../../utils/dialogsOfConstantsLists";
import {
  getEducationalCategoriesDialog,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";
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
      educationalGroupClosedStateTypeTokenOptions: getDialogOfClosedStateType(),
      language: getLanguage(),
      filterData: this.theFilterData,
      educationalCategoryTokenOptions: [],
      icon,
      USER_ACTIVITY_TYPE_TOKEN,
      userActivityTypeToken: "",
      userTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
    DateTimePicker,
  },
  methods: {
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
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
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  async created() {
    this.userActivityTypeToken =
      this.userPersonalData.userActivityTypeToken ?? "";
    this.getEducationalCategoriesDialog();
    if (this.userActivityTypeToken != USER_ACTIVITY_TYPE_TOKEN.Lecturer) {
      this.getUsersDialog();
    }
  },
};
</script>
