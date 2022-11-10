import PriceQuotationJobOrder from "./../../../../models/products/priceQuotationJobOrders/PriceQuotationJobOrder";
import apiPriceQuotationJobOrder from "./../../../../api/products/priceQuotationJobOrders";
import { STATUS } from "./../../../../utils/constants";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  props: ["token", "currentTab"],
  data() {
    return {
      priceQuotationJobOrderModel: new PriceQuotationJobOrder(),
      model: new GeneralDelete(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.priceQuotationJobOrderModel.setInitialValue();
        const response = await apiPriceQuotationJobOrder.getDetails(filter);
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
        this.priceQuotationJobOrderModel.fillData(response.data.priceQuotation);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
