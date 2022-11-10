<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalJoiningApplicationAdd"
      size="xl"
      :headerText="$t('EducationalJoiningApplications.add')"
      :headerIcon="educationalJoiningApplication.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalJoiningApplication.setInitialValue()"
    >
      <EducationalJoiningApplicationForm
        v-if="!isLoading"
        id="add"
        :educationalJoiningApplication="educationalJoiningApplication"
        v-on:submitForm="addEducationalJoiningApplication()"
        bottomSheetName="EducationalJoiningApplicationAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalJoiningApplicationAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalJoiningApplicationForm from "./EducationalJoiningApplicationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalJoiningApplication from "./../../../../api/educational/educationalJoiningApplications";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalJoiningApplicationForm,
  },
  props: ["educationalJoiningApplication"],
  methods: {
    async addEducationalJoiningApplication() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalJoiningApplication);
      try {
        const response = await apiEducationalJoiningApplication.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show(
            "ConfirmClearData-EducationalJoiningApplicationAdd"
          );
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
          this.educationalJoiningApplication.setInitialValue();
          break;
        case "leave":
          this.educationalJoiningApplication.setInitialValue();
          this.closeBottomSheet("EducationalJoiningApplicationAdd");
          break;
      }
    },
  },
};
</script>
