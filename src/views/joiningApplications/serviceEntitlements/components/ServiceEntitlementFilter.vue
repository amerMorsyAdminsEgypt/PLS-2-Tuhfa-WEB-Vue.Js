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
        :id="`userStudentToken`"
        :value="filterData.userStudentToken"
        :options="studentOptions"
        v-on:changeValue="filterData.userStudentToken = $event"
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
        :className="'col-md-12'"
        :id="`serviceToken`"
        :value="filterData.serviceToken"
        :options="serviceTokenOptions"
        v-on:changeValue="filterData.serviceToken = $event"
        :title="$t('Services.select')"
        :imgName="'services.svg'"
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
        :id="`serviceEntitlementRefundTypeToken`"
        :value="filterData.serviceEntitlementRefundTypeToken"
        :options="refundTypeTokenOptions"
        v-on:changeValue="filterData.serviceEntitlementRefundTypeToken = $event"
        :title="$t('general.refundType')"
        :imgName="'refund.svg'"
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
        :id="`serviceEntitlementMoneyValueFrom`"
        :value="filterData.serviceEntitlementMoneyValueFrom"
        v-on:changeValue="filterData.serviceEntitlementMoneyValueFrom = $event"
        :title="$t('general.valueFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`serviceEntitlementMoneyValueTo`"
        :value="filterData.serviceEntitlementMoneyValueTo"
        v-on:changeValue="filterData.serviceEntitlementMoneyValueTo = $event"
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
  getServicesDialog,
  getPaymentMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { getDialogOfRefundType } from "./../../../../utils/dialogsOfConstantsLists";

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
      serviceTokenOptions: [],
      paymentMethodTokenOptions: [],
      studentOptions: [],
      employeeOptions: [],
      refundTypeTokenOptions: getDialogOfRefundType(),
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
    async getServicesDialog() {
      this.isLoading = true;

      this.serviceTokenOptions = await getServicesDialog();
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
    this.getServicesDialog();
    this.getPaymentMethodsDialog();
  },
};
</script>
