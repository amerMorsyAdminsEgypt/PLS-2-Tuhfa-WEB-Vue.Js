<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ExpensePay"
      size="xl"
      :headerText="$t('Expenses.pay')"
      :headerIcon="expense.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="expense.setInitialValue()"
    >
      <ExpenseForm
        v-if="!isLoading"
        id="Pay"
        :expense="expense"
        v-on:submitForm="payExpense()"
        bottomSheetName="ExpensePay"
        :submitName="$t('pay')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ExpensePay"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import ExpenseForm from "./ExpenseForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiExpense from "./../../../../api/finance/expenses";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ExpenseForm,
  },
  props: ["expense"],
  methods: {
    async payExpense() {
      this.isLoading = true;
      let formData = objectToFormData(this.expense);
      try {
        const response = await apiExpense.pay(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ExpensePay");
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

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.expense.setInitialValue();
          break;
        case "leave":
          this.expense.setInitialValue();
          this.closeBottomSheet("ExpensePay");
          break;
      }
    },
  },
};
</script>
