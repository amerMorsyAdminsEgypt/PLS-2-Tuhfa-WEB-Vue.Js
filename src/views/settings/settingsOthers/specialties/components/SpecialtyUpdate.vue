<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SpecialtyUpdate"
      size="xl"
      :headerText="$t('Specialties.edit')"
      :headerIcon="specialty.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SpecialtyForm
        v-if="!isLoading"
        id="update"
        :specialty="specialty"
        v-on:submitForm="updateSpecialty()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="SpecialtyUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import SpecialtyForm from "./SpecialtyForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiSpecialty from "./../../../../../api/settings/settingsOthers/specialties";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SpecialtyForm,
  },
  props: ["specialty"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSpecialty() {
      this.isLoading = true;
      let formData = objectToFormData(this.specialty);
      try {
        const response = await apiSpecialty.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SpecialtyUpdate");
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
          token: this.specialty.specialtieToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiSpecialty.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.specialty.specialtieImagePath = "";
          this.specialty.specialtyImageIsDefault = true;
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
