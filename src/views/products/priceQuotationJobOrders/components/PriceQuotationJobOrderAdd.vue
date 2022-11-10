<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriceQuotationJobOrderAdd"
      size="xl"
      :headerText="$t('PriceQuotationJobOrders.add')"
      :headerIcon="priceQuotationJobOrder.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        priceQuotationJobOrder.setInitialValue(
          priceQuotationJobOrder.jobOrderHistoryWorkTypeToken
        );
        priceQuotationJobOrder.priceQuotationToken = priceQuotationToken;
      "
    >
      <PriceQuotationJobOrderForm
        v-if="!isLoading"
        id="add"
        :priceQuotationJobOrder="priceQuotationJobOrder"
        v-on:submitForm="addPriceQuotationJobOrder()"
        bottomSheetName="PriceQuotationJobOrderAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PriceQuotationJobOrderAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import PriceQuotationJobOrderForm from "./PriceQuotationJobOrderForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiPriceQuotationJobOrder from "./../../../../api/products/priceQuotationJobOrders";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PriceQuotationJobOrderForm,
  },
  props: {
    priceQuotationJobOrder: {
      type: Object,
    },
    priceQuotationToken: {
      type: String,
      default: "",
    },
  },
  methods: {
    async addPriceQuotationJobOrder() {
      this.isLoading = true;
      let formData = objectToFormData(this.priceQuotationJobOrder);
      try {
        const response = await apiPriceQuotationJobOrder.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PriceQuotationJobOrderAdd");
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
          this.priceQuotationJobOrder.setInitialValue();
          break;
        case "leave":
          this.priceQuotationJobOrder.setInitialValue();
          this.closeBottomSheet("PriceQuotationJobOrderAdd");
          break;
      }
    },
  },
};
</script>
