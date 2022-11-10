<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="BloodTypeAdd"
      size="xl"
      :headerText="$t('BloodTypes.add')"
      :headerIcon="bloodType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="bloodType.setInitialValue()"
    >
      <BloodTypeForm
        v-if="!isLoading"
        id="add"
        :bloodType="bloodType"
        v-on:submitForm="addBloodType()"
        bottomSheetName="BloodTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="BloodTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import BloodTypeForm from "./BloodTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiBloodType from "./../../../../../api/settings/settingsOthers/bloodTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    BloodTypeForm,
  },
  props: ["bloodType"],
  methods: {
    async addBloodType() {
      this.isLoading = true;
      let formData = objectToFormData(this.bloodType);
      try {
        const response = await apiBloodType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-BloodTypeAdd");
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
          this.bloodType.setInitialValue();
          break;
        case "leave":
          this.bloodType.setInitialValue();
          this.closeBottomSheet("BloodTypeAdd");
          break;
      }
    },
  },
};
</script>
