import PriceQuotationDetail from "./../../../../models/products/priceQuotationDetails/PriceQuotationDetail";
import apiPriceQuotationDetail from "./../../../../api/products/priceQuotationDetails";
import { STATUS } from "./../../../../utils/constants";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  props: ["token", "currentTab"],
  data() {
    return {
      priceQuotationDetailModel: new PriceQuotationDetail(),
      model: new GeneralDelete(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.priceQuotationDetailModel.setInitialValue();
        const response = await apiPriceQuotationDetail.getDetails(filter);
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
        this.priceQuotationDetailModel.fillData(response.data.priceQuotation);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
