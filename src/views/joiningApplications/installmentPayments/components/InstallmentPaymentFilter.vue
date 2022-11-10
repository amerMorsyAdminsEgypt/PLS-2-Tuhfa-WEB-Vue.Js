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
        :options="studentOptions"
        v-on:changeValue="filterData.debtUserToken = $event"
        :title="$t('students.select')"
        :imgName="'students.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`paymentUserToken`"
        :value="filterData.paymentUserToken"
        :options="employeeOptions"
        v-on:changeValue="filterData.paymentUserToken = $event"
        :title="$t('employees.select')"
        :imgName="'employees.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`accountToken`"
        :value="filterData.accountToken"
        :options="accountTokenOptions"
        v-on:changeValue="filterData.accountToken = $event"
        :title="$t('Accounts.select')"
        :imgName="'accounts.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`paymentMethodToken`"
        :value="filterData.paymentMethodToken"
        :options="paymentMethodTokenOptions"
        v-on:changeValue="filterData.paymentMethodToken = $event"
        :title="$t('PaymentMethods.select')"
        :imgName="'paymentMethods.svg'"
      />

      <CustomInputFloat
        :className="'col-md-6'"
        :id="`installmentsMoneyValueFrom`"
        :value="filterData.installmentsMoneyValueFrom"
        v-on:changeValue="filterData.installmentsMoneyValueFrom = $event"
        :title="$t('general.valueFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`installmentsMoneyValueTo`"
        :value="filterData.installmentsMoneyValueTo"
        v-on:changeValue="filterData.installmentsMoneyValueTo = $event"
        :title="$t('general.valueTo')"
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
import {
  getUsersDialog,
  getAccountsDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";

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
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
      studentOptions: [],
      employeeOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomInputFloat,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  methods: {
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.studentOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getEmployeesDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
      };
      this.employeeOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getAccountsDialog() {
      this.isLoading = true;

      this.accountTokenOptions = await getAccountsDialog();
      this.isLoading = false;
    },
    async getPaymentMethodsDialog() {
      this.isLoading = true;

      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
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
    this.getAccountsDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
