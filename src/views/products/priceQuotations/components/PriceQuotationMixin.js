import PriceQuotation from "./../../../../models/products/priceQuotations/PriceQuotation";
import apiPriceQuotation from "./../../../../api/products/priceQuotations";
import { STATUS } from "./../../../../utils/constants";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  props: ["token"],
  data() {
    return {
      priceQuotation: new PriceQuotation(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.priceQuotation.setInitialValue();
        const response = await apiPriceQuotation.getDetails(filter);
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
        this.priceQuotation.fillData(response.data.priceQuotation);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
