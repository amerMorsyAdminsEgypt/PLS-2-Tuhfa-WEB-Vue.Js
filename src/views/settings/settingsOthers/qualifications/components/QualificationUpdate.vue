<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="QualificationUpdate"
      size="xl"
      :headerText="$t('Qualifications.edit')"
      :headerIcon="qualification.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <QualificationForm
        v-if="!isLoading"
        id="update"
        :qualification="qualification"
        v-on:submitForm="updateQualification()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="QualificationUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import QualificationForm from "./QualificationForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiQualification from "./../../../../../api/settings/settingsOthers/qualifications";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    QualificationForm,
  },
  props: ["qualification"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateQualification() {
      this.isLoading = true;
      let formData = objectToFormData(this.qualification);
      try {
        const response = await apiQualification.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("QualificationUpdate");
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
          token: this.qualification.qualificationToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiQualification.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.qualification.qualificationImagePath = "";
          this.qualification.qualificationImageIsDefault = true;
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
