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
        :id="`revenuesTypeToken`"
        :value="filterData.revenuesTypeToken"
        :options="revenuesTypeTokenOptions"
        v-on:changeValue="filterData.revenuesTypeToken = $event"
        :title="$t('Revenues.type')"
        :imgName="'revenues.svg'"
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
        :id="`revenuesRefundTypeToken`"
        :value="filterData.revenuesRefundTypeToken"
        :options="refundTypeTokenOptions"
        v-on:changeValue="filterData.revenuesRefundTypeToken = $event"
        :title="$t('Revenues.refundType')"
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
        :id="`revenueMoneyBalanceFrom`"
        :value="filterData.revenueMoneyBalanceFrom"
        v-on:changeValue="filterData.revenueMoneyBalanceFrom = $event"
        :title="$t('Revenues.balanceFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`revenueMoneyBalanceTo`"
        :value="filterData.revenueMoneyBalanceTo"
        v-on:changeValue="filterData.revenueMoneyBalanceTo = $event"
        :title="$t('Revenues.balanceTo')"
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
  getRevenuesTypesDialog,
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
      revenuesTypeTokenOptions: [],
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
    async getRevenuesTypesDialog() {
      this.isLoading = true;

      this.revenuesTypeTokenOptions = await getRevenuesTypesDialog();
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
    this.getRevenuesTypesDialog();
    this.getPaymentMethodsDialog();
    this.getAccountsDialog();
    this.getUsersDialog();
  },
};
</script>
