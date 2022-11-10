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
        :id="`complainingPersonUserToken`"
        :value="filterData.complainingPersonUserToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.complainingPersonUserToken = $event"
        :title="$t('Complaints.complainingPersonUser')"
        :imgName="'user.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`closedByUserToken`"
        :value="filterData.closedByUserToken"
        :options="userEmployeeTokenOptions"
        v-on:changeValue="filterData.closedByUserToken = $event"
        :title="$t('Complaints.closedBy')"
        :imgName="'user.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`priorityTypeToken`"
        :value="filterData.priorityTypeToken"
        :options="priorityTypeTokenOptions"
        v-on:changeValue="filterData.priorityTypeToken = $event"
        :title="$t('PriorityTypes.select')"
        :imgName="'priorityTypes.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`complaintTypeToken`"
        :value="filterData.complaintTypeToken"
        :options="complaintTypeTokenOptions"
        v-on:changeValue="filterData.complaintTypeToken = $event"
        :title="$t('ComplaintTypes.select')"
        :imgName="'complaintTypes.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`complaintSectorToken`"
        :value="filterData.complaintSectorToken"
        :options="complaintSectorTokenOptions"
        v-on:changeValue="filterData.complaintSectorToken = $event"
        :title="$t('ComplaintSectors.select')"
        :imgName="'complaintSectors.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`complaintStatusTypeToken`"
        :value="filterData.complaintStatusTypeToken"
        :options="complaintStatusTypeTokenOptions"
        v-on:changeValue="filterData.complaintStatusTypeToken = $event"
        :title="$t('general.state')"
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
import {
  USER_TYPE,
  PRIORITY_SCOPE_TYPE_TOKENS,
} from "./../../../../utils/constantLists";
import {
  getUsersDialog,
  getPriorityTypesDialog,
  getComplaintTypesDialog,
  getComplaintSectorsDialog,
} from "./../../../../utils/dialogsOfApi";
import { getDialogOfComplaintStatusType } from "./../../../../utils/dialogsOfConstantsLists";

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
      userEmployeeTokenOptions: [],
      priorityTypeTokenOptions: [],
      complaintTypeTokenOptions: [],
      complaintSectorTokenOptions: [],
      complaintStatusTypeTokenOptions: getDialogOfComplaintStatusType(),
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
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityScopeTypeToken: PRIORITY_SCOPE_TYPE_TOKENS.Complaints,
      };
      this.priorityTypeTokenOptions = await getPriorityTypesDialog(params);
      this.isLoading = false;
    },
    async getComplaintTypesDialog() {
      this.isLoading = true;

      this.complaintTypeTokenOptions = await getComplaintTypesDialog();
      this.isLoading = false;
    },
    async getComplaintSectorsDialog() {
      this.isLoading = true;

      this.complaintSectorTokenOptions = await getComplaintSectorsDialog();
      this.isLoading = false;
    },
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getEmployeesDialog();
    this.getStudentsDialog();
    this.getPriorityTypesDialog();
    this.getComplaintTypesDialog();
    this.getComplaintSectorsDialog();
  },
};
</script>
