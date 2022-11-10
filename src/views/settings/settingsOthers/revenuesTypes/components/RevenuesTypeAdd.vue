<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="RevenuesTypeAdd"
      size="xl"
      :headerText="$t('RevenuesTypes.add')"
      :headerIcon="revenuesType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="revenuesType.setInitialValue()"
    >
      <RevenuesTypeForm
        v-if="!isLoading"
        id="add"
        :revenuesType="revenuesType"
        v-on:submitForm="addRevenuesType()"
        bottomSheetName="RevenuesTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="RevenuesTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import RevenuesTypeForm from "./RevenuesTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiRevenuesType from "./../../../../../api/settings/settingsOthers/revenuesTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    RevenuesTypeForm,
  },
  props: ["revenuesType"],
  methods: {
    async addRevenuesType() {
      this.isLoading = true;
      let formData = objectToFormData(this.revenuesType);
      try {
        const response = await apiRevenuesType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-RevenuesTypeAdd");
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
          this.revenuesType.setInitialValue();
          break;
        case "leave":
          this.revenuesType.setInitialValue();
          this.closeBottomSheet("RevenuesTypeAdd");
          break;
      }
    },
  },
};
</script>
