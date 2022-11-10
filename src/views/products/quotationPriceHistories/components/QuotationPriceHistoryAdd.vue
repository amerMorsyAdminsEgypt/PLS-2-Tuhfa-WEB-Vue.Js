<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="QuotationPriceHistoryAdd"
      size="xl"
      :headerText="$t('QuotationPriceHistories.add')"
      :headerIcon="quotationPriceHistory.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="quotationPriceHistory.setInitialValue()"
    >
      <QuotationPriceHistoryForm
        v-if="!isLoading"
        id="add"
        :quotationPriceHistory="quotationPriceHistory"
        :priceQuotationDetailsToken="priceQuotationDetailsToken"
        v-on:submitForm="addQuotationPriceHistory()"
        bottomSheetName="QuotationPriceHistoryAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="QuotationPriceHistoryAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import QuotationPriceHistoryForm from "./QuotationPriceHistoryForm.vue";
import { STATUS } from "./../../../../utils/constants";
import apiQuotationPriceHistory from "./../../../../api/products/quotationPriceHistories";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    QuotationPriceHistoryForm,
  },
  props: {
    quotationPriceHistory: { type: Object },
    priceQuotationDetailsToken: { type: String, default: "" },
  },
  methods: {
    async addQuotationPriceHistory() {
      this.isLoading = true;
      try {
        const response = await apiQuotationPriceHistory.add(
          this.quotationPriceHistory
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-QuotationPriceHistoryAdd");
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
          this.quotationPriceHistory.setInitialValue();
          break;
        case "leave":
          this.quotationPriceHistory.setInitialValue();
          this.closeBottomSheet("QuotationPriceHistoryAdd");
          break;
      }
    },
  },
};
</script>
