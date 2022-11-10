<template>
  <CustomBottomSheet
    :refName="'AccountTransactionReportFilter'"
    :size="isGeneral ? `xl` : `lg`"
    :headerText="$t('Reports.accountTransactionsReport')"
    :headerIcon="icon"
    @opened="getDialogs()"
    @closed="filterReport.setInitialValue()"
  >
    <div class="row">
      <template v-if="isGeneral">
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`accountTransactionTypeToken`"
          :value="filterReport.accountTransactionTypeToken"
          :options="accountTransactionTypeTokenOptions"
          v-on:changeValue="
            filterReport.accountTransactionTypeToken = $event;
            getAccountTransactionsDialog();
          "
          :title="$t('AccountTransactions.type')"
          :imgName="'type.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`paymentMethodToken`"
          :value="filterReport.paymentMethodToken"
          :options="paymentMethodTokenOptions"
          v-on:changeValue="
            filterReport.paymentMethodToken = $event;
            getAccountTransactionsDialog();
          "
          :title="$t('PaymentMethods.select')"
          :imgName="'paymentMethods.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="`accountToken`"
          :value="filterReport.accountToken"
          :options="accountTokenOptions"
          v-on:changeValue="
            filterReport.accountToken = $event;
            getAccountTransactionsDialog();
          "
          :title="$t('Accounts.select')"
          :imgName="'accounts.svg'"
        />
      </template>
      <!-- AccountTransactionToken -->
      <CustomSelectBox
        :className="'col-md-12'"
        :id="`token`"
        :value="filterReport.token"
        :options="accountTransactionTokenOptions"
        v-on:changeValue="filterReport.token = $event"
        :title="$t('AccountTransactions.select')"
        :imgName="'accountTransactions.svg'"
      />
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="filterReport.sendTo"
        v-on:changeValue="filterReport.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div
        @click.prevent="closeBottomSheet('AccountTransactionReportFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/accountTransactions.svg";
import { STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import AccountTransactions from "./../../../models/finance/accountTransactions/AccountTransactions";
import apiAccountTransaction from "./../../../api/finance/accountTransactions";
import { getDialogOfAccountTransactionType } from "./../../../utils/dialogsOfConstantsLists";
import {
  getAccountsDialog,
  getPaymentMethodsDialog,
  getAccountTransactionsDialog,
} from "./../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  data() {
    return {
      icon,
      isAllDataLoaded: false,
      accountTransactionTypeTokenOptions: getDialogOfAccountTransactionType(),
      accountTokenOptions: [],
      paymentMethodTokenOptions: [],
      accountTransactionTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInput,
  },
  props: {
    isGeneral: {
      type: Boolean,
      default: true,
    },
    filterReport: {
      type: Object,
      default: () => new AccountTransactions().filterData,
    },
  },
  methods: {
    async getDialogs() {
      if (!this.isAllDataLoaded) {
        if (this.isGeneral) {
          await this.getAccountsDialog();
          await this.getPaymentMethodsDialog();
        }
        await this.getAccountTransactionsDialog();

        this.isAllDataLoaded = true;
      }
    },

    //#region dialogs
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
    async getAccountTransactionsDialog() {
      this.$emit("isLoading", true);
      this.accountTransactionTokenOptions = await getAccountTransactionsDialog(
        this.filterReport
      );
      this.$emit("isLoading", false);
    },

    //#endregion dialogs

    async getReport() {
      this.$emit("isLoading", true);
      try {
        let params = {
          token: this.filterReport.token,
          sendTo: this.filterReport.sendTo,
        };
        const response = await apiAccountTransaction.getBillReport(params);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("AccountTransactionReportFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async created() {},
  },
};
</script>
