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
        :id="`debtUserToken`"
        :value="filterData.debtUserToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.debtUserToken = $event"
        :title="$t('students.select')"
        :imgName="'user.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`cancelUserToken`"
        :value="filterData.cancelUserToken"
        :options="userEmployeeTokenOptions"
        v-on:changeValue="filterData.cancelUserToken = $event"
        :title="$t('Installments.canceledBy')"
        :imgName="'user.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`totalScheduleInstallmentMoneyFrom`"
        :value="filterData.totalScheduleInstallmentMoneyFrom"
        v-on:changeValue="filterData.totalScheduleInstallmentMoneyFrom = $event"
        :title="$t('general.valueFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`totalScheduleInstallmentMoneyTo`"
        :value="filterData.totalScheduleInstallmentMoneyTo"
        v-on:changeValue="filterData.totalScheduleInstallmentMoneyTo = $event"
        :title="$t('general.valueTo')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`totalScheduleIPaidMoneyFrom`"
        :value="filterData.totalScheduleIPaidMoneyFrom"
        v-on:changeValue="filterData.totalScheduleIPaidMoneyFrom = $event"
        :title="$t('general.paidFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`totalScheduleIPaidMoneyTo`"
        :value="filterData.totalScheduleIPaidMoneyTo"
        v-on:changeValue="filterData.totalScheduleIPaidMoneyTo = $event"
        :title="$t('general.paidTo')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`totalScheduleRemainderMoneyFrom`"
        :value="filterData.totalScheduleRemainderMoneyFrom"
        v-on:changeValue="filterData.totalScheduleRemainderMoneyFrom = $event"
        :title="$t('general.remaindingFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`totalScheduleRemainderMoneyTo`"
        :value="filterData.totalScheduleRemainderMoneyTo"
        v-on:changeValue="filterData.totalScheduleRemainderMoneyTo = $event"
        :title="$t('general.remaindingTo')"
        :imgName="'money.svg'"
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
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { getUsersDialog } from "./../../../../utils/dialogsOfApi";

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
    };
  },
  components: {
    CustomBottomSheet,
    CustomInputFloat,
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
    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
  created() {
    this.getStudentsDialog();
    this.getEmployeesDialog();
  },
};
</script>
