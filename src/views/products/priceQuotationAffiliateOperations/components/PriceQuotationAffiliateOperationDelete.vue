<template>
  <b-modal
    id="PriceQuotationAffiliateOperationDelete"
    scrollable
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteStart") }}
      <span class="co-red">{{
        priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleCurrent
      }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deletePriceQuotationAffiliateOperation"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('PriceQuotationAffiliateOperationDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiPriceQuotationAffiliateOperation from "./../../../../api/products/priceQuotationAffiliateOperations";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  props: ["priceQuotationAffiliateOperation"],
  methods: {
    async deletePriceQuotationAffiliateOperation() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token:
            this.priceQuotationAffiliateOperation
              .priceQuotationAffiliateOperationToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPriceQuotationAffiliateOperation.finalDelete(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("PriceQuotationAffiliateOperationDelete");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
