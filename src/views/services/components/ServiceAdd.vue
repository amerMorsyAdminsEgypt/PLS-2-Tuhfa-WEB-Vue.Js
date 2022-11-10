<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ServiceAdd"
      size="xl"
      :headerText="$t('Services.add')"
      :headerIcon="service.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="service.setInitialValue()"
    >
      <ServiceForm
        v-if="!isLoading"
        id="add"
        :service="service"
        v-on:submitForm="addService()"
        bottomSheetName="ServiceAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="ServiceAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import ServiceForm from "./ServiceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiService from "./../../../api/service";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ServiceForm,
  },
  props: ["service"],
  methods: {
    async addService() {
      this.isLoading = true;
      let formData = objectToFormData(this.service);
      try {
        const response = await apiService.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ServiceAdd");
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
          this.service.setInitialValue();
          break;
        case "leave":
          this.service.setInitialValue();
          this.closeBottomSheet("ServiceAdd");
          break;
      }
    },
  },
};
</script>
