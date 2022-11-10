<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalPeriodUpdate"
      size="xl"
      :headerText="$t('EducationalPeriods.edit')"
      :headerIcon="educationalPeriod.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EducationalPeriodForm
        v-if="!isLoading"
        id="update"
        :educationalPeriod="educationalPeriod"
        v-on:submitForm="updateEducationalPeriod()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="EducationalPeriodUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalPeriodForm from "./EducationalPeriodForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalPeriod from "./../../../../api/educational/educationalPeriods";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EducationalPeriodForm,
  },
  props: ["educationalPeriod"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEducationalPeriod() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalPeriod);
      try {
        const response = await apiEducationalPeriod.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalPeriodUpdate");
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
          token: this.educationalPeriod.educationalPeriodToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEducationalPeriod.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.educationalPeriod.educationalPeriodImagePath = "";
          this.educationalPeriod.educationalPeriodImageIsDefault = true;
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
