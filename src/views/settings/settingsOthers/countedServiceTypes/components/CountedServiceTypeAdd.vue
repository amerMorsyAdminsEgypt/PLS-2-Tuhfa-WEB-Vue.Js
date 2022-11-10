<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CountedServiceTypeAdd"
      size="xl"
      :headerText="$t('CountedServiceTypes.add')"
      :headerIcon="countedServiceType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="countedServiceType.setInitialValue()"
    >
      <CountedServiceTypeForm
        v-if="!isLoading"
        id="add"
        :countedServiceType="countedServiceType"
        v-on:submitForm="addCountedServiceType()"
        bottomSheetName="CountedServiceTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="CountedServiceTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import CountedServiceTypeForm from "./CountedServiceTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiCountedServiceType from "./../../../../../api/settings/settingsOthers/countedServiceTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CountedServiceTypeForm,
  },
  props: ["countedServiceType"],
  methods: {
    async addCountedServiceType() {
      this.isLoading = true;
      let formData = objectToFormData(this.countedServiceType);
      try {
        const response = await apiCountedServiceType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CountedServiceTypeAdd");
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
          this.countedServiceType.setInitialValue();
          break;
        case "leave":
          this.countedServiceType.setInitialValue();
          this.closeBottomSheet("CountedServiceTypeAdd");
          break;
      }
    },
  },
};
</script>
