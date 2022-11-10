<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ServiceTypeAdd"
      size="xl"
      :headerText="$t('ServiceTypes.add')"
      :headerIcon="serviceType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="serviceType.setInitialValue()"
    >
      <ServiceTypeForm
        v-if="!isLoading"
        id="add"
        :serviceType="serviceType"
        v-on:submitForm="addServiceType()"
        bottomSheetName="ServiceTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ServiceTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ServiceTypeForm from "./ServiceTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiServiceType from "./../../../../../api/settings/settingsOthers/serviceTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ServiceTypeForm,
  },
  props: ["serviceType"],
  methods: {
    async addServiceType() {
      this.isLoading = true;
      let formData = objectToFormData(this.serviceType);
      try {
        const response = await apiServiceType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ServiceTypeAdd");
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
          this.serviceType.setInitialValue();
          break;
        case "leave":
          this.serviceType.setInitialValue();
          this.closeBottomSheet("ServiceTypeAdd");
          break;
      }
    },
  },
};
</script>
