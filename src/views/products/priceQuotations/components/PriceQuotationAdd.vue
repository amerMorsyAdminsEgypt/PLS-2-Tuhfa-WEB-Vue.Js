<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriceQuotationAdd"
      size="xl"
      :headerText="$t('PriceQuotations.add')"
      :headerIcon="priceQuotation.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        priceQuotation.setInitialValue();
        priceQuotation.placeTypeToken = PLACE_TYPE_TOKENS.Client;
      "
    >
      <PriceQuotationForm
        v-if="!isLoading"
        id="add"
        :priceQuotation="priceQuotation"
        v-on:submitForm="addPriceQuotation()"
        bottomSheetName="PriceQuotationAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PriceQuotationAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import PriceQuotationForm from "./PriceQuotationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { PLACE_TYPE_TOKENS } from "./../../../../utils/constantLists";
// import { objectToFormData } from "./../../../../utils/functions";
import apiPriceQuotation from "./../../../../api/products/priceQuotations";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PriceQuotationForm,
  },
  props: ["priceQuotation"],
  data() {
    return {
      PLACE_TYPE_TOKENS,
    };
  },
  methods: {
    async addPriceQuotation() {
      this.isLoading = true;
      // let formData = objectToFormData(this.priceQuotation);
      try {
        const response = await apiPriceQuotation.add(this.priceQuotation);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PriceQuotationAdd");
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
          this.priceQuotation.setInitialValue();
          break;
        case "leave":
          this.priceQuotation.setInitialValue();
          this.closeBottomSheet("PriceQuotationAdd");
          break;
      }
    },
  },
};
</script>
