<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
    @opened="getDialog()"
    @closed="filterData.setInitialValue()"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`accountTransactionTypeToken`"
        :value="filterData.accountTransactionTypeToken"
        :options="accountTransactionTypeTokenOptions"
        v-on:changeValue="filterData.accountTransactionTypeToken = $event"
        :title="$t('AccountTransactions.type')"
        :imgName="'type.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`paymentMethodToken`"
        :value="filterData.paymentMethodToken"
        :options="paymentMethodTokenOptions"
        v-on:changeValue="filterData.paymentMethodToken = $event"
        :title="$t('PaymentMethods.select')"
        :imgName="'paymentMethods.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`accountToken`"
        :value="filterData.accountToken"
        :options="accountTokenOptions"
        v-on:changeValue="filterData.accountToken = $event"
        :title="$t('Accounts.select')"
        :imgName="'accounts.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`expensesTypeToken`"
        :value="filterData.expensesTypeToken"
        :options="expensesTypeTokenOptions"
        v-on:changeValue="
          filterData.expensesTypeToken = $event;
          getExpensesDialog();
        "
        :title="$t('ExpensesTypes.select')"
        :imgName="'expensesTypes.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`expensesToken`"
        :value="filterData.expensesToken"
        :options="expensesTokenOptions"
        v-on:changeValue="filterData.expensesToken = $event"
        :title="$t('Revenues.select')"
        :imgName="'expenses.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`revenuesTypeToken`"
        :value="filterData.revenuesTypeToken"
        :options="revenuesTypeTokenOptions"
        v-on:changeValue="
          filterData.revenuesTypeToken = $event;
          getRevenuesDialog();
        "
        :title="$t('RevenuesTypes.select')"
        :imgName="'revenuesTypes.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`revenuesToken`"
        :value="filterData.revenuesToken"
        :options="revenuesTokenOptions"
        v-on:changeValue="filterData.revenuesToken = $event"
        :title="$t('Revenues.select')"
        :imgName="'revenues.svg'"
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
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { getDialogOfAccountTransactionType } from "./../../../../utils/dialogsOfConstantsLists";
import {
  getAccountsDialog,
  getPaymentMethodsDialog,
  getExpensesTypesDialog,
  getExpensesDialog,
  getRevenuesTypesDialog,
  getRevenuesDialog,
} from "./../../../../utils/dialogsOfApi";
import icon from "@/assets/images/filter.svg";

export default {
  mixins: [generalMixin],
  props: {
    theFilterData: {
      type: Object,
    },
  },
  data() {
    return {
      isLoading: false,
      filterData: this.theFilterData,
      icon,
      isAllDataLoaded: false,
      accountTransactionTypeTokenOptions: getDialogOfAccountTransactionType(),
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
      expensesTypeTokenOptions: [],
      expensesTokenOptions: [],
      revenuesTypeTokenOptions: [],
      revenuesTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  methods: {
    async getDialog() {
      if (!this.isAllDataLoaded) {
        await this.getAccountsDialog();
        await this.getPaymentMethodsDialog();
        await this.getExpensesTypesDialog();
        await this.getExpensesDialog();
        await this.getRevenuesTypesDialog();
        await this.getRevenuesDialog();
        this.isAllDataLoaded = true;
      }
    },
    async getAccountsDialog() {
      this.$emit("isLoading", true);
      this.accountTokenOptions = await getAccountsDialog();
      this.$emit("isLoading", false);
    },
    async getPaymentMethodsDialog() {
      this.$emit("isLoading", true);
      this.paymentMethodTokenOptions = await getPaymentMethodsDialog();
      this.$emit("isLoading", false);
    },
    async getExpensesTypesDialog() {
      this.$emit("isLoading", true);
      this.expensesTypeTokenOptions = await getExpensesTypesDialog();
      this.$emit("isLoading", false);
    },
    async getExpensesDialog() {
      this.$emit("isLoading", true);
      let params = {
        expensesTypeToken: this.filterData.expensesTypeToken,
      };
      this.expensesTokenOptions = await getExpensesDialog(params);
      this.$emit("isLoading", false);
    },
    async getRevenuesTypesDialog() {
      this.$emit("isLoading", true);
      this.revenuesTypeTokenOptions = await getRevenuesTypesDialog();
      this.$emit("isLoading", false);
    },
    async getRevenuesDialog() {
      this.$emit("isLoading", true);
      let params = {
        revenuesTypeToken: this.filterData.revenuesTypeToken,
      };
      this.revenuesTokenOptions = await getRevenuesDialog(params);
      this.$emit("isLoading", false);
    },

    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
};
</script>
