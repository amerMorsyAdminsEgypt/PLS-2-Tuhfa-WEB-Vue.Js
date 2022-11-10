<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountedServiceTransactionRefund"
      size="xl"
      :headerText="$t('CountedServiceTransactions.refund')"
      :headerIcon="countedServiceTransaction.icon"
      :clickToClose="false"
      :swipeAble="false"
      @closed="countedServiceTransaction.setInitialValue()"
    >
      <RefundCountedServiceTransactionForm
        v-if="!isLoading"
        id="refund"
        :countedServiceTransaction="countedServiceTransaction"
        v-on:submitForm="refundCountedServiceTransaction()"
        bottomSheetName="CountedServiceTransactionRefund"
        :submitName="$t('CountedServiceTransactions.refund')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import RefundCountedServiceTransactionForm from "./RefundCountedServiceTransactionForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiCountedServiceTransaction from "./../../../../api/finance/countedServiceTransactions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    RefundCountedServiceTransactionForm,
  },
  props: ["countedServiceTransaction"],
  methods: {
    async refundCountedServiceTransaction() {
      this.isLoading = true;
      this.countedServiceTransaction.token =
        this.countedServiceTransaction.countedServiceTransactionToken;
      let formData = objectToFormData(this.countedServiceTransaction);
      try {
        const response = await apiCountedServiceTransaction.refund(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("CountedServiceTransactionRefund");
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
    canRefund(countedServiceTransaction) {
      // let check1 = this.checkPrivilege(
      //   this.hasCountedServiceTransactionRefund()
      // );
      let check2 =
        countedServiceTransaction.countedServiceInfoData
          .countedServiceRemainCount <
        countedServiceTransaction.countedServiceInfoData
          .countedServiceBoughtCount;
      return check2;
    },
  },
};
</script>
