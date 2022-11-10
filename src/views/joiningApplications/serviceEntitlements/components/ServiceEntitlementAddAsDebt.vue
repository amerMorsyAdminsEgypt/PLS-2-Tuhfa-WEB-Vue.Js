<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ServiceEntitlementAddAsDebt"
      size="xl"
      :headerText="$t('ServiceEntitlements.addAsDebt')"
      :headerIcon="serviceEntitlement.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="serviceEntitlement.setInitialValue()"
    >
      <ServiceEntitlementForm
        v-if="!isLoading"
        id="addAsDebt"
        :serviceEntitlement="serviceEntitlement"
        v-on:submitForm="addAsDebtServiceEntitlement()"
        bottomSheetName="ServiceEntitlementAddAsDebt"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ServiceEntitlementAddAsDebt"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import ServiceEntitlementForm from "./ServiceEntitlementForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiServiceEntitlement from "./../../../../api/joiningApplications/serviceEntitlements";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ServiceEntitlementForm,
  },
  props: ["serviceEntitlement"],
  methods: {
    // handelOpen() {
    //   // this.serviceEntitlement.setInitialValue();
    //   // console.log(this.serviceEntitlement);
    // },
    async addAsDebtServiceEntitlement() {
      this.isLoading = true;
      let formData = objectToFormData(this.serviceEntitlement);
      try {
        const response =
          await apiServiceEntitlement.addServiceEntitlementAsDebt(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ServiceEntitlementAddAsDebt");
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
          this.serviceEntitlement.setInitialValue();
          break;
        case "leave":
          this.serviceEntitlement.setInitialValue();
          this.closeBottomSheet("ServiceEntitlementAddAsDebt");
          break;
      }
    },
  },
  async created() {},
};
</script>
