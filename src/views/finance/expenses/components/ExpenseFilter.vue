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
        :id="`expensesTypeToken`"
        :value="filterData.expensesTypeToken"
        :options="expensesTypeTokenOptions"
        v-on:changeValue="filterData.expensesTypeToken = $event"
        :title="$t('Expenses.type')"
        :imgName="'expenses.svg'"
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
        :id="`expensesRefundTypeToken`"
        :value="filterData.expensesRefundTypeToken"
        :options="refundTypeTokenOptions"
        v-on:changeValue="filterData.expensesRefundTypeToken = $event"
        :title="$t('Expenses.refundType')"
        :imgName="'refund.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`refundUserToken`"
        :value="filterData.refundUserToken"
        :options="userTokenOptions"
        v-on:changeValue="filterData.refundUserToken = $event"
        :title="$t('general.userMakeRefund')"
        :imgName="'user.svg'"
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
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`refundPaymentMethodToken`"
        :value="filterData.refundPaymentMethodToken"
        :options="paymentMethodTokenOptions"
        v-on:changeValue="filterData.refundPaymentMethodToken = $event"
        :title="$t('PaymentMethods.selectRefund')"
        :imgName="'paymentMethods.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`expensesMoneyValueFrom`"
        :value="filterData.expensesMoneyValueFrom"
        v-on:changeValue="filterData.expensesMoneyValueFrom = $event"
        :title="$t('Expenses.balanceFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`expensesMoneyValueTo`"
        :value="filterData.expensesMoneyValueTo"
        v-on:changeValue="filterData.expensesMoneyValueTo = $event"
        :title="$t('Expenses.balanceTo')"
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
  getExpensesTypesDialog,
  getPaymentMethodsDialog,
  getAccountsDialog,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";
import { getDialogOfRefundType } from "./../../../../utils/dialogsOfConstantsLists";
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
      expensesTypeTokenOptions: [],
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
      refundTypeTokenOptions: getDialogOfRefundType(),
      userTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomInputFloat,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  methods: {
    async getExpensesTypesDialog() {
      this.isLoading = true;

      this.expensesTypeTokenOptions = await getExpensesTypesDialog();
      this.isLoading = false;
    },
    async getPaymentMethodsDialog() {
      this.isLoading = true;

      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
      this.isLoading = false;
    },
    async getAccountsDialog() {
      this.isLoading = true;

      this.accountTokenOptions = await getAccountsDialog();
      this.isLoading = false;
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "employees",
        userTypeToken: USER_TYPE.Employee,
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
    this.getExpensesTypesDialog();
    this.getPaymentMethodsDialog();
    this.getAccountsDialog();
    this.getUsersDialog();
  },
};
</script>
