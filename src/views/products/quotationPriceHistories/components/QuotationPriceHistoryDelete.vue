<template>
  <b-modal id="QuotationPriceHistoryDelete" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteStart") }}
      <span class="co-red">{{ quotationPriceHistory.fullCode }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteQuotationPriceHistory"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('QuotationPriceHistoryDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import { STATUS } from "./../../../../utils/constants";
import { getUserAuthorizeToken } from "./../../../../utils/functions";
import apiQuotationPriceHistories from "./../../../../api/products/quotationPriceHistories";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
  },
  props: ["quotationPriceHistory"],
  methods: {
    async deleteQuotationPriceHistory() {
      this.isLoading = true;
      try {
        let model = {
          userAuthorizeToken: getUserAuthorizeToken(),
          tokens: [this.quotationPriceHistory.quotationPriceHistoryToken],
        };
        const response = await apiQuotationPriceHistories.finalDelete(model);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("QuotationPriceHistoryDelete");
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
