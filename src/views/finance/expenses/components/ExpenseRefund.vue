<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ExpenseRefund"
      size="xl"
      :headerText="$t('Expenses.refund')"
      :headerIcon="expense.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ExpenseFormRefund
        v-if="!isLoading"
        id="refund"
        :expense="expense"
        v-on:submitForm="refundExpense()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ExpenseRefund"
        :submitName="$t('refund')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ExpenseFormRefund from "./ExpenseFormRefund.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import Expense from "./../../../../models/finance/expenses/Expense";
import apiExpense from "./../../../../api/finance/expenses";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ExpenseFormRefund,
  },
  props: ["expense"],
  data() {
    return {
      model: new Expense(),
    };
  },
  methods: {
    async refundExpense() {
      this.isLoading = true;
      this.expense.token = this.expense.expensesToken;

      let formData = objectToFormData(this.expense);

      try {
        const response = await apiExpense.refund(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ExpenseRefund");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.expense.expenseToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiExpense.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.expense.expenseImagePath = "";
          this.expense.expenseImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
