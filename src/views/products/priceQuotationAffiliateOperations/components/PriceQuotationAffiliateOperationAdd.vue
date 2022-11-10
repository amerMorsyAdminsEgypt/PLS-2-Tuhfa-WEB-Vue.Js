<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriceQuotationAffiliateOperationAdd"
      size="xl"
      :headerText="$t('PriceQuotationAffiliateOperations.add')"
      :headerIcon="priceQuotationAffiliateOperation.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        priceQuotationAffiliateOperation.setInitialValue(
          priceQuotationAffiliateOperation.priceQuotationDetailsToken
        )
      "
    >
      <PriceQuotationAffiliateOperationForm
        v-if="!isLoading"
        id="add"
        :priceQuotationAffiliateOperation="priceQuotationAffiliateOperation"
        v-on:submitForm="addPriceQuotationAffiliateOperation()"
        bottomSheetName="PriceQuotationAffiliateOperationAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PriceQuotationAffiliateOperationAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import PriceQuotationAffiliateOperationForm from "./PriceQuotationAffiliateOperationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiPriceQuotationAffiliateOperation from "./../../../../api/products/priceQuotationAffiliateOperations";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PriceQuotationAffiliateOperationForm,
  },
  props: ["priceQuotationAffiliateOperation"],
  methods: {
    async addPriceQuotationAffiliateOperation() {
      this.isLoading = true;
      let formData = objectToFormData(this.priceQuotationAffiliateOperation);
      try {
        const response = await apiPriceQuotationAffiliateOperation.add(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show(
            "ConfirmClearData-PriceQuotationAffiliateOperationAdd"
          );
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
          this.priceQuotationAffiliateOperation.setInitialValue();
          break;
        case "leave":
          this.priceQuotationAffiliateOperation.setInitialValue();
          this.closeBottomSheet("PriceQuotationAffiliateOperationAdd");
          break;
      }
    },
  },
};
</script>
