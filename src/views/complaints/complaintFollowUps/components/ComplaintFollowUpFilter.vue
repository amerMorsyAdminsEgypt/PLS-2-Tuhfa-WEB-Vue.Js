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
        :id="`userFollowUpToken`"
        :value="filterData.userFollowUpToken"
        :options="userEmployeeTokenOptions"
        v-on:changeValue="filterData.userFollowUpToken = $event"
        :title="$t('ComplaintFollowUps.followUpBy')"
        :imgName="'user.svg'"
      />

      <CustomSelectBox
        :className="'col-md-6'"
        :id="`complaintFollowUpSideTypeToken`"
        :value="filterData.complaintFollowUpSideTypeToken"
        :options="complaintFollowUpSideTypeTokenOptions"
        v-on:changeValue="filterData.complaintFollowUpSideTypeToken = $event"
        :title="$t('ComplaintFollowUps.followUpSideType')"
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
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { getUsersDialog } from "./../../../../utils/dialogsOfApi";
import { getDialogOfFollowUpSideType } from "./../../../../utils/dialogsOfConstantsLists";

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
      userEmployeeTokenOptions: [],
      complaintFollowUpSideTypeTokenOptions: getDialogOfFollowUpSideType(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  methods: {
    async getEmployeesDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
      };
      this.userEmployeeTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },

    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getEmployeesDialog();
  },
};
</script>
