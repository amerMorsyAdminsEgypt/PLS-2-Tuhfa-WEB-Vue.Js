<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PriceListAdd"
      size="xl"
      :headerText="$t('PriceLists.add')"
      :headerIcon="priceList.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="priceList.setInitialValue()"
    >
      <PriceListForm
        v-if="!isLoading"
        id="add"
        :priceList="priceList"
        v-on:submitForm="addPriceList()"
        bottomSheetName="PriceListAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PriceListAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import PriceListForm from "./PriceListForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiPriceList from "./../../../../../api/settings/settingsOthers/priceLists";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PriceListForm,
  },
  props: ["priceList"],
  methods: {
    async addPriceList() {
      this.isLoading = true;

      let formData = objectToFormData(this.priceList);
      try {
        const response = await apiPriceList.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PriceListAdd");
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
          this.priceList.setInitialValue();
          break;
        case "leave":
          this.priceList.setInitialValue();
          this.closeBottomSheet("PriceListAdd");
          break;
      }
    },
  },
};
</script>
