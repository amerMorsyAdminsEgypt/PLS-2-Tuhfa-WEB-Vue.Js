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
        :id="`priorityTypeBeforeTimeToken`"
        :value="filterData.priorityTypeBeforeTimeToken"
        :options="priorityTypeTokenOptions"
        v-on:changeValue="filterData.priorityTypeBeforeTimeToken = $event"
        :title="$t('ReminderPlans.priorityTypeBeforeTime')"
        :imgName="'priorityTypes.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`priorityTypeOnTimeToken`"
        :value="filterData.priorityTypeOnTimeToken"
        :options="priorityTypeTokenOptions"
        v-on:changeValue="filterData.priorityTypeOnTimeToken = $event"
        :title="$t('ReminderPlans.priorityTypeOnTime')"
        :imgName="'priorityTypes.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`priorityTypeAfterTimeToken`"
        :value="filterData.priorityTypeAfterTimeToken"
        :options="priorityTypeTokenOptions"
        v-on:changeValue="filterData.priorityTypeAfterTimeToken = $event"
        :title="$t('ReminderPlans.priorityTypeAfterTime')"
        :imgName="'priorityTypes.svg'"
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
import CustomBaseEntityFilter from "./../../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { getPriorityTypesDialog } from "./../../../../../utils/dialogsOfApi";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import { PRIORITY_SCOPE_TYPE_TOKENS } from "./../../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      priorityTypeTokenOptions: [],
      filterData: this.theFilterData,
      icon,
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  methods: {
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityScopeTypeToken: PRIORITY_SCOPE_TYPE_TOKENS.Reminder,
      };
      this.priorityTypeTokenOptions = await getPriorityTypesDialog(params);
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
