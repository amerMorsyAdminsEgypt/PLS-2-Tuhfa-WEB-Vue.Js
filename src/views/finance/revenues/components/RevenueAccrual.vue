<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="RevenueAccrual"
      size="xl"
      :headerText="$t('Revenues.accrual')"
      :headerIcon="revenue.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="revenue.setInitialValue()"
    >
      <RevenueForm
        v-if="!isLoading"
        id="Accrual"
        :revenue="revenue"
        v-on:submitForm="accrualRevenue()"
        bottomSheetName="RevenueAccrual"
        :submitName="$t('general.accrual')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="RevenueAccrual"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import RevenueForm from "./RevenueForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiRevenue from "./../../../../api/finance/revenues";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    RevenueForm,
  },
  props: ["revenue"],
  methods: {
    async accrualRevenue() {
      this.isLoading = true;
      let formData = objectToFormData(this.revenue);
      try {
        const response = await apiRevenue.accrual(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-RevenueAccrual");
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
          this.revenue.setInitialValue();
          break;
        case "leave":
          this.revenue.setInitialValue();
          this.closeBottomSheet("RevenueAccrual");
          break;
      }
    },
  },
};
</script>
