<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBoxMultiple
        :className="'col-md-6'"
        :id="`priorityTypeTokens`"
        :value="filterData.priorityTypeTokens"
        :options="priorityTypeTokensOptions"
        v-on:changeValue="filterData.priorityTypeTokens = $event"
        :title="$t('PriorityTypes.select')"
        :imgName="'priorityTypes.svg'"
        :returnArrayOfObjects="false"
      />
      <CustomCheckbox
        :className="'col-md-6'"
        :value="filterData.priorityTypeBeforeTimeStatus"
        v-on:changeValue="filterData.priorityTypeBeforeTimeStatus = $event"
        :title="$t('ReminderPlans.priorityTypeBeforeTime')"
      />
      <CustomCheckbox
        :className="'col-md-6'"
        :value="filterData.priorityTypeAfterTimeStatus"
        v-on:changeValue="filterData.priorityTypeAfterTimeStatus = $event"
        :title="$t('ReminderPlans.priorityTypeAfterTime')"
      />
      <CustomCheckbox
        :className="'col-md-6'"
        :value="filterData.priorityTypeOnTimeStatus"
        v-on:changeValue="filterData.priorityTypeOnTimeStatus = $event"
        :title="$t('ReminderPlans.priorityTypeOnTime')"
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
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
import { getPriorityTypesDialog } from "./../../../utils/dialogsOfApi";
import CustomBaseEntityFilter from "./../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { PRIORITY_SCOPE_TYPE_TOKENS } from "./../../../utils/constantLists";

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
      priorityTypeTokensOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBoxMultiple,
    CustomCheckbox,
    CustomBaseEntityFilter,
  },
  computed: {},

  methods: {
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityScopeTypeToken: PRIORITY_SCOPE_TYPE_TOKENS.Reminder,
      };
      this.priorityTypeTokensOptions = await getPriorityTypesDialog(params);
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getPriorityTypesDialog();
  },
};
</script>
