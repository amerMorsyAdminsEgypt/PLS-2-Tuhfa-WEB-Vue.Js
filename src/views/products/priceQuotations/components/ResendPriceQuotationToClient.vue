<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ResendPriceQuotationToClient"
      size="md"
      :headerText="$t('PriceQuotations.resendToClient')"
      :headerIcon="priceQuotationSendPrice.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />

      <form autocomplete="off">
        <!-- <h3>{{ $t("PriceQuotations.resendToClient") }}</h3> -->

        <div class="form-actions">
          <div class="icon-submit" @click.prevent="resend">
            <img
              src="@/assets/images/check-icon.svg"
              :title="$t('PriceQuotations.resendToClient')"
            />
          </div>
          <div
            @click.prevent
            class="icon-cancel"
            v-b-modal="`ConfirmCloseSheet-ResendPriceQuotationToClient`"
          >
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ResendPriceQuotationToClientModel from "./../../../../models/products/priceQuotations/ResendPriceQuotationToClientModel";
import apiPriceQuotation from "./../../../../api/products/priceQuotations";
import { STATUS } from "./../../../../utils/constants";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
  },
  props: ["priceQuotation"],
  data() {
    return {
      priceQuotationSendPrice: new ResendPriceQuotationToClientModel(),
    };
  },
  methods: {
    async resend() {
      this.isLoading = true;
      this.priceQuotationSendPrice.fillData({
        priceQuotationHistoryDtoItemList: [
          { priceQuotationToken: this.priceQuotation.priceQuotationToken },
        ],
      });
      try {
        const response = await apiPriceQuotation.resend(
          this.priceQuotationSendPrice
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ResendPriceQuotationToClient");
          this.$emit("refresh");
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
  },
};
</script>
