<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="QualificationAdd"
      size="xl"
      :headerText="$t('Qualifications.add')"
      :headerIcon="qualification.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="qualification.setInitialValue()"
    >
      <QualificationForm
        v-if="!isLoading"
        id="add"
        :qualification="qualification"
        v-on:submitForm="addQualification()"
        bottomSheetName="QualificationAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="QualificationAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import QualificationForm from "./QualificationForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiQualification from "./../../../../../api/settings/settingsOthers/qualifications";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    QualificationForm,
  },
  props: ["qualification"],
  methods: {
    async addQualification() {
      this.isLoading = true;
      let formData = objectToFormData(this.qualification);
      try {
        const response = await apiQualification.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-QualificationAdd");
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
          this.qualification.setInitialValue();
          break;
        case "leave":
          this.qualification.setInitialValue();
          this.closeBottomSheet("QualificationAdd");
          break;
      }
    },
  },
};
</script>
