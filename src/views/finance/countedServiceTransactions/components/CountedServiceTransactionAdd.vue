<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountedServiceTransactionAdd"
      size="xl"
      :headerText="$t('CountedServiceTransactions.add')"
      :headerIcon="countedServiceTransaction.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="countedServiceTransaction.setInitialValue()"
    >
      <div class="row">
        <CustomCheckbox
          :className="'col-6'"
          :value="buyStatus"
          v-on:changeValue="buyStatus = $event"
          :isDisabled="hasNotAllActions"
          :title="$t('CountedServiceTransactions.buy')"
          :centerStatus="true"
        />
        <CustomCheckbox
          :className="'col-6'"
          :value="!buyStatus"
          v-on:changeValue="buyStatus = !$event"
          :isDisabled="hasNotAllActions"
          :title="$t('CountedServiceTransactions.sell')"
          :centerStatus="true"
        />
      </div>

      <CountedServiceTransactionForm
        id="buy"
        :countedServiceTransaction="countedServiceTransaction"
        v-on:submitForm="
          buyStatus
            ? buyCountedServiceTransaction()
            : sellCountedServiceTransaction()
        "
        :submitName="
          buyStatus
            ? $t('CountedServiceTransactions.buy')
            : $t('CountedServiceTransactions.sell')
        "
        bottomSheetName="CountedServiceTransactionAdd"
        :sellStatus="!buyStatus"
      />
    </CustomBottomSheet>

    <ConfirmClearData
      dialogName="CountedServiceTransactionAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import CountedServiceTransactionForm from "./CountedServiceTransactionForm.vue";
import {
  hasCountedServiceTransactionBuy,
  hasCountedServiceTransactionSell,
} from "./../../../../utils/privilegeHelper";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiCountedServiceTransaction from "./../../../../api/finance/countedServiceTransactions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CustomCheckbox,
    CountedServiceTransactionForm,
  },
  props: ["countedServiceTransaction", "currentTab"],
  data() {
    return {
      buyStatus: true,
    };
  },
  computed: {
    hasNotAllActions() {
      return (
        !hasCountedServiceTransactionBuy() ||
        !hasCountedServiceTransactionSell()
      );
    },
  },
  methods: {
    async buyCountedServiceTransaction() {
      this.isLoading = true;
      let formData = objectToFormData(this.countedServiceTransaction);
      try {
        const response = await apiCountedServiceTransaction.buy(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CountedServiceTransactionAdd");
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
    async sellCountedServiceTransaction() {
      this.isLoading = true;
      let formData = objectToFormData(this.countedServiceTransaction);
      try {
        const response = await apiCountedServiceTransaction.sell(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CountedServiceTransactionAdd");
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
          this.countedServiceTransaction.setInitialValue();
          break;
        case "leave":
          this.countedServiceTransaction.setInitialValue();
          this.closeBottomSheet("CountedServiceTransactionAdd");
          break;
      }
    },
  },
  watch: {
    currentTab: function (val) {
      if (val == "boughts") {
        this.buyStatus = true;
      } else if (val == "solds") {
        this.buyStatus = false;
      }
    },
  },
};
</script>
