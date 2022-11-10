<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupUpdate"
      size="xl"
      :headerText="$t('EducationalGroups.edit')"
      :headerIcon="educationalGroup.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EducationalGroupForm
        v-if="!isLoading"
        id="update"
        :educationalGroup="educationalGroup"
        v-on:submitForm="updateEducationalGroup()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="EducationalGroupUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalGroupForm from "./EducationalGroupForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalGroup from "./../../../../api/educational/educationalGroups";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EducationalGroupForm,
  },
  props: ["educationalGroup"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEducationalGroup() {
      this.isLoading = true;
      // let formData = objectToFormData(this.educationalGroup);
      try {
        const response = await apiEducationalGroup.update(
          this.educationalGroup
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalGroupUpdate");
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
      // empty list
      this.educationalGroup.fixedScheduleDays = [];
      this.isLoading = false;
    },
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.educationalGroup.educationalGroupToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEducationalGroup.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.educationalGroup.educationalGroupImagePath = "";
          this.educationalGroup.educationalGroupImageIsDefault = true;
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
