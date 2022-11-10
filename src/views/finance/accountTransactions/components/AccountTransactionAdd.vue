<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="AccountTransactionAdd"
      size="xl"
      :headerText="$t('AccountTransactions.add')"
      :headerIcon="accountTransaction.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="accountTransaction.setInitialValue()"
    >
      <AccountTransactionForm
        v-if="!isLoading"
        id="add"
        :accountTransaction="accountTransaction"
        v-on:submitForm="addAccountTransaction()"
        bottomSheetName="AccountTransactionAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="AccountTransactionAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import AccountTransactionForm from "./AccountTransactionForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiAccountTransaction from "./../../../../api/finance/accountTransactions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    AccountTransactionForm,
  },
  props: ["accountTransaction"],
  methods: {
    async addAccountTransaction() {
      this.isLoading = true;
      let formData = objectToFormData(this.accountTransaction);
      try {
        const response = await apiAccountTransaction.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-AccountTransactionAdd");
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
          this.accountTransaction.setInitialValue();
          break;
        case "leave":
          this.accountTransaction.setInitialValue();
          this.closeBottomSheet("AccountTransactionAdd");
          break;
      }
    },
  },
};
</script>
