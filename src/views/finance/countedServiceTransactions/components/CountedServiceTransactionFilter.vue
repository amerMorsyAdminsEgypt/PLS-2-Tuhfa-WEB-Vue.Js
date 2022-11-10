<template>
  <CustomBottomSheet
    :refName="'filterSheet'"
    size="lg"
    :headerText="$t('filter')"
    :headerIcon="icon"
    @opened="getDialog()"
  >
    <div class="row">
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
        :id="`countedServiceTransactionMoneyValueFrom`"
        :value="filterData.countedServiceTransactionMoneyValueFrom"
        v-on:changeValue="
          filterData.countedServiceTransactionMoneyValueFrom = $event
        "
        :title="$t('general.moneyFrom')"
        :imgName="'money.svg'"
      />
      <CustomInputFloat
        :className="'col-md-6'"
        :id="`countedServiceTransactionMoneyValueTo`"
        :value="filterData.countedServiceTransactionMoneyValueTo"
        v-on:changeValue="
          filterData.countedServiceTransactionMoneyValueTo = $event
        "
        :title="$t('general.moneyTo')"
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
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import generalMixin from "./../../../../utils/generalMixin";
import {
  getAccountsDialog,
  getPaymentMethodsDialog,
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
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
    CustomInputFloat,
  },
  methods: {
    async getDialog() {
      if (!this.isAllDataLoaded) {
        await this.getAccountsDialog();
        await this.getPaymentMethodsDialog();
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

    search() {
      this.closeBottomSheet("filterSheet");
      this.$emit("search", this.filterData);
    },
  },
};
</script>
