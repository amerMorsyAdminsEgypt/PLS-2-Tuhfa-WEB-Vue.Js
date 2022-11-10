<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InjuryTypeAdd"
      size="xl"
      :headerText="$t('InjuryTypes.add')"
      :headerIcon="injuryType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="injuryType.setInitialValue()"
    >
      <InjuryTypeForm
        v-if="!isLoading"
        id="add"
        :injuryType="injuryType"
        v-on:submitForm="addInjuryType()"
        bottomSheetName="InjuryTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InjuryTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import InjuryTypeForm from "./InjuryTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiInjuryType from "./../../../../../api/settings/settingsOthers/injuryTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InjuryTypeForm,
  },
  props: ["injuryType"],
  methods: {
    async addInjuryType() {
      this.isLoading = true;
      let formData = objectToFormData(this.injuryType);
      try {
        const response = await apiInjuryType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InjuryTypeAdd");
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
          this.injuryType.setInitialValue();
          break;
        case "leave":
          this.injuryType.setInitialValue();
          this.closeBottomSheet("InjuryTypeAdd");
          break;
      }
    },
  },
};
</script>
