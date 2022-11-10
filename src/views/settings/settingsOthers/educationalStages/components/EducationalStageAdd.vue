<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalStageAdd"
      size="xl"
      :headerText="$t('EducationalStages.add')"
      :headerIcon="educationalStage.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalStage.setInitialValue()"
    >
      <EducationalStageForm
        v-if="!isLoading"
        id="add"
        :educationalStage="educationalStage"
        v-on:submitForm="addEducationalStage()"
        bottomSheetName="EducationalStageAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalStageAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import EducationalStageForm from "./EducationalStageForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiEducationalStage from "./../../../../../api/settings/settingsOthers/educationalStages";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalStageForm,
  },
  props: ["educationalStage"],
  methods: {
    async addEducationalStage() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalStage);
      try {
        const response = await apiEducationalStage.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalStageAdd");
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
          this.educationalStage.setInitialValue();
          this.isLoading = false;
          break;
        case "leave":
          this.educationalStage.setInitialValue();
          this.closeBottomSheet("EducationalStageAdd");
          break;
      }
    },
  },
};
</script>
