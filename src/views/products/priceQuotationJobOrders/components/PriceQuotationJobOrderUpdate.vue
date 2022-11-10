<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriceQuotationJobOrderUpdate"
      size="xl"
      :headerText="$t('PriceQuotationJobOrders.edit')"
      :headerIcon="priceQuotationJobOrder.icon"
      :clickToClose="false"
      :swipeAble="exceptionMsg ? true : false"
    >
      <PriceQuotationJobOrderForm
        v-if="!isLoading"
        id="update"
        :priceQuotationJobOrder="priceQuotationJobOrder"
        v-on:submitForm="updatePriceQuotationJobOrder()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PriceQuotationJobOrderUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import PriceQuotationJobOrderForm from "./PriceQuotationJobOrderForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiPriceQuotationJobOrder from "./../../../../api/products/priceQuotationJobOrders";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    PriceQuotationJobOrderForm,
  },
  props: ["priceQuotationJobOrder"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updatePriceQuotationJobOrder() {
      this.isLoading = true;
      let formData = objectToFormData(this.priceQuotationJobOrder);
      try {
        const response = await apiPriceQuotationJobOrder.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PriceQuotationJobOrderUpdate");
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
          token: this.priceQuotationJobOrder.priceQuotationJobOrderToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPriceQuotationJobOrder.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.priceQuotationJobOrder.priceQuotationJobOrderImagePath = "";
          this.priceQuotationJobOrder.priceQuotationJobOrderImageIsDefault = true;
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
</script>
