<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalJoiningApplicationUpdate"
      size="xl"
      :headerText="$t('EducationalJoiningApplications.edit')"
      :headerIcon="educationalJoiningApplication.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EducationalJoiningApplicationForm
        v-if="!isLoading"
        id="update"
        :educationalJoiningApplication="educationalJoiningApplication"
        v-on:submitForm="updateEducationalJoiningApplication()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="EducationalJoiningApplicationUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalJoiningApplicationForm from "./EducationalJoiningApplicationForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalJoiningApplication from "./../../../../api/educational/educationalJoiningApplications";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EducationalJoiningApplicationForm,
  },
  props: ["educationalJoiningApplication"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEducationalJoiningApplication() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalJoiningApplication);
      try {
        const response = await apiEducationalJoiningApplication.update(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalJoiningApplicationUpdate");
          this.$emit("refresh");
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
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token:
            this.educationalJoiningApplication
              .educationalJoiningApplicationToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEducationalJoiningApplication.deleteImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.educationalJoiningApplication.educationalJoiningApplicationImagePath =
            "";
          this.educationalJoiningApplication.educationalJoiningApplicationImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
