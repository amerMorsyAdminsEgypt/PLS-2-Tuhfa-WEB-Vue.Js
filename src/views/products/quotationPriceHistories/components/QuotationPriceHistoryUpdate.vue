<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="QuotationPriceHistoryUpdate"
      size="xl"
      :headerText="$t('QuotationPriceHistories.edit')"
      :headerIcon="quotationPriceHistory.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <QuotationPriceHistoryForm
        v-else-if="!isLoading"
        id="update"
        :placeTypeToken="
          quotationPriceHistory.quotationPriceHistoryDtoItemList.length > 0
            ? quotationPriceHistory.quotationPriceHistoryDtoItemList[0]
                .placeInfoData.placeTypeToken
            : ''
        "
        :quotationPriceHistory="quotationPriceHistory"
        v-on:submitForm="updateQuotationPriceHistory()"
        bottomSheetName="QuotationPriceHistoryUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import QuotationPriceHistoryForm from "./QuotationPriceHistoryForm.vue";
import { STATUS } from "./../../../../utils/constants";
import QuotationPriceHistoryModel from "./../../../../models/products/quotationPriceHistories/QuotationPriceHistoryModel";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiQuotationPriceHistory from "./../../../../api/products/quotationPriceHistories";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    QuotationPriceHistoryForm,
  },
  props: ["token"],
  data() {
    return {
      quotationPriceHistory: new QuotationPriceHistoryModel(),
      model: new GeneralDelete(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.quotationPriceHistory.setInitialValue();
        const response = await apiQuotationPriceHistory.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.quotationPriceHistory.fillData({
          quotationPriceHistoryDtoItemList: [
            response.data.quotationPriceHistory,
          ],
        });
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updateQuotationPriceHistory() {
      this.isLoading = true;
      try {
        const response = await apiQuotationPriceHistory.update(
          this.quotationPriceHistory
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("QuotationPriceHistoryUpdate");
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
