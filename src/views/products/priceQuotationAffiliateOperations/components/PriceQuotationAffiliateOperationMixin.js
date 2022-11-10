import PriceQuotationAffiliateOperation from "./../../../../models/products/priceQuotationAffiliateOperations/PriceQuotationAffiliateOperation";
import apiPriceQuotationAffiliateOperation from "./../../../../api/products/priceQuotationAffiliateOperations";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  props: ["token"],
  data() {
    return {
      priceQuotationAffiliateOperation: new PriceQuotationAffiliateOperation(),
      model: new GeneralDelete(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.priceQuotationAffiliateOperation.setInitialValue();
        const response = await apiPriceQuotationAffiliateOperation.getDetails(
          filter
        );
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
        this.priceQuotationAffiliateOperation.fillData(
          response.data.priceQuotationAffiliateOperation
        );
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
    async updatePriceQuotationAffiliateOperation() {
      this.isLoading = true;
      let formData = objectToFormData(this.priceQuotationAffiliateOperation);
      try {
        const response = await apiPriceQuotationAffiliateOperation.update(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PriceQuotationAffiliateOperationUpdate");
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
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token:
            this.priceQuotationAffiliateOperation
              .priceQuotationAffiliateOperationToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPriceQuotationAffiliateOperation.deleteImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.priceQuotationAffiliateOperation.priceQuotationAffiliateOperationImagePath =
            "";
          this.priceQuotationAffiliateOperation.priceQuotationAffiliateOperationImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
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
