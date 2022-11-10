<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountedServiceAdd"
      size="xl"
      :headerText="$t('CountedServices.add')"
      :headerIcon="countedService.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="countedService.setInitialValue()"
    >
      <CountedServiceForm
        v-if="!isLoading"
        id="add"
        :countedService="countedService"
        v-on:submitForm="addCountedService()"
        bottomSheetName="CountedServiceAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="CountedServiceAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import CountedServiceForm from "./CountedServiceForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiCountedService from "./../../../api/countedService";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CountedServiceForm,
  },
  props: ["countedService"],
  methods: {
    async addCountedService() {
      this.isLoading = true;
      let formData = objectToFormData(this.countedService);
      try {
        const response = await apiCountedService.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CountedServiceAdd");
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
          this.countedService.setInitialValue();
          break;
        case "leave":
          this.countedService.setInitialValue();
          this.closeBottomSheet("CountedServiceAdd");
          break;
      }
    },
  },
};
</script>
